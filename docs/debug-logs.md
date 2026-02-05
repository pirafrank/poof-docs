---
sidebar_position: 7
sidebar_label: Debug Logs
title: Debug Logs
description: Using debug logging to troubleshoot poof issues
---

Poof supports detailed debug logging to help troubleshoot issues, understand internal behavior, and provide better bug reports.

## RUST_LOG Environment Variable

**Purpose:** Control poof's logging verbosity

**Default:** `info` level

**Accepted values:** Standard Rust logging levels

- `error` - Only show errors
- `warn` - Show warnings and errors
- `info` - Show informational messages (default)
- `debug` - Show detailed debug information
- `trace` - Show extremely verbose output

## When to Use Debug Logs

Use debug logging when:

- Troubleshooting installation issues
- Reporting bugs (always attach debug output)
- Understanding poof's internal behavior
- Debugging asset selection logic
- Investigating why a specific asset was selected or rejected
- Checking platform detection accuracy

## How to Enable Debug Logs

### Temporary (for a single command)

```bash
RUST_LOG=debug poof install user/repo
```

This is the most common way to enable debug logs - just for the command you're troubleshooting.

### Persistent (in shell config)

Add to your shell configuration file (`.bashrc`, `.zshrc`, etc.):

```bash
export RUST_LOG=debug
```

Then reload your shell:

```bash
source ~/.bashrc  # or ~/.zshrc, etc.
```

:::warning
Keeping `RUST_LOG=debug` enabled permanently will create very verbose output. It's recommended to only enable it temporarily when needed.
:::

## Example Output Levels

### info (default)

Normal output with informational messages:

```bash
$ poof install pirafrank/vault-conductor
Installing pirafrank/vault-conductor...
Downloaded vault-conductor v1.0.0
Installed successfully
```

### debug

Detailed output showing internal operations:

```bash
$ RUST_LOG=debug poof install pirafrank/vault-conductor
[DEBUG] Detected OS: linux, Arch: x86_64, Musl: false
[DEBUG] Fetching releases from GitHub API
[DEBUG] Found 3 assets for version v1.0.0
[DEBUG] Scoring asset: vault-conductor-linux-amd64.tar.gz (score: 3)
[DEBUG] Scoring asset: vault-conductor-darwin-amd64.tar.gz (score: -1)
[DEBUG] Selected asset: vault-conductor-linux-amd64.tar.gz
Installing pirafrank/vault-conductor...
[DEBUG] Downloading to cache: ~/.cache/poof/...
Downloaded vault-conductor v1.0.0
[DEBUG] Extracting archive...
[DEBUG] Found executable: vault-conductor
[DEBUG] Creating symlink: ~/.local/share/poof/bin/vault-conductor
Installed successfully
[DEBUG] Cleaning cache directory
```

## Combining with Other Environment Variables

You can combine debug logging with other environment variables:

```bash
# Debug with GitHub token
GITHUB_TOKEN="ghp_xxx" RUST_LOG=debug poof install user/repo

# Debug with musl preference
POOF_PREFER_MUSL=1 RUST_LOG=debug poof install user/repo

# Debug with all settings
GITHUB_TOKEN="ghp_xxx" POOF_PREFER_MUSL=1 RUST_LOG=debug poof install user/repo
```

## Reporting Bugs

:::tip Best Practice
When reporting bugs, **always include debug logs**. They help maintainers diagnose issues much faster.
:::

To capture debug output for a bug report:

```bash
RUST_LOG=debug poof install user/repo 2>&1 | tee debug.log
```

This command:

1. Enables debug logging
2. Runs your command
3. Saves output to `debug.log` file
4. Still displays output in terminal

Then attach `debug.log` when creating your GitHub issue.

## Related Documentation

- [Environment Variables](./environment-variables.md) - All available environment variables
- [Advanced Usage](./advanced-usage.md#troubleshooting-asset-selection) - Troubleshooting guide
- [Support](./support.md) - Get help and report issues
