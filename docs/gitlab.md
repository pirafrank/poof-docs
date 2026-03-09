---
sidebar_position: 1
sidebar_label: GitLab Component
title: GitLab Component
description: Integrate it in your GitLab workflow
---

The `poof` GitLab CI/CD Component lets you bootstrap `poof` on any GitLab
runner and optionally install a list of pre-built binaries from GitHub Releases,
all in a single pipeline job.

The component is published to the
[GitLab CI/CD Catalog](https://gitlab.com/explore/catalog/pirafrank/poof-gitlab-component).

## Usage

### Setup only

Add `poof` to the runner environment without installing any packages:

```yaml
include:
  - component: $CI_SERVER_FQDN/pirafrank/poof-gitlab-component/poof@~latest

my-job:
  stage: build
  needs:
    - job: poof-setup
      artifacts: true
  script:
    - export PATH="${POOF_INSTALL_DIR}:${POOF_BIN_DIR}:${PATH}"
    - poof --version
```

### Setup and install packages

Bootstrap `poof` and install one or more tools at once:

```yaml
include:
  - component: $CI_SERVER_FQDN/pirafrank/poof-gitlab-component/poof@~latest
    inputs:
      version: "v0.6.0"
      packages: |
        pirafrank/vault-conductor@v0.3.0
        ms-jpq/sad
      github_token: $MY_GITHUB_TOKEN

stages: [setup, build]

my-job:
  stage: build
  needs:
    - job: poof-setup
      artifacts: true
  script:
    - export PATH="${POOF_INSTALL_DIR}:${POOF_BIN_DIR}:${PATH}"
    - export XDG_DATA_HOME="${XDG_DATA_HOME}"  # required if this job calls poof install
    - vault-conductor --version
    - sad --version
```

### Including the component more than once

Use the `job_name` input to avoid job name collisions when including the
component multiple times:

```yaml
include:
  - component: $CI_SERVER_FQDN/pirafrank/poof-gitlab-component/poof@~latest
    inputs:
      job_name: "setup-tools-a"
      packages: "pirafrank/vault-conductor"

  - component: $CI_SERVER_FQDN/pirafrank/poof-gitlab-component/poof@~latest
    inputs:
      job_name: "setup-tools-b"
      packages: "ms-jpq/sad"
```

## Inputs

| Input | Description | Default |
|-------|-------------|---------|
| `version` | Version of `poof` to bootstrap (e.g. `v0.6.0`). Use `latest` to always install the most recent release (recommended). | `latest` |
| `packages` | Newline or comma-separated list of `USER/REPO` (or `USER/REPO@TAG`) entries to install. Leave empty to skip package installation. | `""` |
| `github_token` | GitHub token passed to poof for authenticated API requests (avoids rate limiting). Pass a CI/CD variable - do **not** hardcode a token. | `""` |
| `stage` | Pipeline stage in which the poof job runs. | `.pre` |
| `job_name` | Name for the generated job. Override to avoid conflicts when including the component more than once. | `poof-setup` |

## Outputs (dotenv artifact)

The component job exports the following variables via a `dotenv` artifact.
Downstream jobs that declare `needs: [{job: poof-setup, artifacts: true}]`
receive them automatically.

| Variable | Description |
|----------|-------------|
| `POOF_INSTALL_DIR` | Directory where the `poof` binary is installed (`.poof/bin` inside the project). |
| `POOF_BIN_DIR` | Directory where poof places installed tools (`.poof/xdg/poof/bin` inside the project). |
| `XDG_DATA_HOME` | XDG data root used by poof (`.poof/xdg` inside the project). Re-export this if a downstream job calls `poof install`. |

Add to `PATH` in downstream jobs, and re-export `XDG_DATA_HOME` if the job
will call `poof install` itself:

```bash
export PATH="${POOF_INSTALL_DIR}:${POOF_BIN_DIR}:${PATH}"
export XDG_DATA_HOME="${XDG_DATA_HOME}"
```

## Package format

Packages are specified as `USER/REPO` GitHub slugs, optionally pinned to a
specific release tag with `@TAG`:

```txt
pirafrank/vault-conductor         # latest release
pirafrank/vault-conductor@v0.3.0  # specific tag
ms-jpq/sad
```

Multiple packages can be separated by newlines or commas.

:::info
When writing `@TAGNAME` use the actual tag name, **not the release name**!

You can find it in the GitHub release page, on the left side,
under the release date.
:::

## Rate limiting

`poof` makes GitHub API calls to resolve releases. Without a token these calls
are unauthenticated and subject to GitHub's
[rate limit](https://docs.github.com/en/rest/overview/rate-limits-for-the-rest-api)
(60 requests/hour per IP). Pass a GitHub personal access token via
`github_token` to raise this limit to 5,000 requests/hour.

Store the token as a
[masked CI/CD variable](https://docs.gitlab.com/ci/variables/#mask-a-cicd-variable)
in your project or group settings, then reference it:

```yaml
inputs:
  github_token: $MY_GITHUB_TOKEN
```

## Versioning

This component is versioned independently from `poof` itself. A new component
release is only needed when the component's own behavior changes, not every
time `poof` ships a new version (the `version` input handles `poof` version
selection).

Use [partial semantic versions](https://docs.gitlab.com/ci/components/#partial-semantic-versions)
for safe automatic updates:

| Reference | Behavior |
|-----------|----------|
| `~latest` | Always the newest published version (may include breaking changes) |
| `1` | Latest `1.x.x` version |
| `1.0` | Latest `1.0.x` patch |
| `1.0.0` | Exact pinned version |

## How it works

1. Downloads and places `poof` in `.poof/bin` inside `CI_PROJECT_DIR`, then
   exports `POOF_INSTALL_DIR` via a dotenv artifact so downstream jobs can
   add it to `PATH`.
2. Sets `XDG_DATA_HOME` to `.poof/xdg` so installed tools land in a
   project-local directory. Exports `POOF_BIN_DIR` and `XDG_DATA_HOME` via
   the same dotenv artifact.
3. Exports the entire `.poof/` directory as a job artifact so downstream jobs
   receive both the `poof` binary and any installed packages automatically.
4. If `packages` is set, iterates over each entry and runs
   `poof install USER/REPO [--tag TAG]`.

The job is idempotent: if `poof` is already present in the install directory
it skips re-downloading it.

## Supported platforms

| OS | Architecture |
|----|-------------|
| Linux (glibc) | x86_64, aarch64, armv7, i686 |
| Linux (musl) | x86_64, aarch64, armv7, i686 |
| macOS | x86_64 (Intel), aarch64 (Apple Silicon) |
