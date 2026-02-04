---
sidebar_position: 1
sidebar_label: How to
title: How to contribute
description: Guide to contributing to the poof project
---

# How to contribute

A full guide about how to contribute to the project is available in the [CONTRIBUTING.md](https://github.com/pirafrank/poof/blob/main/CONTRIBUTING.md) file, where you can also read about code [styleguides](https://github.com/pirafrank/poof/blob/main/CONTRIBUTING.md#styleguides), and [issue and PR labels](https://github.com/pirafrank/poof/blob/main/CONTRIBUTING.md#issue-and-pull-request-labels).

Please use:

- git conventional commits with prefixes, as listed in [git cliff configuration](http://github.com/pirafrank/poof/blob/main/cliff.toml#L68) for the project
- [no merge commits](https://github.com/facet-rs/facet/discussions/581)

## Target branch

`main` is the go-to branch to target PRs.

You may enable git hooks with `just install-hooks` to automatically run checks before pushing code. Thank you.
