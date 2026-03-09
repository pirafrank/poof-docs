---
sidebar_position: 6
sidebar_label: Advanced Usage
title: Advanced Usage
description: Advanced features and power-user tips for poof
---

This page includes power-user tips that go beyond basic poof usage.

## Batch Operations

Update multiple specific tools efficiently:

```bash
for repo in BurntSushi/ripgrep sharkdp/fd user/tool; do
  poof update "$repo"
done
```

## Version Pinning in Scripts

Pin specific versions for reproducibility:

```bash
#!/bin/bash
# setup-tools.sh
poof install BurntSushi/ripgrep --tag 14.0.0
poof install sharkdp/fd --tag v8.7.0
poof install user/tool --tag v1.2.3
```

## Debugging with High Verbosity

Combine debug logging with specific operations:

```bash
RUST_LOG=debug poof install user/repo 2>&1 | tee install-debug.log
```

For complete information about debug logging, see the [Debug Logs](./debug-logs.md) page.

## Testing Beta Versions

Install pre-release versions using their tags:

```bash
poof install user/repo --tag v2.0.0-beta.1
```

## Temporary Override

Test with different settings temporarily:

```bash
POOF_PREFER_MUSL=1 RUST_LOG=debug poof install user/repo
```

## Related Documentation

- [Environment Variables](./environment-variables.md) - Configure poof behavior
- [Debug Logs](./debug-logs.md) - Complete guide to debug logging
- [Features](./features.md) - Learn about core functionality
- [Support](./support.md) - Get help with issues
