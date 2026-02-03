---
sidebar_position: 3
sidebar_label: Disable
title: Disable poof
description: How to temporarily or permanently disable poof
---

# Disable poof

poof's `bin` directory by default is added at the beginning of `$PATH` so that binaries in it take precedence over any other same-named version you may have installed other ways.

If you want to disable `poof` without uninstalling it, you can do so by removing its `bin` directory from your `$PATH`.

## Permanently

Comment out the line adding poof's `bin` directory to `PATH` in your `~/.bashrc` or `~/.zshrc` file.

Then `source` your configuration or reload your shell.

## Temporarily

Remove the directory from `$PATH` variable in your shell session. Below is a handy one-liner.

On Linux:

```sh
export PATH=$(echo "$PATH" | tr ':' '\n' | grep -v "$HOME/.local/share/poof/bin" | paste -sd ':')
```

On macOS:

```sh
export PATH=$(echo "$PATH" | tr ':' '\n' | grep -v "$HOME/Library/Application Support/poof/bin" | paste -sd ':')
```
