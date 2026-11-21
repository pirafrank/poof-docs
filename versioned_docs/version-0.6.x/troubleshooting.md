---
sidebar_position: 1
sidebar_label: Overview
title: Troubleshooting
description: Diagnose common poof installation, download, and shell issues
---

This guide covers common problems with `poof`. For a useful first check, run
`poof info` to see the detected platform and managed directories, and `poof check`
to check whether poof's `bin` directory is available in `PATH`.

When a problem persists, rerun the failing command with debug logging:

```bash
RUST_LOG=debug poof install owner/repository 2>&1 | tee poof-debug.log
```

Replace the example command with the one that failed. See [Debug Logs](./debug-logs.md)
for more ways to capture diagnostic output.

## GitHub lookup or download fails

Check that the repository is written as `owner/repository`, that you can reach
GitHub, and that the repository has a release. If GitHub reports a rate limit,
configure `GITHUB_TOKEN` and follow the [Rate Limiting](./rate-limiting.md) guide.

## No compatible release asset is found

Poof selects release assets for the current operating system, CPU architecture,
and Linux libc preference. Confirm that the project publishes a compatible asset
and review [Supported Platforms](./supported-platforms.md) and [How It Works](./how-it-works.md).

## Archive validation or extraction fails

The release asset may be corrupted, use an unsupported format, or have a filename
that does not match its contents. Try again or check the release page for a valid
asset. Poof validates archive type and applies extraction limits for safety.

## An installed command is missing or the wrong version runs

Run `poof check` to inspect `PATH`. If the managed `bin` directory is missing,
follow [Shell Configuration](./shell-configuration.md). Use `poof list` to inspect
installed repositories, `poof which <binary>` to locate a binary, and
`poof what <repository>` to inspect the binaries provided by its highest-sorting installed version.
Use `poof list <repository>` to inspect its installed versions.

## Version selection or update fails

Check that the repository is installed and that the requested release tag exists.
Use `poof list` to review installed versions. For a fresh install, confirm the
release tag on the repository's GitHub Releases page.

## Poof cannot read or write managed files

Run `poof info` to see the data, cache, and binary directories in use. Check that
your account can access those paths and has space available. See [Data Storage](./data-storage.md)
for the platform-specific locations.

## Reporting a bug

If these steps do not resolve the issue, [report it](./support.md) with:

- The exact command and complete error output
- Output from `poof info`
- Your operating system and architecture
- Debug output from the failing command
