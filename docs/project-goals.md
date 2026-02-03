---
sidebar_label: Project Goals
title: Project Goals
description: What poof aims to achieve and what it doesn't
---

# Project Goals

What the development is focused on.

Poof is built upon the UNIX philosophy of _do one thing and do it well_. The development focus remains strictly on adhering to this principle, ensuring the tool delivers focused, reliable functionality without introducing unnecessary complexity or features better handled by other tools.

## Goals

- Fetch and put in `$PATH` pre-built binaries available on Internet
- Work without requiring buckets, repositories, or registries
- Work out-of-the-box with no setup or configuration needed
- Be designed to work in user-space
- Be as cross-platform as possible
- Be easy to use, with sensible and ergonomic commands and options
- Have no external dependencies

## Non-goals

- Build software from source code
- Manage software that doesn't provide pre-built binaries
- Act as a general package manager
- Manage software installed by other tools or package managers
  - Replace or modify binaries installed by other package managers
  - Manage dependencies required by the software
  - Handle language-specific package managers (pip, npm, cargo, etc.)
  - Interface with system package managers (apt, yum, brew, etc.)
