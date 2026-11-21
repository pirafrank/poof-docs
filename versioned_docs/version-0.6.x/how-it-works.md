---
sidebar_position: 6
sidebar_label: How it works
title: How it works
description: How poof works under the hood
---

This page covers poof logics and internal behaviors to let you understand how it works under the hood.

## Asset Selection Algorithm

Understanding how poof selects the right asset can help you predict behavior and troubleshoot issues when multiple assets are available.

### Scoring System

Poof scores each filename in stages. Rejected assets receive no positive score. The selector
returns every asset tied at the highest positive score; it does not choose a single winner.
The table shows the scoring order. Later rows apply only when earlier filename branches did
not match. OS and architecture bonuses are cumulative with the filename branch and Linux
fallbacks.

| Stage | Score or effect | Condition |
|-------|-----------------|-----------|
| Linux libc preference | +2 for a musl asset when musl is preferred; -2 for a musl asset when glibc is preferred | Linux only; applied before platform checks |
| OS match | +5 | Filename contains a recognized current-OS alias |
| Architecture match | +5 plus the number of aliases from the matched alias onward | Earlier aliases in the architecture table rank higher |
| Bare executable | +6 | No dot in filename, or dotted filename with no recognized short extension and both OS and architecture matched; at least one platform signal is required |
| Architecture suffix | +2 | Earlier filename branch did not match and filename ends with the matched architecture alias |
| OS suffix | +2 | Earlier branches did not match and filename ends with the matched OS alias |
| Supported archive | +5 | Earlier filename branches did not match and filename has a supported extension |
| Missing platform label fallback | +1 each | OS missing on Linux; architecture missing on x86_64 |
| Incompatible platform or unsupported asset | Rejected | Includes known unsupported OS/architecture labels, a different supported OS/architecture without a matching target label, and unsupported formats |

Checksum and signature assets are filtered separately. A dotted bare executable needs both
OS and architecture labels to receive the bare-executable bonus. These conditions mean the
scores are not a flat sum of every matching row: the filename rows are mutually exclusive.

### Influencing Asset Selection

You can influence which asset gets selected:

1. **Set `POOF_PREFER_MUSL=1`** to prefer static musl builds
2. Use the `--tag` flag to select a specific release version
3. Check the asset names and supported platform aliases when troubleshooting a match

## Platform Detection Details

### Operating System Aliases

Poof recognizes multiple naming conventions for operating systems:

- **macOS**: `macos`, `darwin`, `mac`, `osx`
- **Linux**: `linux`, `musllinux`

Known unsupported OS labels, including `windows` and `win`, are rejected. Matching
uses complete alias tokens rather than arbitrary substrings.

### CPU Architecture Aliases

Poof supports comprehensive architecture alias matching:

| Architecture | Recognized Aliases |
|--------------|--------------------|
| **x86** | `x86`, `386`, `586`, `686`, `32-bit` |
| **x86_64** | `x86_64`, `x64`, `amd64` |
| **armv7** | `armv7l`, `armhf`, `armv7`, `armv6`, `arm` |
| **aarch64** | `aarch64`, `arm64` |
| **powerpc64** | `powerpc64le`, `ppc64le` |
| **powerpc** | `powerpcle`, `ppcle` |
| **riscv64** | `riscv64gc`, `riscv64` |
| **s390x** | `s390x` |
| **loongarch64** | `loongarch64` |

:::note ARM Hierarchy
For ARM, the order matters: `armv7l` → `armv7` → `armhf` → `armv6` → `arm` (from specific to general). Assets with "arm" in the name will match armv7 builds for backward compatibility.
:::

### Special Architecture Handling

**x86 vs x86_64 Protection:**
Poof explicitly rejects x86_64 assets when running on 32-bit x86, even though "x86" is a substring of "x86_64".

**ARM vs ARM64 Protection:**
Similarly, poof rejects arm64 assets when running on armv7 (32-bit ARM) to prevent incompatibility issues.

### Libc Detection

On Linux, poof automatically detects your libc variant:

1. Executes `ldd --version`
2. Searches output for "glibc" or "gnu libc" keywords
3. If found: prefers glibc builds
4. If not found: assumes musl and prefers musl builds
5. Result is cached for performance (using `OnceLock`)

Override with `POOF_PREFER_MUSL` environment variable if needed.

## Automatic Behaviors

### Cache Auto-Cleanup

After successful installation, poof automatically cleans the cache directory. You don't need to manually run `poof clean` after installations.

**Why:** Saves disk space and keeps the cache directory tidy without user intervention.

### Duplicate Installation Prevention

Poof checks if a version is already installed before downloading:

```bash
$ poof install user/repo --tag v1.0.0
Skipping installation as version 1.0.0 for user/repo seems already installed.
```

**Why:** Prevents unnecessary downloads and saves bandwidth.

### Broken Symlink Cleanup

When uninstalling, poof automatically:

1. Removes the specified version(s)
2. Scans the entire bin directory
3. Detects and removes any broken symlinks

**Why:** Keeps your bin directory clean and prevents "command not found" errors from dangling symlinks.

### Conflict Detection

Before installing, poof checks if a binary with the same name exists elsewhere in your `$PATH`:

```bash
$ poof install BurntSushi/ripgrep
warn: A binary named 'rg' already exists in PATH
```

**Why:** Alerts you to potential conflicts with system-installed versions or other package managers.

## Binary Name Normalization

Poof removes recognized platform and release-version decorations while preserving
meaningful command variants. For example, a bare asset named
`cosign-linux-pivkey-pkcs11key-amd64` becomes `cosign-pivkey-pkcs11key`.

Release asset names use the first dot-separated component after known release
versions are removed. For example, `mc.linux-amd64.RELEASE.…` becomes `mc`.
Executable names inside archives retain meaningful dots and punctuation, such as
`python3.13` and `clang++`. Archive packaging labels do not rename internal
commands; meaningful variant suffixes can be retained, as in `zellij-no-web`.

If multiple commands from the same release still have the same name after cleanup,
poof keeps the first and reports the skipped duplicates. Previously misnamed
installations need to be removed and reinstalled explicitly.

## Security Features

### Magic Number Validation

Poof validates archives using magic bytes (file signatures), not just extensions:

**Supported validations:**

- ZIP: `PK\x03\x04`
- TAR: `ustar` at specific offset
- GZ: `\x1f\x8b`
- BZ2: `BZ`
- XZ: `\xfd7zXZ\x00`
- 7Z: `7z\xbc\xaf\x27\x1c`
- Zstandard: `\x28\xb5\x2f\xfd`

**Benefit:** Prevents issues when files have incorrect extensions or are corrupted.

### Checksum and Signature Filtering

Poof excludes checksum and signature files from asset selection so they are not mistaken
for installable binaries.

## Performance Features

### Parallel Operations

**List Command:**
Uses multi-threaded directory traversal to quickly list installed spells, especially beneficial with many installed tools.

**Update --all Command:**
When updating all installed binaries, poof performs updates in parallel:

```bash
$ poof update --all
Updating tools in parallel...
✓ user1/repo1: 1.0.0 → 1.1.0
✓ user2/repo2: 2.0.0 → 2.1.0
✓ user3/repo3: already up-to-date
```

**Why:** Significantly reduces time when managing many tools.

## Confirmation Prompts

Several commands include confirmation prompts for safety. Skip them with the `-y` flag:

### Uninstall Confirmation

```bash
# With prompt
$ poof uninstall user/repo --all
This will delete ALL versions of 'user/repo' and remove provided binaries from PATH.
Proceed? (y/yes):

# Skip prompt
$ poof uninstall user/repo --all -y
All versions of 'user/repo' have been successfully removed.
```

### Unlink Confirmation

```bash
# With prompt
$ poof unlink some-binary
Remove 'some-binary' from PATH?
Proceed? (y/yes):

# Skip prompt
$ poof unlink some-binary -y
Binary 'some-binary' has been unlinked.
```

:::tip Skip prompts
Use the `-y` flag to avoid interactive prompts. Good for scripts and CI/CD pipelines.
:::

## Related Documentation

- [Environment Variables](./environment-variables.md) - Configure poof behavior
- [Features](./features.md) - Learn about core functionality
- [Support](./support.md) - Get help with issues
