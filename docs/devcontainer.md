---
sidebar_position: 1
sidebar_label: Devcontainer feature
title: Devcontainer feature
description: Install and setup poof in your Devcontainer
---

[Development containers](https://containers.dev) (devcontainers) are a
standardized way to define reproducible, containerized development environments.
They let you espress as code your tooling, dependencies, and configuration so
every developer (and CI run) gets an identical setup.

`poof` ships as a [devcontainer feature](https://containers.dev/features),
a self-contained unit that installs and configures a tool inside a devcontainer
image. You can mix and match features to build your ideal environment without
writing custom Dockerfiles.

The `poof` feature is published on the GitHub Container Registry and works with
any devcontainer-compatible tooling, including VS Code Dev Containers,
GitHub Codespaces, and the Dev Container CLI.

## Usage

Add the feature to your `devcontainer.json` configuration file:

```json
"features": {
    "ghcr.io/pirafrank/poof/poof:1": {}
}
```

On the next container rebuild, `poof` will be installed and ready to use inside
the environment.

Run `poof help` to test it and know about available commands.

## Options

| Options Id | Description | Type | Default Value |
|-----|-----|-----|-----|
| version | Version of poof to install (e.g. `latest` or `0.6.0`) | string | latest |

## Requirements

The feature depends on `curl` and `tar` being available in the image.

Most devcontainer base images include them. If you use a minimal image, install
them first via `ghcr.io/devcontainers/features/common-utils` or your image's
package manager.

## Additional notes

- poof is installed into `/usr/local/bin`, which is on `$PATH` by default in
  all devcontainer base images.
- Tools installed by poof go into the poof data directory
  (`~/.local/share/poof/bin` on Linux). Run `poof enable` or add it to `$PATH`
  manually if you need it in interactive shells.

## Examples

### Use with Ubuntu image

Basic usage in an Ubuntu base image:

```json
{
  "image": "mcr.microsoft.com/devcontainers/base:ubuntu",
  "features": {
    "ghcr.io/pirafrank/poof/poof:1": {}
  }
}
```

### Pin a specific poof version

By default the latest release is installed. Pass the `version` option to pin it:

```json
"features": {
  "ghcr.io/pirafrank/poof/poof:1": {
    "version": "0.6.0"
  }
}
```

> The `v` prefix is optional — both `"0.6.0"` and `"v0.6.0"` are accepted.

### Installing tools with poof after container creation

Once the feature is installed, use `postCreateCommand` (or any lifecycle hook)
to install your tools:

```json
{
  "image": "mcr.microsoft.com/devcontainers/base:ubuntu",
  "features": {
    "ghcr.io/pirafrank/poof/poof:1": {}
  },
  "postCreateCommand": "poof install pirafrank/vault-conductor"
}
```

### Install multiple tools

For multiple tools, use a shell script or chain commands:

```json
{
  "postCreateCommand": "poof install pirafrank/vault-conductor && poof install ms-jpq/sad@v0.4.32"
}
```

Or put them in a script,

```json
{
  "postCreateCommand": ".devcontainer/install-tools.sh"
}
```

and call it:

```sh
#!/bin/sh
# .devcontainer/install-tools.sh
set -e
poof install pirafrank/vault-conductor
poof install ms-jpq/sad@v0.4.32
```

:::info
Installing multiple tools at once may require a `GITHUB_TOKEN` environment
variable to avoid [rate limiting](./rate-limiting.md). That is typically not
needed in GitHub Codespaces, because they automatically inject a `GITHUB_TOKEN`
environment variable that poof automatically reads to perform authenticated
requests.
:::

## Further reading

- [Advanced usage](./advanced-usage)
- [Dev Container Features specification](https://containers.dev/implementors/features/)
- [devcontainers/features on GitHub](https://github.com/devcontainers/features)
