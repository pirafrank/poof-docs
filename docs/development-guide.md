---
sidebar_position: 2
sidebar_label: Development Guide
title: Development Guide
description: Guide for developers working on poof
---

## Dev platforms

The following platforms are supported to develop *poof* on:

- Linux (x86_64, aarch64)
- WSL2 (Debian-based on x86_64)
- macOS on Intel
- macOS on Apple Silicon

## Dev environment

You'll need:

- `zsh` or `bash`
- `git`
- Rust + `cargo`, installed via [rustup](https://rustup.rs): the pinned
  [`rust-toolchain.toml`](https://github.com/pirafrank/poof/blob/main/rust-toolchain.toml) selects
  a recent Rust toolchain with the `rustfmt`, `clippy`, `llvm-tools-preview`, and `rust-analyzer`
  components, plus the six common targets (Linux gnu/musl and macOS, on x86_64 and aarch64)
- [just](https://github.com/casey/just)
- An IDE or a text editor w/ LSP (VS Code, neovim, etc.)

The minimum supported Rust version (MSRV) is declared as `rust-version` in
[`Cargo.toml`](https://github.com/pirafrank/poof/blob/main/Cargo.toml). Use the pinned toolchain
for normal development and `just msrv` to verify MSRV compatibility.

Optional tools, only needed for specific tasks:

- Extra cargo plugins (`cargo-audit`, `cargo-deny`, `cargo-llvm-cov`, `git-cliff`, etc.) used by
  the compliance, coverage, and changelog recipes. `just install-cargo-plugins` installs them.
- [cross](https://github.com/cross-rs/cross) for cross-compilation (CI installs it on demand).
- Python 3.11+ and Node.js 18+ to run the npm packaging test suites.

## Development features

- ✅ Just tasks
- ✅ Tests, Tests, Tests!
- ✅ CI pipeline
- ✅ CI `cross` check pipeline
- ✅ `git cliff`-generated changelog
- ✅ Release pipeline
- ✅ Security audit pipeline
- ✅ License check pipeline (checks deps license compatibility)

## Recipes

Build, lint, and test tasks live in the
[`justfile`](https://github.com/pirafrank/poof/blob/main/justfile). Run `just --list` for the full
set.

The most useful recipes are:

| Recipe | What it does |
| ------ | ------------ |
| `just check` | `cargo check --all-targets` |
| `just build` | Debug build |
| `just test` | All tests, with output (`--nocapture`) |
| `just test-selector` | Asset-selector tests only |
| `just test-integration` | Integration test target only |
| `just fmt` / `just fmt-check` | Format sources / check formatting only |
| `just lint` / `just lint-all` | Clippy with warnings denied, default / all targets |
| `just better` | Format, then lint all targets |
| `just ci` | Clean, format check, lint, build, and test - what CI runs |
| `just msrv` | Check against the `rust-version` declared in `Cargo.toml` |
| `just compliance` | `cargo audit` + `cargo deny check licenses` |
| `just docs-verify-all` | Fail on missing documentation, public and private items |
| `just man` | Generate man pages |
| `just coverage` | Generate lcov coverage output (needs `cargo-llvm-cov`) |
| `just install-hooks` | Point Git at the repository's `hooks/` directory |

With the hooks installed, the pre-commit hook runs `just pre-commit` (`fmt-check` + `lint-all`)
when Rust files are staged, and the pre-push hook runs `just pre-push` (`check` + `test`) when
Rust or Cargo files changed. Tag pushes run the release tag checks instead.

CI runs `just ci` and `just man` on Linux and macOS, plus dedicated workflows for the MSRV,
documentation (`just docs-verify-all`), cross-compilation, coverage, security audit, and license
checks.

## Cross-compilation

[`matrix.jsonc`](https://github.com/pirafrank/poof/blob/main/matrix.jsonc) is the native build
matrix: 16 targets covering Linux glibc and musl on x86_64, aarch64, i686, armv7, riscv64, and
loongarch64, glibc on powerpc64le and s390x, and macOS on Intel and Apple Silicon. The pinned
toolchain installs only the six most common targets locally. The full matrix is built in CI and
at release time.

Entries with `"builder": "cross"` are built with [cross](https://github.com/cross-rs/cross) in
containers. glibc entries also declare a `glibc_max_version` ceiling that the
[cross check workflow](https://github.com/pirafrank/poof/blob/main/.github/workflows/ci_cross.yml)
enforces on every built binary, so releases keep running on older distributions.

## Repository structure

The build, release, and packaging pieces live in these paths of the poof repository. What the
pipelines do with them is described in [Distribution channels](distribution-channels.md).

| Path | Purpose |
| ---- | ------- |
| `.github/workflows/` | CI checks and publishing pipelines |
| `matrix.jsonc` | Native build matrix consumed by CI and release builds |
| `scripts/` | Release and packaging tooling, never published: `release/` for build-environment records and asset finalization, `npm/` for npm package staging and verification; their tests and JSON-schema validation run in CI |
| `hooks/` and `hooks_scripts/` | Git hooks and release tag checks, enabled with `just install-hooks` |
| `npm/` | Published npm payload: launcher (`bin/poof.js`), `package.json.template`, npm README, and launcher tests |
| `Dockerfile` | Alpine image that installs a tagged release via `install.sh` |
| `install.sh` | User-space installer, also used by the Docker image |
| `flake.nix` and `nix/` | Nix flake building poof from source |
| `macports/` | Portfile generation and submission scripts |
| `devcontainer-features/poof/` | Devcontainer feature published to GHCR |

Run the npm packaging test suites (Python and launcher) together from the repository root:

```sh
./scripts/npm/run_tests.sh
```
