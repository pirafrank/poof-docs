---
sidebar_label: npm Installation
title: npm Installation Troubleshooting
description: Troubleshoot installation and launch problems with the poof npm package
---

The `@pirafrank/poof` npm package is a launcher for a platform-specific native executable.
Use this page to diagnose package installation and launch errors.

## `poof: native package @pirafrank/poof-<os>-<cpu> is not installed`

The optional platform package may have been skipped or removed.

- **Optional dependencies are disabled.** `npm install --omit=optional`, `--no-optional`,
  or `optional=false` in `.npmrc` skips the native package. Reinstall with optional
  dependencies enabled:

  ```sh
  npm install --global --include=optional @pirafrank/poof
  ```

- **The install is incomplete or was pruned.** An interrupted install, `node_modules`
  cleanup, or an old lockfile can leave the package tree incomplete. Remove and reinstall:

  ```sh
  npm uninstall --global @pirafrank/poof
  npm install --global @pirafrank/poof
  ```

- **The package manager hides sibling packages.** Some pnpm and Yarn PnP configurations
  do not place scoped sibling packages where Node can resolve them. Use npm, configure your
  package manager to hoist `@pirafrank/*` (for pnpm, `public-hoist-pattern[]=@pirafrank/*`),
  or install from a [native release archive](https://github.com/pirafrank/poof/releases).

## `poof: unsupported platform`

The operating system or CPU is not one of the four supported npm targets. The launcher
prints the detected platform and supported targets. Build from source or download a native
[release archive](https://github.com/pirafrank/poof/releases).

## `poof: failed to execute ... (EACCES)` or `(ENOENT)`

The native package is installed, but its executable could not be started. Check that the
file exists and is executable (mode `0755`), that the filesystem is not mounted `noexec`,
and that security software is not blocking it. Reinstalling usually repairs a damaged
installation.
