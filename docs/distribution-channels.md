---
sidebar_position: 3
sidebar_label: Distribution Channels
title: Distribution Channels
description: How poof releases are packaged and published to crates.io, Docker Hub, npm, MacPorts, and more
---

poof reaches users through several package ecosystems. Every channel is fed by the same
signed GitHub release, produced by the Release workflow from a version tag. Where the
tooling lives in the repository is covered in the
[Development Guide](development-guide.md#repository-structure).

## Cutting a release

Releases are cut by maintainers with two recipes:

1. `just prepare-release <version>` generates `CHANGELOG.md` with git-cliff, bumps the crate
   version (`cargo set-version`), updates the Nix flake lockfile, and creates a signed
   release-preparation commit.
2. `just make-release <version>` creates the signed annotated tag `v<version>` on `main` and
   fast-forwards the `latest` branch to it. The pre-push hook runs the tag checks
   (`just pre-push-tag`) before the tag reaches GitHub.

## GitHub release pipeline

Pushing the tag triggers [`release.yml`](https://github.com/pirafrank/poof/blob/main/.github/workflows/release.yml)
(a manual dispatch builds everything without publishing a release). It:

- checks that the tag matches the version in `Cargo.toml`;
- builds all 16 targets from `matrix.jsonc` (`cargo` or `cross`, with cross images resolved and
  pinned by `scripts/release/build_environment.py`);
- packs each target into a flat `poof-<version>-<target>.tar.gz` (binary plus `LICENSE.md`,
  `README.md`, `CHANGELOG.md`, `SECURITY.md`) with a per-archive SHA-256, an SPDX SBOM, and a
  build-environment record;
- attests provenance and SBOM for every binary and archive with GitHub artifact attestations,
  and verifies them inside the workflow;
- signs the combined `poof-<version>-checksums.txt` manifest keylessly with Sigstore (cosign)
  in the `release-signing` environment;
- publishes the GitHub release with all assets, including the generated man page. Tags
  containing `pre`, `beta`, `rc`, `alpha`, or `nightly` are marked as prereleases.

## Channel fan-out

Publishing a GitHub release fans out to the package ecosystems:

| Channel | Workflow / repo | What it does |
| ------- | --------------- | ------------ |
| GitHub Releases | [`release.yml`](https://github.com/pirafrank/poof/blob/main/.github/workflows/release.yml) | Publishes pre-built binaries for manual download and installation from the GitHub Releases page |
| crates.io | [`crates.yml`](https://github.com/pirafrank/poof/blob/main/.github/workflows/crates.yml) | `cargo publish --locked` from the release tag, after a tag/version match check (`publish-crates` environment) |
| Docker Hub | [`docker.yml`](https://github.com/pirafrank/poof/blob/main/.github/workflows/docker.yml) | Multi-arch image (`linux/amd64`, `arm64`, `arm/v7`, `riscv64`, `386`) from the Alpine `Dockerfile`, which installs the tagged release via `install.sh`; tagged `<version>`, `<major>.<minor>`, and `latest`, with max provenance |
| npm | [`npm.yml`](https://github.com/pirafrank/poof/blob/main/.github/workflows/npm.yml) | Five packages built from the signed release archives, never rebuilding Rust: a `@pirafrank/poof` launcher that only spawns the native binary (no network access), plus four platform packages - Linux x64/arm64 (static musl) and macOS x64/arm64 - selected by `SUPPORTED_TRIPLES` in `scripts/npm/common.py` as a subset of the full list of native targets. Only an explicit allowlist of files from `npm/` is staged; CI packs and publishes with Node 24 |
| MacPorts | [`macports.yml`](https://github.com/pirafrank/poof/blob/main/.github/workflows/macports.yml) | Generates a Portfile with cargo2ports, test-installs it on macOS, and uploads it as an artifact; submission is manual (`macports/macport_pr.sh`). **Not available in MacPorts yet**: the new-port submission is pending review in [macports-ports#31327](https://github.com/macports/macports-ports/pull/31327) |
| Homebrew tap | [pirafrank/homebrew-tap](https://github.com/pirafrank/homebrew-tap) | External repo: renders the `poof` formula from the release assets and commits it to the tap; install with `brew install pirafrank/tap/poof` |
| AUR (`poof-bin`) | [pirafrank/aura](https://github.com/pirafrank/aura) | External repo: AURA generates `PKGBUILD` and `.SRCINFO` from the latest stable release and pushes them to [poof-bin](https://aur.archlinux.org/packages/poof-bin) |
| APT / YUM / APK | [pirafrank/packages](https://github.com/pirafrank/packages) | External repo: builds and signs `.deb`, `.rpm`, and `.apk` packages, served from [pkg.fpira.com](https://pkg.fpira.com) |

crates.io and Docker Hub skip prereleases; every channel can also be triggered manually via
`workflow_dispatch`.

The Homebrew, AUR, and APT/YUM/APK channels live in external repositories, not in the poof
repo. Their update workflows listen for `repository_dispatch` webhooks sent after a release
(`update_formula`, `update_aur_package`, and `new_release` respectively). All three are also
documented as install methods in [Installation](installation.md).

## Continuous packaging surfaces

Two more packaging surfaces do not wait for a release:

- **Nix flake** (`flake.nix`): builds poof from source on Linux and macOS (x86_64/aarch64);
  [`nix.yml`](https://github.com/pirafrank/poof/blob/main/.github/workflows/nix.yml) runs
  `nix flake check` on pull requests that touch Rust or flake files.
- **Devcontainer feature** (`devcontainer-features/poof/`):
  [`release_feature.yml`](https://github.com/pirafrank/poof/blob/main/.github/workflows/release_feature.yml)
  publishes the feature to GHCR on every change to that directory on `main` and opens an
  automated documentation PR.
