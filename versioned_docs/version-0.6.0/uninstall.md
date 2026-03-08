---
sidebar_position: 1
sidebar_label: Uninstall
title: Uninstall poof
description: How to uninstall poof from your system
---

Uninstall steps depend on how you have installed `poof`. Pick yours.

## One-liner

The script installs `poof` to `~/.local/bin` on all platforms. Just run:

```sh
rm -f ~/.local/bin/poof
```

## Pre-built binary

If you have downloaded the pre-built binary, just delete it.

## Homebrew

```sh
brew uninstall poof
```

## Debian and Ubuntu (APT)

Uninstall the package by running:

```sh
sudo apt remove poof
```

To also remove the repository:

```sh
sudo rm /etc/apt/sources.list.d/poof.list /usr/share/keyrings/poof.gpg
sudo apt update
```

## Fedora, RHEL, Amazon Linux (YUM)

Uninstall the package by running:

```sh
# on newer systems:
sudo dnf remove poof
# or on older distributions:
sudo yum remove poof
```

To also remove the repository:

```sh
sudo rm /etc/yum.repos.d/poof.repo
```

## Alpine Linux (APK)

Uninstall the package by running:

```sh
apk del poof
```

To also remove the repository:

```sh
sed -i '/poof-pkgs\.fpira\.com\/apk/d' /etc/apk/repositories
rm -f /etc/apk/keys/signing-key.rsa.pub
```

## asdf

```sh
asdf uninstall poof
```

## Installed via cargo

If you have installed it using any of the `cargo` commands (including `cargo binstall`), you can uninstall it with:

```sh
cargo uninstall poof
```

## After uninstall

After you uninstall `poof`, you should:

- remove its `bin` directory from your `$PATH`
- delete its [data and cache](./data-storage.md) directories as well

Sorry to see you go! Please [provide feedback](https://github.com/pirafrank/poof/issues/new/choose) about what went wrong.
