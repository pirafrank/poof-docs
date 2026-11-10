---
sidebar_label: Release verification
title: Release verification
description: Verify poof releases using checksums and attestations
---

Since poof `v0.6.3`, every stable release archive has GitHub provenance and SPDX SBOM attestations.
Releases also publish one build-environment JSON record per archive and a canonical aggregate
checksum manifest, signed using Cosign keyless signing with GitHub Actions OIDC. Archive checksums
are published in this manifest; individual `.sha256` sidecars are not published.

## Verify signatures and checksums

Download the checksum manifest, its `.sigstore.json` bundle, and the assets you need from the
same release. Use a current Cosign version (CI pins `v3.1.4`). For example, for `v0.6.3`:

```sh
cosign verify-blob poof-0.6.3-checksums.txt \
  --bundle poof-0.6.3-checksums.txt.sigstore.json \
  --certificate-identity 'https://github.com/pirafrank/poof/.github/workflows/release.yml@refs/tags/v0.6.3' \
  --certificate-oidc-issuer 'https://token.actions.githubusercontent.com'
sha256sum --check poof-0.6.3-checksums.txt
```

Run the checksum command from the assets directory. It requires all listed files. For a wrapper
that downloads a single target, after verifying the signature, select the manifest entry by the
exact expected filename and verify that archive digest. Require exactly one matching entry and
reject missing entries, mismatches, and verification failures before installation. On macOS,
`shasum -a 256 --check` can replace `sha256sum --check`.

The exact tag identity above prevents accepting signatures for a different release or branch.
Manual workflow runs also produce signed workflow artifacts but never publish a GitHub release. Also,
branch runs do not satisfy the release-tag identity shown above.

## Verify GitHub attestations

To check SLSA provenance and SPDX GitHub attestations for an archive, for example
`poof-0.6.3-x86_64-unknown-linux-musl.tar.gz`:

```sh
gh attestation verify poof-0.6.3-x86_64-unknown-linux-musl.tar.gz \
  --repo pirafrank/poof \
  --signer-workflow pirafrank/poof/.github/workflows/release.yml \
  --source-ref refs/tags/v0.6.3
gh attestation verify poof-0.6.3-x86_64-unknown-linux-musl.tar.gz \
  --repo pirafrank/poof \
  --signer-workflow pirafrank/poof/.github/workflows/release.yml \
  --source-ref refs/tags/v0.6.3 --predicate-type https://spdx.dev/Document/v2.3
```

## Build-environment schema version 1

`poof-<version>-<target>.build-environment.json` contains `artifact`, `source`,
`github_actions`, `runner`, `toolchain`, `build`, `native_toolchain`, `cross`, `inputs`, and
`captured_at` sections. The `artifact` section identifies the finished archive by filename,
SHA-256, target triple, and byte size. Its record is authenticated by the signed manifest.

The record captures:

- **GitHub Actions:** An explicit allowlist of fields: repository and repository ID, workflow
  name/ref/SHA, run ID/attempt/number, event name, ref/name, SHA, actor, and server URL;
- **Runner:** The selected matrix label, operating system, architecture, environment, kernel,
  OS release, and runner image version when available;
- **Rust toolchain:** Verbose compiler and Cargo versions, active and installed
  toolchains/targets, and hashes of toolchain files;
- **Build:** The exact argument vector, release profile, default, additional, and resolved
  features, and matrix entry;
- **Input hashes:** Workspace manifests, lockfile, repository Cargo configuration, dependency
  metadata/tree, matrix, build script, collector, and release workflow.

The `native_toolchain` section describes host tools. Cross toolchain details are recorded in
`cross`, based on probes of the resolved container image. Image references are resolved before
the build, and the resulting digest is passed to Cross so it uses the image recorded in the
report. No custom Dockerfile or base image is configured today, so those fields are null. If a
custom Cross image is added, the collector must also record its Dockerfile and base-image digests.

Unavailable or inapplicable probes, and optional probes that fail, are represented as JSON `null`.
Environment flags are fully redacted and, when present, accompanied by hashes. Cargo home and
the target directory are recorded only as locations. Credential files, tokens, arbitrary
environment variables, and the full GitHub context are never collected. Cargo configuration is
hashed, not included. Dependency metadata/tree hashes describe the captured output, which may
contain runner-specific paths; they do not prove that the dependency graph is reproducible.

Capture time and run identity are included for auditing. This record helps investigate builds;
proving bit-for-bit reproducibility requires independent rebuilds and comparison of their output.
