---
sidebar_position: 2
sidebar_label: Development Guide
title: Development Guide
description: Guide for developers working on poof
---

# Development Guide

## Dev platforms

The following platforms are supported to develop *poof* on:

- Linux (x86_64, aarch64)
- WSL2 (Debian-based on x86_64)
- macOS on Intel
- macOS on Apple Silicon

## Dev environment

You'll need:

- `zsh` or `bash`
- `git`
- Rust + `cargo`
- [just](https://github.com/casey/just)
- An IDE or a text editor w/ LSP (VS Code, neovim, etc.)

## Development features

- ✅ Just tasks
- ✅ Tests, Tests, Tests!
- ✅ CI pipeline
- ✅ CI `cross` check pipeline
- ✅ `git cliff`-generated changelog
- ✅ Release pipeline
- ✅ Security audit pipeline
- ✅ License check pipeline (checks deps license compatibility)
