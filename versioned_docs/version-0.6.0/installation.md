---
sidebar_position: 1
sidebar_label: Installation
title: How to Install poof
description: Installation instructions for poof on Linux and macOS
---

# How to Install poof

Multiple installation methods are supported. Choose the one you prefer.

## Stable Release

### Quick one-liner

Automatically downloads the right pre-built binary for your OS and architecture.

```sh
curl -fsSL https://raw.githubusercontent.com/pirafrank/poof/main/install.sh | sh
```

It will install `poof` in `${HOME}/.local/bin`.

### Pre-built binary

Download the binary from [latest release](https://github.com/pirafrank/poof/releases/latest), and move it to some directory in your `$PATH`.

### Homebrew

Install poof using [Homebrew](https://brew.sh) on macOS or Linux:

```sh
brew tap pirafrank/tap
brew install pirafrank/tap/poof
```

### AUR

Arch Linux users can install poof from the [AUR](https://aur.archlinux.org/packages/poof-bin) using an helpers like `yay` or `paru`:

```sh
yay -S poof-bin
```

or

```sh
paru -S poof-bin
```

Alternatively, install it manually:

```sh
git clone https://aur.archlinux.org/poof-bin.git
cd poof-bin
makepkg -si
```

### asdf

Install poof using the [asdf version manager](https://asdf-vm.com):

```sh
# Add the poof plugin
asdf plugin add poof https://github.com/pirafrank/asdf-poof.git

# Install latest version
asdf install poof latest
```

On asdf 0.16+ use:

```sh
# Set as global version
asdf set --home poof latest
```
On asdf 0.15 and earlier use:

```sh
# Set as global version
asdf global poof latest
```

### cargo binstall

If you have [binstall](https://github.com/cargo-bins/cargo-binstall), you can get the binary using `cargo` and skip compilation:

```sh
cargo binstall poof
```

### From crates.io

Build and install the latest release from [crates.io](https://crates.io/crates/poof) using `cargo`:

```sh
cargo install --locked poof
```

### From source

Build and install from tags in source code on GitHub:

```sh
cargo install --locked --git https://github.com/pirafrank/poof --tag VERSION
```

:::important
Replace `VERSION` with the desired version to install. Not specifying a tag will install from `main` branch. Read section below for more info.
:::

## Edge Release

Build and install from source code on `main` branch on GitHub.

The `main` branch should be considered stable. Yet it may contain unreleased software with bugs or breaking changes not yet documented in [CHANGELOG.md](https://github.com/pirafrank/poof/blob/main/CHANGELOG.md). It should be considered release-candidate quality software.

```sh
cargo install --locked --git https://github.com/pirafrank/poof
```

## Next Steps

After installation, proceed to [configure your shell](./shell-configuration.md) to add poof to your PATH.
