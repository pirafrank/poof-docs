---
sidebar_label: Usage
title: Using poof
description: Basic usage guide for poof commands
---

# Using poof

## Let's install something!

If you already have `poof` available in your shell, try installing something.

For example:

```sh
poof install pirafrank/vault-conductor
```

## Getting Help

To see all available commands, run:

```sh
poof help
```

## Available Commands

Here's the full help output from poof:

```txt
poof - magic manager of pre-built software

Usage: poof [OPTIONS] <COMMAND>

Commands:
  download     Only perform download for the platform in current directory. Do not install
  install      Download binary for the platform and install it
  list         List all installed binaries and their versions
  which        Show which repository provides a binary
  what         List all binaries provided by the latest version of a repository
  use          Set an installed version of a slug as the default one
  update       Update installed binaries of a slug or all installed binaries to their latest versions
  unlink       Remove binary from PATH. Use 'poof use' to re-add it
  uninstall    Uninstall a version or all versions of a repository
  enable       Persistently add poof's bin directory to your shell PATH
  check        Check if poof's bin directory is in the PATH
  completions  Generate shell completions to stdout
  init         Generate shell-specific init script to add poof bin directory to PATH
  clean        Empty the cache directory
  info         Show install and environment information
  version      Show version information
  help         Print this message or the help of the given subcommand(s)

Options:
  -v, --verbose...  Increase logging verbosity
  -q, --quiet...    Decrease logging verbosity
  -h, --help        Print help
  -V, --version     Print version

For more information, visit: https://github.com/pirafrank/poof

If you encounter any issues, please report them at:
https://github.com/pirafrank/poof/issues
```

## Examples

### Install a binary

```sh
poof install <USER>/<REPO>
```

### Install a specific version of a binary

```sh
poof install <USER>/<REPO> -t <TAG>
```

### List installed binaries

```sh
poof list
```

### Update an installed binary

```sh
poof update <USER>/<REPO>
```

### Update all installed binaries

```sh
poof update --all
```

### Switch between versions of a binary

```sh
poof use <USER>/<REPO> version
```

### Check if poof is in $PATH

```sh
poof check
```

### Get info

```sh
poof info
```

## Need Help?

For more information, visit: [https://github.com/pirafrank/poof](https://github.com/pirafrank/poof)

If you encounter any issues, please report them at: [https://github.com/pirafrank/poof/issues](https://github.com/pirafrank/poof/issues)
