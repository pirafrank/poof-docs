---
sidebar_position: 2
sidebar_label: Versioning Policy
title: Versioning Policy
description: Understanding poof's versioning scheme
---

# Versioning Policy

poof adopts a [0ver](https://0ver.org/) versioning scheme, where the major version is permanently set to `0`, following the `0.x.y` convention.

The following versioning approach allows users to track feature growth and stability expectations, while enabling the tool to evolve flexibly during its early lifecycle.

## Major

Unlike traditional semantic versioning, the fixed `0` major version is not a placeholder for an eventual `1.0`, but an indication that there is an effort to provide stability yet it is not guaranteed across versions. Users should treat every new release—minor or patch—as potentially incompatible, and always consult release notes before upgrading.

## Minor

The *minor version* (`x` in `0.x.y`) is incremented whenever new features, commands, or significant improvements are introduced. This may include additions such as new subcommands, expanded options, enhanced output formatting, or improved UX patterns.

## Patch

The *patch version* (`y` in `0.x.y`) is reserved for backward-compatible changes such as bug fixes, security patches, and support for additional platforms, operating systems, or runtime environments.
