---
sidebar_position: 3
sidebar_label: Overview
title: Features
description: What makes poof different
---

## Overview

This page provides a comprehensive overview of poof's capabilities, exploring both its practical features and the design principles.

## Core Features

### 🚀 Easy to Use

Poof prioritizes simplicity with intuitive commands that follow a consistent pattern:

```bash
poof install BurntSushi/ripgrep              # Install the latest version
poof install sharkdp/fd --tag v8.7.0         # Install a specific version
poof list                                    # See what's installed
poof use BurntSushi/ripgrep 13.0.0           # Switch versions instantly
poof uninstall BurntSushi/ripgrep -v 13.0.0  # Uninstall a specific version
```

No need to memorize complex flags or consult documentation constantly. Every command is designed to be self-explanatory, and `poof help` provides comprehensive guidance whenever you need it.

### 👤 User-Space Operation

Unlike traditional package managers that require root access and modify system directories, poof operates entirely in user-space:

- **No sudo required**: Install and manage tools without administrative privileges
- **Portable**: Your tools directory can be backed up, synced, or moved between machines
- **Isolated**: No conflicts with system packages or other package managers
- **Safe**: Cannot break your system or interfere with OS-level dependencies

This makes poof ideal for development environments, CI/CD pipelines, shared systems, and anywhere you need to manage tools without system-wide changes.

### 🧠 Smart Asset Selection

Poof automatically detects your system configuration and selects the right binary:

#### Platform Detection

- Identifies your operating system (Linux, macOS)
- Detects CPU architecture (x86_64, aarch64, arm, i686, and more)
- Determines libc variant (glibc vs musl on Linux)

#### Advanced Release Handling

- **Multi-tool releases**: Correctly navigates repositories that distribute distinct CLI binaries as individual assets side-by-side (e.g., distinguishing `kubectx` from `kubens` in `ahmetb/kubectx`)
- **Multi-binary assets**: Detects and handles complex assets with multiple executables inside (e.g., `sxyazi/yazi`)
- **Mono-repos**: Use tag pattern matching to isolate a specific release in mono-repos or repositories with mixed release types (e.g., `bitwarden/sdk-sm -t bws-v1.0.0`).
- **Non-semantic versions**: Works with tools that don't follow Semantic Versioning (e.g., `gokcehan/lf`).
- **Musl automatic fallback**: Adapts and fallbacks to musl when Glibc is not available on the machine, or when a static build is the only available option (e.g., `Byron/dua-cli`)

#### Intelligent Matching

- Fuzzy matching for repository names catches typos and suggests corrections
- Asset filtering prioritizes your exact platform over generic releases
- Automatic extraction of nested binaries from complex archive structures

### 📦 Comprehensive Archive Support

Poof handles 10+ archive formats with robust validation:

**Supported Formats:**

- **ZIP** (`.zip`)
- **TAR** variants: `.tar`, `.tar.gz`, `.tgz`, `.tar.bz2`, `.tbz2`, `.tar.xz`, `.txz`, `.tar.zst`
- **7-Zip** (`.7z`)
- **Gzip** (`.gz`)
- **Bzip2** (`.bz2`)
- **XZ** (`.xz`)
- **Zstandard** (`.zst`)

**Features:**

- **Magic number validation**: Verifies actual file type regardless of extension
- **Streaming extraction**: Efficient memory usage even for large archives
- **Nested archive support**: Handles archives within archives
- **Compression detection**: Automatically applies the right decompression algorithm

### 🔄 Version Management

Install and manage multiple versions of the same tool side-by-side:

```bash
# Install multiple versions
poof install BurntSushi/ripgrep --tag 14.0.0
poof install BurntSushi/ripgrep --tag 13.0.0
poof install BurntSushi/ripgrep --tag 12.1.0

# Switch between versions instantly
poof use BurntSushi/ripgrep 13.0.0

# See all installed versions
poof list
```

**Benefits:**

- Test compatibility with different tool versions
- Pin specific versions for reproducible builds
- Quickly rollback if a new version has issues
- No need to uninstall before installing another version

### 🧹 Clean Management

Poof follows the XDG Base Directory Specification for organized, predictable storage:

```
~/.local/share/poof/     # Installed binaries and metadata
~/.cache/poof/           # Downloaded archives and temporary files
```

### 🔍 Helpful Error Handling

Poof provides clear, actionable error messages:

#### Fuzzy Matching

```bash
$ poof use BurntTushi/ripgrep 14.1.1
Setting version '14.1.1' as default for BurntTushi/ripgrep
[ERROR] It looks like 'BurntTushi/ripgrep' is not installed. Did you mean: BurntSushi/ripgrep
[ERROR] Check installed binaries using 'list' command.
```

#### Conflict Detection

```bash
$ poof install someuser/tool
warn: A binary named 'tool' already exists in PATH
```

#### Context in Errors

Every error message includes:

- What went wrong
- Why it happened
- Suggested next steps
- Relevant file paths or commands

### 🐚 Shell Integration

Native support for 7 popular shells with completions and PATH setup.

- Tab completions for all commands and flags
- One-command PATH configuration: `poof enable --shell bash` (or your shell)
- Generate init scripts: `poof init --shell zsh`
- Persistent completions that survive shell restarts

## Core Philosophy

### 📃 Zero-Maintenance

Poof eliminates the traditional dependency on package managers:

- **No waiting for users**: Users can install tools directly from GitHub releases without waiting for package maintainers to update formulas, recipes, or package definitions
- **Stress-free for maintainers**: Software authors don't need to explicitly support yet another package manager, or add it to their release process: if it's on GitHub Releases, poof can install it
- **Self-service**: Users can immediately access new releases as soon as authors publish them
- **No gatekeepers**: No need to submit PRs to package repositories or wait for approval from maintainers

### 🛠️ Zero-Config

Poof works out of the box with sensible defaults:

- No configuration files to create or edit
- No YAML, TOML, JSON, or INI files to maintain
- Smart defaults based on XDG Base Directory Specification
- Works immediately after installation

**When you need it:** Environment variables allow customization of paths without config files.

### 📦 Zero-Install

Poof itself is a single, self-contained binary:

- No dependencies to install first
- No runtime requirements
- Download, add to PATH, and start using
- Uninstall by simply removing the binary: `rm $(which poof)`

**Benefits:**

- Fast setup on new machines
- Easy to distribute in CI/CD
- No version conflicts or dependency hell
- Complete control over installation location

### 🔗 Zero-Dependencies

Poof bundles everything it needs:

- Archive extraction: built-in support for all formats
- HTTP client: native async requests
- Platform detection: no external tools required
- No Python, Ruby, Node.js, or other runtime needed

This makes poof reliable across different environments and ensures it won't break if system packages are updated or removed.

## Why poof?

### vs Traditional Package Managers

- **No root required**: Works in restricted environments
- **Cross-platform**: Same tool on Linux and macOS
- **Latest versions**: Install directly from GitHub releases
- **User-space**: Won't conflict with system packages

### vs Language-Specific Managers

- **Language-agnostic**: Install any tool regardless of implementation
- **No language runtime**: Works without Python, Node, Ruby, etc.
- **Lightweight**: Single binary vs entire runtime environment

### vs Manual Installation

- **Automated**: No manual downloading and extracting
- **Version management**: Easy switching between versions
- **Updates**: Simple upgrade process
- **Organized**: Clean directory structure
