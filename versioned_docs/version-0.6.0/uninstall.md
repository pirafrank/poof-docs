---
sidebar_position: 1
sidebar_label: Uninstall
title: Uninstall poof
description: How to uninstall poof from your system
---

# Uninstall poof

## Uninstall

### Pre-built binary

If you have downloaded the pre-built binary, just delete it.

### Installed via cargo

If you have installed it using any of the `cargo` commands, you can uninstall it with:

```sh
cargo uninstall poof
```

## After uninstall

After you uninstall `poof`, you should:

- remove its `bin` directory from your `$PATH`
- delete its [data and cache](./data-storage.md) directories as well

Sorry to see you go! Please [provide feedback](https://github.com/pirafrank/poof/issues/new/choose) about what went wrong.
