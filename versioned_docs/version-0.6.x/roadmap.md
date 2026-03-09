---
sidebar_label: Roadmap
title: Roadmap
description: Features and planned roadmap for poof
---

# Roadmap

## Overview

This document outlines both implemented and planned features for *poof*. This file also serves as a roadmap. It is organized by feature categories, commands, supported platforms, and compatible archive types.

Items are listed in no particular order. The list is not final and may change over time.

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
- ⏳ Easier install via shell script
- ✅ Ship pre-built binaries
- ✅ Install via `cargo install poof`
- ✅ Install via `cargo binstall poof`
- ⏳ `crossterm`-based terminal output
- ✅ Hidden `debug` command to show environment info
- ✅ Shell integration (via `enable` command)
- ⏳ Support providers other than GitHub
  - ⏳ GitLab.com
  - ⏳ Codeberg
- ✅ Multi-thread path traversal in `list` command
- ✅ Multi-thread updates with `update --all` command

## Commands

- ✅ `help` - show help information about poof
- ✅ `enable` - add poof's bin directory to `$PATH` in `~/.bashrc` or `~/.zshrc`
- ✅ `download` - only download the binary for current platform to current directory
- ✅ `install` - download the binary for current platform and install to poof's bin directory
- ✅ `list` - list all installed binaries
- ✅ `use` - make an installed version the one to be used by default
- ✅ `update USER/REPO` - update an installed binary to the latest version
- ✅ `update --all` - update all installed binaries to their latest versions
- ✅ `update --self` - use poof to update poof itself
- ⏳ `remove USER/REPO` - remove symlink to a binary installed in poof's bin dir
- ⏳ `purge USER/REPO` - remove **all** installed binaries for a given slug (username/reponame)
- ⏳ `cleanup` - empty cache dir
- ✅ `check` - check if poof's bin directory is in the `$PATH`
- ✅ `version` - show version information about poof
- ✅ `info` - show install and environment
- ⏳ `run EXEC VERSION -- args...` - run a specific version of a command (useful when multiple versions are installed)
- ⏳ `export` - export installed apps and their version in plain text (default), JSON, or YAML format
- ⏳ `import` - import installed apps and their version in plain text (default), JSON, or YAML format
- ⏳ `hold` - disable updates for an app
- ⏳ `unhold` - re-enable updates for an app
- ✅ Support for `--help` flag for all commands
- ✅ Increasing logging verbosity to sysout via `-v...` flags
- ⏳ Optional logs to file (with same level verbosity as above)
- ⏳ Support shortened versions of commands (e.g. `poof i` for `poof install`)

## Archive types

Supported archive types of GitHub releases to download, unpack, and install:

- ✅ non compressed archives
- ✅ `application/zip` archives
- ✅ `application/gzip` archives
- ⏳ `application/x-gzip` archives
- ✅ `application/x-gtar` archives
- ✅ `application/x-xz` archives
- ✅ `application/x-bzip2` archives
- ✅ `application/x-tar` archives (experimental)
- ✅ `application/x-7z-compressed` archives (experimental)
