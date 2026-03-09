---
sidebar_label: Roadmap
title: Roadmap
description: Features and planned roadmap for poof
---

This document outlines both implemented and planned features for *poof*.
This file also serves as a roadmap. It is organized by feature categories,
commands, supported platforms, and compatible archive types.

Items are listed in no particular order. The list is not final and may change
over time.

Currently supported commands are always defined in the [Usage](./usage.md) section.

Got a feature request? Open an [issue](https://github.com/pirafrank/poof/labels/feature%20request).

## Features

- ✅ Download from GitHub releases. Support for GitHub releases API (version 2022-11-28)
- ✅ Automatic understanding of the correct binary for the platform *poof* is running on
- ✅ Select `latest` version for download if no version is specified
- ✅ Option to download and install user-defined version of the binary
- ⏳ Perform checksum validation if release has one
- ✅ Download and extract it to cache dir, install to data dir, and symlink to bin directory
- ✅ Use tag_name from serde parsed API output as subdir for all installs, including *latest*
- ✅ Cleanup of `v` version prefix of release, if release has it
- ✅ Support archives that contain a directory with the same name as the archive inside
- ✅ Easier install via shell script
- ✅ Ship pre-built binaries
- ✅ Install via `cargo install poof`
- ✅ Install via `cargo binstall poof`
- ✅ Install via Homebrew
- ⏳ Install via Macports ([pending](https://github.com/macports/macports-ports/pull/31327))
- ✅ Install via Apt, Yum/Dnf, APK
- ✅ Install via AUR
- ✅ Install via Nix
- ✅ Install via asdf
- ⏳ `crossterm`-based terminal output
- ✅ Hidden `debug` command to show environment info
- ✅ Shell integration (via `enable` command)
- ⏳ Support providers other than GitHub
  - ⏳ GitLab.com
  - ⏳ Forgejo
  - ⏳ Codeberg
  - ⏳ Gitea
- ⏳ Support installation from URL (pass archive URL to `install` command)
- ✅ Multi-thread path traversal in `list` command
- ✅ Multi-thread updates with `update --all` command
- ✅ Devcontainer feature
- ✅ GitHub Action
- ✅ GitLab component

## Commands

- ✅ `help` - show help information about poof
- ✅ `enable` - add poof's bin directory to `$PATH` in `~/.bashrc` or `~/.zshrc`
- ✅ `download` - only download the binary for current platform to current directory
- ✅ `install` - download the binary for current platform and install to poof's
  bin directory
- ✅ `list` - list all installed binaries
- ✅ `list USER/REPO` - list all installed binaries for a given repository
- ✅ `use` - make an installed version the one to be used by default
- ✅ `which` - show which repository provides a binar
- ✅ `what` - list all binaries provided by the latest version of a repository
- ✅ `update USER/REPO` - update an installed binary to the latest version
- ✅ `update --all` - update all installed binaries to their latest versions
- ✅ `unlink BINARY` - remove binary from `$PATH`. Use 'poof use' to re-add it
- ✅ `uninstall USER/REPO` - remove **all** installed binaries for a given USER/REPO
- ✅ `clean` - empty the cache directory
- ✅ `completions` - generate shell completions to stdout
- ✅ `init`- generate shell-specific init script to add poof bin directory to `$PATH`
- ✅ `check` - check if poof's bin directory is in the `$PATH`
- ✅ `version` - show version information about poof
- ✅ `info` - show install and environment
- ⏳ `run EXEC VERSION -- args...` - run a specific version of a command (useful
  when multiple versions are installed)
- ⏳ `export` - export installed apps and their version in plain text (default),
  JSON, or YAML format
- ⏳ `import` - import installed apps and their version in plain text (default),
  JSON, or YAML format
- ⏳ `hold` - disable updates for an app
- ⏳ `unhold` - re-enable updates for an app
- ✅ Support for `--help` flag for all commands
- ✅ Increasing logging verbosity to sysout via `-v...` flags
- ⏳ Support shortened versions of commands (e.g. `poof i` for `poof install`)
