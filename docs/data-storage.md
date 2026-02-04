---
sidebar_position: 3
sidebar_label: Data Storage
title: Where Data is Stored
description: Understanding where poof stores its data
---

# Where Data is Stored

## Data

`poof` stores its data in standard directories via the [dirs](https://crates.io/crates/dirs) crate. Specifically, its data root is in:

- **Linux**: `~/.local/share/poof`
- **macOS**: `~/Library/Application Support/poof`

Inside, you'll find:

- `data`, for installed versioned binaries. It follows the `USERNAME/REPONAME/VERSION/` directory structure to store executables for that version of the installed binary
- `bin`, where are symlinks to current version [in use](./usage.md) of each binary

Below, an example of the structure you may usually find:

```txt
❯ tree ~/.local/share/poof -L 4
/home/francesco/.local/share/poof
├── bin
│   ├── exif_renamer -> /home/francesco/.local/share/poof/data/pirafrank/rust_exif_renamer/0.2.2/exif_renamer
│   ├── lazygit -> /home/francesco/.local/share/poof/data/jesseduffield/lazygit/0.49.0/lazygit
│   └── sad -> /home/francesco/.local/share/poof/data/ms-jpq/sad/0.4.32/sad
└── data
    ├── jesseduffield
    │   └── lazygit
    │       └── 0.49.0
    ├── ms-jpq
    │   └── sad
    │       └── 0.4.32
    └── pirafrank
        └── rust_exif_renamer
            └── 0.2.2
```

## About poof's `bin` directory

After installing `poof`, you add its `bin` directory to your `$PATH` via `poof enable` command.

Having a dedicated directory for `poof` binaries is a good practice, as it allows you to:

- keep them separate from other software installed on your system
- keep them separate from paths you may manually edit (like `~/.local/bin`)
- easily temporarily disable `poof` by removing the directory from your `$PATH` (see [Disable](./disable.md))

:::important
Be sure it is at the beginning of your `$PATH` so that it takes precedence over any other version of the same binary you may have installed other ways.
:::

## Cache

Cache is used to store downloaded releases before they get unpacked and installed.

It is stored in:

- **Linux**: `~/.cache/poof`
- **macOS**: `~/Library/Caches/poof`
