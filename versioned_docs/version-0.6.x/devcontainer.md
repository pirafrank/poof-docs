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
