---
sidebar_position: 2
sidebar_label: Migrations
title: Migrations (Deprecated)
description: Migration guides for older poof versions
---

# Migrations

:::warning Deprecated
For old versions only!
Poof should be stable enough not to need more migrations in the foreseeable future.
:::

---

This page handles all breaking changes causing some sort of migration, if any, among certain versions.

**Anything not explicitly listed won't need a migration.**

## 0.4.0 to 0.5.0

**Before installing the updated version**:

1. Download and run the [migrate_poof_data.sh](https://github.com/pirafrank/poof/releases/download/v0.5.0/migrate_poof_data.sh) script from the [0.5.0](https://github.com/pirafrank/poof/releases/tag/v0.5.0) release assets
2. Update to `0.5.0`
3. Check everything works by running `poof list`

This should be the latest migration for a while.

## 0.2.0 to 0.3.0

Before we start, poof directory lives:

- On Linux: `$HOME/.local/share/poof`
- On macOS: `~/Library/Application Support/poof`

**Before installing the updated version**:

1. Create a directory named `data` in poof's directory
2. Move all folders (but `bin` and `data`) to the newly created `data` subdir in poof's directory
3. Redo all symlinks in `bin` directory (use `ln -sf` to recreate symlinks by overwriting any existing one with the same name)
4. Update and check that everything works as it should
