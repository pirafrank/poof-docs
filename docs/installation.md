---
sidebar_position: 1
sidebar_label: Installation
title: How to Install poof
description: Installation instructions for poof on Linux and macOS
---

Multiple installation methods are supported. Choose the one you prefer.

:::tip
Check the *Continuous Integration* and *Containerization* pages
for more ways to install and deploy `poof`.
:::

## Stable Release

:::info
**What's new?** Check the [changelog](https://github.com/pirafrank/poof/blob/main/CHANGELOG.md)!
:::

### Quick one-liner

:::note
Always check scripts you pipe to your shell before actually running them!
:::

Automatically downloads the right pre-built binary for your OS and architecture.

```sh
curl -fsSL https://poof.fpira.com/install.sh | sh
```

It will install `poof` in `${HOME}/.local/bin` on both Linux and macOS.
Be sure such directory is in `$PATH`.

### Pre-built binaries

Download the binary for your OS and CPU from
[latest release](https://github.com/pirafrank/poof/releases/latest), and move it
to some directory in your `$PATH`.

### Homebrew

Install poof using [Homebrew](https://brew.sh) on macOS or Linux:

```sh
brew tap pirafrank/tap
brew install pirafrank/tap/poof
```

**Note**: Homebrew tap is [automatically updated](https://github.com/pirafrank/homebrew-tap)
via GitHub Actions.

### Nix and NixOS

:::info
Since version `0.6.1`.
:::

A flake is provided to install via Nix package manager or on NixOS:

Install into your Nix profile:

```sh
# install latest stable release (recommended)
nix profile install github:pirafrank/poof/latest

# or a specific version
nix profile install github:pirafrank/poof/<VERSION>
# for example:
nix profile install github:pirafrank/poof/v0.6.1
```

Or run without installing:

```sh
nix run github:pirafrank/poof/latest -- version
nix run github:pirafrank/poof/latest -- install someuser/somerepo
```

**Development shell:**

The flake does not ship a dedicated dev shell. Use the standard Cargo toolchain
instead. Get more information in the
[dedicated README](https://github.com/pirafrank/poof/blob/main/nix/README.md)
in the project repository.

### Debian/Ubuntu

On Debian and Ubuntu distributions can also install using APT.

**Supported architectures:**

- `amd64` (`x86_64`)
- `arm64` (`aarch64`)
- `armhf` (`armv7`)
- `i386` (`i686`)
- `riscv64` (`riscv64gc`)

**Supported distributions:**

- Debian 9 (stretch) and newer
- Ubuntu 16.04 (xenial) and newer

```sh
curl -fsSL https://pkg.fpira.com/apt/gpg.pub \
  | sudo gpg --dearmor -o /usr/share/keyrings/poof.gpg
echo "deb [signed-by=/usr/share/keyrings/poof.gpg] https://pkg.fpira.com/apt stable main" \
  | sudo tee /etc/apt/sources.list.d/poof.list
sudo apt update && sudo apt install poof
```

Verify the fingerprint of the PGP key used to sign packages:

`9B7F 2A31 2F8E 4FEA 8AFC 70EE 65ED 9227 1B84 FFE5`

### Fedora, RHEL, CentOS, Amazon Linux

On Red-Hat and Amazon Linux distributions can also install using YUM or DNF.

**Supported architectures:**

- `x86_64`
- `aarch64`

**Supported distributions:**

- RHEL 9 / CentOS Stream 9 / Fedora 36 and newer
- RHEL 8 / CentOS 8 / CentOS Stream 8 / Fedora (from 24 to 35)
- Amazon Linux 2023
- Amazon Linux 2

<details>
<summary>RHEL 9 / CentOS Stream 9 / Fedora 36 and newer</summary>

```sh
sudo rpm --import https://pkg.fpira.com/yum/gpg.pub
sudo tee /etc/yum.repos.d/poof.repo << EOF
[poof]
name=poof
baseurl=https://pkg.fpira.com/yum/el9/$(uname -m)/
enabled=1
gpgcheck=1
gpgkey=https://pkg.fpira.com/yum/gpg.pub
EOF
sudo dnf install poof
```

</details>

<details>
<summary>RHEL 8 / CentOS 8 / CentOS Stream 8 / Fedora 24-35</summary>

```sh
sudo rpm --import https://pkg.fpira.com/yum/gpg.pub
sudo tee /etc/yum.repos.d/poof.repo << EOF
[poof]
name=poof
baseurl=https://pkg.fpira.com/yum/el8/$(uname -m)/
enabled=1
gpgcheck=1
gpgkey=https://pkg.fpira.com/yum/gpg.pub
EOF
sudo dnf install poof
```

</details>

<details>
<summary>Amazon Linux 2023</summary>

```sh
sudo rpm --import https://pkg.fpira.com/yum/gpg.pub
sudo tee /etc/yum.repos.d/poof.repo << EOF
[poof]
name=poof
baseurl=https://pkg.fpira.com/yum/amzn2023/$(uname -m)/
enabled=1
gpgcheck=1
gpgkey=https://pkg.fpira.com/yum/gpg.pub
EOF
sudo dnf install poof
```

</details>

<details>
<summary>Amazon Linux 2</summary>

```sh
sudo rpm --import https://pkg.fpira.com/yum/gpg.pub
sudo tee /etc/yum.repos.d/poof.repo << EOF
[poof]
name=poof
baseurl=https://pkg.fpira.com/yum/amzn2/$(uname -m)/
enabled=1
gpgcheck=1
gpgkey=https://pkg.fpira.com/yum/gpg.pub
EOF
sudo yum install poof
```

</details>

Verify the fingerprint of the PGP key used to sign packages:

`9B7F 2A31 2F8E 4FEA 8AFC 70EE 65ED 9227 1B84 FFE5`

### Arch Linux (AUR)

Arch Linux users can also install poof from the
[AUR](https://aur.archlinux.org/packages/poof-bin) using an helpers
like `yay` or `paru`:

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

**Note**: AUR publishing is powered by [AURA](https://github.com/pirafrank/aura).

### Alpine Linux (APK)

On Alpine Linux you can also install via APK.

**Supported architectures:**

- `x86_64`
- `aarch64`
- `armv7`
- `riscv64`

**Supported versions:**

:::info
We support the last four stable Alpine versions.
:::

- Alpine 3.23
- Alpine 3.22
- Alpine 3.21
- Alpine 3.20

You can always use other install methods (e.g. install script, or manual download
from [releases](https://github.com/pirafrank/poof/releases/latest)) to bring musl
builds to older Alpine versions.

```sh
wget -q -O /etc/apk/keys/signing-key.rsa.pub \
  https://pkg.fpira.com/apk/signing-key.rsa.pub
ALPINE_VERSION=$(cat /etc/alpine-release | cut -d. -f1,2)
echo "https://pkg.fpira.com/apk/v${ALPINE_VERSION}" \
  >> /etc/apk/repositories
apk update && apk add poof
```

Verify the fingerprint of the RSA key used to sign packages:

`SHA256:WZS7xVeXcpIb+5Nje9cOWQ2dSTdJuRZtBKpbRamh1uI`

### asdf

Install poof using the [asdf version manager](https://asdf-vm.com):

1. Add the poof plugin

```sh
asdf plugin add poof https://github.com/pirafrank/asdf-poof.git
```

2. Install the latest version

```sh
asdf install poof latest
```

3. Set as global version:

  - on asdf 0.16+ use:

  ```sh
  asdf set --home poof latest
  ```

  - on asdf 0.15 and earlier use:

  ```sh
  asdf global poof latest
  ```

### cargo binstall

If you have [binstall](https://github.com/cargo-bins/cargo-binstall), you can
get the binary using `cargo` and skip compilation:

```sh
cargo binstall poof
```

### From crates.io

Build and install the latest release from [crates.io](https://crates.io/crates/poof)
using `cargo`:

```sh
cargo install --locked poof
```

### From source

Build and install from tags in source code on GitHub:

```sh
cargo install --locked --git https://github.com/pirafrank/poof --tag VERSION
```

:::important
Replace `VERSION` with the desired version to install. Not specifying a tag will
install from `main` branch. Read section below for more info.
:::

## Edge Release

Build and install from source code on `main` branch on GitHub.

:::warning
While the `main` branch may be considered stable, it may ship unreleased
software with bugs or breaking changes not yet documented here or in
[CHANGELOG.md](https://github.com/pirafrank/poof/blob/main/CHANGELOG.md).

**It should be considered beta quality software.**
:::

```sh
cargo install --locked --git https://github.com/pirafrank/poof
```

## Next Steps

After installation, proceed to [configure your shell](./shell-configuration.md)
to add poof to your PATH.
