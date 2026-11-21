---
sidebar_position: 3
sidebar_label: Azure DevOps Extension
title: Azure DevOps Extension
description: Install poof and GitHub release tools in Azure Pipelines
---

The `poof` Azure DevOps extension adds a pipeline task that installs `poof` and
optionally installs pre-built binaries from GitHub Releases. The task handles
download and installation; no GitHub repository resource or service connection
is required.

Package names in the examples are for illustration. Replace them with the
software your pipeline needs.

## Installation and usage

1. **Install the extension.** Get [Poof Setup from the Azure DevOps Marketplace](https://marketplace.visualstudio.com/items?itemName=pirafrank.poof-setup).
An organization administrator installs it in your Azure DevOps organization.
2. **Add the task to your pipeline.** List the GitHub repositories for the tools you want.
Later steps in the same job can then run poof and the installed tools.

```yaml
steps:
  - task: SetupPoof@1
    inputs:
      packages: |
        lsd-rs/lsd
        dandavison/delta@0.18.0

  - bash: |
      poof --version
      lsd --version
      delta --version
```

To install poof without packages, omit `packages` or leave it empty. Package entries
use `owner/repository` or `owner/repository@tag`; separate multiple entries with commas
or newlines. Pin poof and package versions when you need reproducible builds.

To turn off poof's musl preference when selecting package release assets, set
`POOF_PREFER_MUSL=0` on the task step:

```yaml
- task: SetupPoof@1
  env:
    POOF_PREFER_MUSL: '0'
  inputs:
    packages: owner/repository
```

This setting affects package asset selection. On Linux, the extension still
installs poof itself from the matching musl asset.

## Inputs

| Input | Description | Default | Required |
|-------|-------------|---------|----------|
| `version` | Exact poof release, with or without `v`. `latest` reuses a recognized installed poof; otherwise it downloads the latest release. | `latest` | No |
| `packages` | Comma or newline-separated `owner/repository` or `owner/repository@tag` entries. | Empty | No |
| `token` | Optional GitHub token from a secret variable. `githubToken` is an alias. | Empty | No |

:::info
Pin poof and package versions for reproducible builds. The task version (`@1`)
is independent from the poof release selected by `version`.
:::

Azure Pipelines does not provide a GitHub token. You can pass an optional secret
to reduce GitHub API rate limiting:

```yaml
- task: SetupPoof@1
  inputs:
    version: v0.6.2
    token: $(MY_GITHUB_PAT)
    packages: dandavison/delta@0.18.0
```

Create `MY_GITHUB_PAT` as a secret in your pipeline settings, a variable group,
or an Azure Key Vault-linked variable group, then reference the variable as
shown above. See Microsoft's guides to [setting secret variables](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/set-secret-variables)
and [using variable groups](https://learn.microsoft.com/en-us/azure/devops/pipelines/library/variable-groups).
Do not put the token value in YAML. The task uses it for GitHub release lookup
and passes it to poof as `GITHUB_TOKEN` for package requests. An explicitly
mapped `GITHUB_TOKEN` environment variable is also accepted; the input takes
precedence. `System.AccessToken` is an Azure DevOps token and cannot
authenticate to GitHub.

## Supported agents

The extension supports Azure DevOps Services agents running Linux or macOS on
x64 or ARM64. Linux x64 agents use poof's `x86_64-unknown-linux-musl` asset,
Linux ARM64 agents use `aarch64-unknown-linux-musl`. Both glibc- and
musl-based Linux distributions use these assets.

Agents must be version 4.278.0 or newer and provide the `Node24` task runner.
`Bash`, `curl`, `tar`, and `grep` are required.

Windows, Azure DevOps Server, i686, and armv7 are not
supported.

## Installation directories and PATH

The poof executable is installed in `$HOME/.local/bin`. That directory and the
poof-managed package binary directory are added to `PATH` for later steps. No
shell profile is modified. Self-hosted agents reuse files between runs, so
concurrent jobs should use separate home directories.

Directories in use:

- **Linux**: poof uses `$XDG_DATA_HOME/poof/bin` when `XDG_DATA_HOME` is absolute,
or `$HOME/.local/share/poof/bin` otherwise;
- **macOS**: it uses `$HOME/Library/Application Support/poof/bin`.

## Security and privacy

The task requires a valid SHA256 digest for the selected poof archive in GitHub
release metadata and checks the downloaded archive against it before extracting
or running the binary. If the release also provides the combined
`poof-<version>-checksums.txt` manifest, the task checks the archive against
that manifest and confirms its digest matches GitHub's asset metadata. When a
Sigstore bundle is advertised, the task verifies the manifest signature against
the poof GitHub Actions release workflow identity; a missing advertised bundle,
manifest, or invalid signature fails installation.

Releases without the combined manifest (including poof `v0.6.2` and earlier)
produce a warning and use the verified GitHub API digest. If a manifest cannot
be downloaded and no signature bundle requires it, the task also warns and
continues with that digest. A release without a signature bundle also produces
a warning when a manifest is available; these warnings are reported as Azure
Pipelines task warnings.

Checksums and the GitHub asset digest detect changes relative to GitHub release
metadata; they do not independently authenticate the publisher when no valid
signature is verified.

Before installation, the task accepts only an archive with a regular root-level
`poof` file and checks that the executable reports the requested upstream
release URL. It refuses to overwrite an unrecognized existing `poof` file, and
stops executable version checks after 10 seconds. Reusing an already installed,
recognized poof executable skips release metadata and download verification.
Downloaded package executables run with agent permissions, so install packages
only from publishers you trust.

The extension adds no telemetry. It sends requests to GitHub for release
metadata and assets; poof makes its own requests for selected packages. A
provided GitHub token is masked in Azure logs and is not stored in the VSIX or
shell profiles.

See the [extension repository](https://github.com/pirafrank/poof-azure-extension)
for development and release details.
