---
sidebar_position: 1
sidebar_label: Scripting
title: Scripting and output parsing
description: Examples of how to parse poof output for usage in shell scripts
---

`poof` is designed to be script-friendly. Its commands exit with standard
Unix exit codes, write clean output to stdout, and support machine-readable
filtering with common tools like `awk` and `grep`. The examples below cover
the most common patterns for integrating `poof` into shell scripts, bootstrap
routines, and CI pipelines.

## Verify poof's bin directory is in PATH

Use `poof check` as a health-check step in bootstrap scripts:

```sh
poof check || poof enable --shell bash
```

## Get version

`-V` argument returns a short version of `poof` useful for script usage.

```txt
$ poof -V
poof 0.6.0
```

For example, to extract just the version number:

```sh
poof -V | grep -oP '(\d+(\.?))+'
```

## Get installed assets

Get a list of installed repositories only, without their versions

```txt
poof list | awk '{print $1}' | tail +4
```

## Batch install from a file

Maintain a `tools.txt` file in your dotfiles or provisioning repo with one
`USER/REPO` per line, then replay it on any new machine:

```sh
cat tools.txt | xargs -I{} poof install {}
```

Install a pinned set of tools with specific versions:

```sh
# tools-pinned.txt format: USER/REPO VERSION
while IFS=' ' read -r repo version; do
  poof install "$repo" --tag "$version"
done < tools-pinned.txt
```

## Update all tools in CI

Run this in a cron job or CI pipeline to keep every installed binary up to date:

```sh
poof update --all
```

Exit with a non-zero code on failure so the pipeline catches it:

```sh
poof update --all || { echo "Update failed"; exit 1; }
```

## Capture installed tools as a lock file

Snapshot the exact repository/version pairs currently installed and write them
to a lock file:

```sh
poof list | awk 'NR>3 && NF {sub(/,$/, "", $2); print $1 "@" $2}' > tools.lock
```

Restore from the lock file on another host:

```sh
while IFS='@' read -r repo version; do
  poof install "$repo" --tag "$version"
done < tools.lock
```

## Check if a binary is available before using it

Guard a script that depends on a tool managed by poof:

```sh
if ! poof which mytool &>/dev/null; then
  echo "mytool not installed, installing..."
  poof install someuser/mytool
fi
```

## Discover what binaries a repo ships

Before installing, inspect what a release provides:

```sh
poof what cli/cli
```

Combine with `grep` to check whether a specific binary is included:

```sh
poof what cli/cli | grep -q 'gh$' && echo "gh is available"
```

## Discover which version of a repository provides a binary

```sh
poof which gh
```

## Conditionally install only if not already present

Avoid reinstalling a tool that is already managed by poof:

```sh
poof list | awk 'NR>3 {print $1}' | grep -q 'cli/cli' || \
  poof install cli/cli && echo "cli/cli already installed"
```
