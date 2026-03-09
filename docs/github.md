---
sidebar_position: 1
sidebar_label: GitHub Action
title: GitHub Action
description: Integrate it in your GitHub workflow
---

The `poof` GitHub Action lets you bootstrap `poof` on any GitHub-hosted (or
self-hosted) runner and optionally install a list of pre-built binaries from
GitHub Releases, all in a single workflow step.

The action is available in the
[GitHub Actions Marketplace](https://github.com/marketplace/actions/setup-poof).

## Usage

### Setup only

Add `poof` to the runner `PATH` without installing any packages:

```yaml
- name: Setup poof
  uses: pirafrank/poof@main
```

### Setup and install packages

Bootstrap `poof` and install one or more tools at once:

```yaml
- name: Setup poof and install packages
  uses: pirafrank/poof@main
  with:
    packages: |
      pirafrank/vault-conductor
      ms-jpq/sad@v0.4.32
```

### Pin a specific poof version

```yaml
- name: Setup poof and install packages
  uses: pirafrank/poof@main
  with:
    version: v0.6.0
    packages: pirafrank/vault-conductor
    token: ${{ secrets.GITHUB_TOKEN }}
```

## Inputs

| Input | Description | Default |
|-------|-------------|---------|
| `packages` | Newline or comma-separated list of `USERNAME/REPO` (or `USERNAME/REPO@TAG`) entries to install. Leave empty to skip package installation. | - |
| `version` | Version of `poof` to bootstrap (e.g. `v0.6.0`). Use `latest` to always install the most recent release (recommended). | `latest` |
| `token` | GitHub token used for API requests inside poof to avoid rate limiting. | `${{ github.token }}` |

## Package format

Packages are specified as `USERNAME/REPO` GitHub slugs, optionally pinned to a
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
(60 requests/hour per IP). The action defaults to the workflow's built-in
`GITHUB_TOKEN`, which raises the limit to 5,000 requests/hour. You can supply
a different token via the `token` input.

## How it works

1. Downloads and places `poof` in `$HOME/.local/bin`, then adds that directory
   to `$GITHUB_PATH` so subsequent steps can call `poof` directly.
2. Adds poof's bin directory (where installed tools land) to `$GITHUB_PATH` as
   well, so installed binaries are immediately available to all later steps.
3. If `packages` is set, iterates over each entry and runs
   `poof install USER/REPO [--tag TAG]`.

The action is idempotent: if `poof` is already present in the install directory
it skips re-downloading it.

## Supported platforms

| OS | Architecture |
|----|-------------|
| Linux (glibc) | x86_64, aarch64, armv7, i686 |
| Linux (musl) | x86_64, aarch64, armv7, i686 |
| macOS | x86_64 (Intel), aarch64 (Apple Silicon) |
