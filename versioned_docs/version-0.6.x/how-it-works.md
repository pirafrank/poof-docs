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

Poof uses a point-based scoring algorithm to evaluate each asset in a release:

| Criteria | Points | Description |
|----------|--------|-------------|
| **OS match** | +1 | Asset name contains your OS (linux, darwin, etc.) |
| **Architecture match** | +1 | Asset name contains your architecture |
| **Musl preference met** | +1 | Contains "musl" when you prefer musl |
| **Musl when glibc preferred** | -1 | Contains "musl" when you have/prefer glibc |
| **Non-archived executable** | +1 | File has no extension (raw binary) |
| **Exact arch match at end** | +1 | Filename ends with exact architecture string |
| **Wrong OS** | -1 (deal-breaker) | Asset is for a different operating system |
| **Wrong architecture** | -1 (deal-breaker) | Asset is for a different CPU architecture |
| **Unsupported format** | -1 (deal-breaker) | Archive format not supported by poof |
| **Checksum file** | -1 (deal-breaker) | File is a checksum (.sha256, .sha1, .md5) |

The asset with the highest score is selected. If multiple assets have the same score, poof picks the first one.

### Example Scenario

On Linux x86_64 with glibc, evaluating these assets:

```text
1. ripgrep-13.0.0-x86_64-unknown-linux-gnu.tar.gz
   - OS match (linux): +1
   - Arch match (x86_64): +1
   - Has extension: 0
   - Score: 2

2. ripgrep-13.0.0-x86_64-unknown-linux-musl.tar.gz
   - OS match (linux): +1
   - Arch match (x86_64): +1
   - Musl when glibc preferred: -1
   - Has extension: 0
   - Score: 1

3. ripgrep-13.0.0-aarch64-unknown-linux-gnu.tar.gz
   - OS match (linux): +1
   - Wrong arch: -1 (deal-breaker)
   - Score: -1 (rejected)

Selected: ripgrep-13.0.0-x86_64-unknown-linux-gnu.tar.gz (score: 2)
```

### Influencing Asset Selection

You can influence which asset gets selected:

1. **Set `POOF_PREFER_MUSL=1`** to prefer static musl builds
2. Use the `--tag` flag to select a specific release version
3. Understand that poof always prefers exact platform matches

## Platform Detection Details

### Operating System Aliases

Poof recognizes multiple naming conventions for operating systems:

- **macOS**: `macos`, `darwin`, `mac`, `osx`
- **Linux**: `linux`
- **Windows**: `windows`, `win` (not officially supported)

Assets containing any of these aliases will match the respective platform.

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
For ARM, the order matters: `armv7l` → `armhf` → `armv7` → `armv6` → `arm` (from specific to general). Assets with "arm" in the name will match armv7 builds for backward compatibility.
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

When extracting binaries from archives, poof applies intelligent name normalization:

### Separator Trimming

Poof trims filenames at the first separator (`.`, `_`, `-`) to get clean binary names:

```txt
ripgrep-13.0.0-x86_64-unknown-linux-musl → ripgrep
fd_8.7.0_amd64.deb → fd
bat.exe → bat
```

**Why:** Ensures consistent binary names regardless of how releases are packaged.

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

### Checksum File Filtering

Poof automatically excludes checksum files from asset selection:

- `.sha256` files
- `.sha1` files
- `.md5` files

**Why:** Prevents accidentally "installing" a checksum file as if it were a binary.

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
