---
sidebar_position: 5
sidebar_label: Environment Variables
title: Environment Variables
description: Configure poof behavior using environment variables
---

Poof supports several environment variables that allow you to customize its behavior without requiring configuration files. This page documents all available environment variables and their usage.

## Summary Table

| Variable             | Purpose                      | Default                            | Common Values                             |
|----------------------|------------------------------|------------------------------------|-------------------------------------------|
| `GITHUB_TOKEN`       | GitHub API authentication    | Not set                            | Token string                              |
| `POOF_PREFER_MUSL`   | Prefer musl over glibc       | Auto-detect                        | `1`, `0`, `true`, `false`                 |
| `POOF_GITHUB_API_URL`| Custom GitHub API endpoint   | `https://api.github.com/repos`     | URL string                                |
| `RUST_LOG`           | Logging verbosity            | `info`                             | `error`, `warn`, `info`, `debug`, `trace` |

## GITHUB_TOKEN

**Purpose:** Authenticate with GitHub API to increase rate limits

**Default:** Not set (uses unauthenticated requests)

**Accepted values:** Valid GitHub Personal Access Token

### Why You Need It

If you frequently install tools or work in environments with shared IP addresses, or plan to install many tools at once, setting a GitHub token is highly recommended.

See the [Rate Limiting](./rate-limiting.md) page for detailed instructions on creating a GitHub token.

## POOF_PREFER_MUSL

**Purpose:** Explicitly prefer musl-linked binaries over glibc

**Default:** Auto-detected (checks for glibc presence on Linux)

**Accepted values:**

- Enable: `1`, `true`, `TRUE`, `True`
- Disable: `0`, `false`, `FALSE`, `False`

### When to Use It

Set this variable when you prefer static builds over Glibc (`*-gnu`) ones.

The setting is unlikely to be needed in real-life. Poof detects Alpine Linux installation and which libc is present in the system and automatically falls back to MUSL builds when required.

### How to Set It

**Prefer musl builds:**

```bash
export POOF_PREFER_MUSL=1
```

## POOF_GITHUB_API_URL

**Purpose:** Override the default GitHub API endpoint

**Default:** `https://api.github.com/repos`

**Accepted values:** Any valid GitHub API URL

### When to Use It

This variable is primarily for:

- **GitHub Enterprise Server**: Point to your organization's GitHub Enterprise instance
- **Testing**: Use a mock server during development or testing
- **Custom endpoints**: Connect to alternative GitHub API implementations

### How to Set It

```bash
export POOF_GITHUB_API_URL="https://github.example.com/api/v3/repos"
```

:::warning
This is an advanced feature. Most users should not need to set this variable. The default value works for public GitHub (github.com).
:::

## RUST_LOG

**Purpose:** Control poof's logging verbosity for troubleshooting and debugging

**Default:** `info` level

**Accepted values:** `error`, `warn`, `info`, `debug`, `trace`

For detailed information about debug logging, see the [Debug Logs](./debug-logs.md) page.

**Quick example:**

```bash
# Enable debug logging for a single command
RUST_LOG=debug poof install user/repo
```

:::tip
When reporting bugs, always include output with `RUST_LOG=debug`. See the [Debug Logs](./debug-logs.md) page for complete instructions.
:::

## Combining Environment Variables

You can use multiple environment variables together:

```bash
# Use GitHub token, prefer musl, and enable debug logging
export GITHUB_TOKEN="ghp_xxxxxxxxxxxx"
export POOF_PREFER_MUSL=1
export RUST_LOG=debug

poof install user/repo
```

Or set them temporarily for a single command:

```bash
GITHUB_TOKEN="ghp_xxx" RUST_LOG=debug poof install user/repo
```

## Related Documentation

- [Rate Limiting](./rate-limiting.md) - Detailed guide on GitHub tokens
- [Debug Logs](./debug-logs.md) - Complete guide to debug logging with RUST_LOG
- [Features](./features.md) - Learn about smart asset selection
- [Support](./support.md) - Get help with configuration issues
