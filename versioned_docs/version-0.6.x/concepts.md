---
sidebar_position: 1
sidebar_label: Overview
title: Concepts
description: Understanding key concepts in poof
---

# Concepts

Both in code and in documentation you may come across different concepts and abstractions.

## Before we start

Before we start, some common concepts:

- **executable**: an exec file (can be ELF, Mach-O, etc.)
- **repository**: a (usually Git) repository from GitHub, Codeberg, Forgejo, or Gitea
- **release**: a release published on those code hosting platforms
- **asset**: one of the files published with a release. Note that:
  - there may be more than one asset to download for your OS and architecture (e.g. `ahmetb/kubectx` having both `kubectx` and `kubens`)
  - or there may be more than one executable file inside an asset (e.g. a release tar.gz containing multiple tools)

## Poof's concepts

Below are `poof`'s concepts with some *magic!*:

- **slug**: a `USER/REPO` string
- **spell**: a program you have installed specifying a slug in `install` command. Note that you may install multiple versions side by side
- **spell version**: a specific version of a *spell*
- **binary**: an exec file of a specific version of a *spell*
