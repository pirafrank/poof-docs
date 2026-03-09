---
sidebar_position: 3
sidebar_label: Disable
title: Disable poof
description: How to temporarily or permanently disable poof
---

There are several ways to disable poof depending on your needs. You can remove individual binaries, temporarily disable poof for a shell session, or permanently disable it without uninstalling.

## Remove a binary provided by poof from $PATH

You can use `unlink` command for that. For example, if you installed `sometool` with poof and want to remove it from $PATH:

```sh
poof unlink sometool
```

Later you can re-add it via the `use` command:

```sh
poof use someuser/sometool
```

`use` command picks newest installed version if no version is given.

## Remove poof `bin` directory from $PATH

poof's `bin` directory by default is added at the beginning of `$PATH` so that binaries in it take precedence over any other same-named version you may have installed other ways.

If you want to disable `poof` without uninstalling it, you can do so by removing its `bin` directory from your `$PATH`.

### Temporarily

Remove the directory from `$PATH` variable in your shell session. Below is a handy one-liner.

On Linux:

```sh
export PATH=$(echo "$PATH" | tr ':' '\n' | grep -v "$HOME/.local/share/poof/bin" | paste -sd ':')
```

On macOS:

```sh
export PATH=$(echo "$PATH" | tr ':' '\n' | grep -v "$HOME/Library/Application Support/poof/bin" | paste -sd ':')
```

### Permanently

1. Comment out the line adding poof's `bin` directory to `$PATH` in your `~/.bashrc` or `~/.zshrc` file.
2. Then `source` your configuration or reload your shell.

This will disable poof removing provided binaries from $PATH without removing it. Check the steps in [Uninstall page](./uninstall.md) to know how to remove poof from your machine.
