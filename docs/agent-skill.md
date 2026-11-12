---
sidebar_label: Agent Skill
title: Agent Skill
description: Install the poof agent skill with npx skills add pirafrank/poof and let AI coding agents install and manage your tools
---

poof ships an official **agent skill**: a portable instruction file that teaches AI
coding agents how to install and manage pre-built software with poof. Once installed,
you can ask your agent things like *"install BurntSushi/ripgrep with poof"* instead of
running the commands yourself.

The skill follows the [Agent Skills specification](https://agentskills.io/specification)
and lives in the poof repository at
[`skills/poof/SKILL.md`](https://github.com/pirafrank/poof/blob/main/skills/poof/SKILL.md).
It is installed with the [`skills` CLI](https://github.com/vercel-labs/skills)
(`npx skills`), which supports pi, Claude Code, and many other coding agents.

:::tip
The agent skill is for interactive AI assistants. For CI pipelines, use the
[GitHub Action](./github.md) instead.
:::

## What the skill does

When loaded, the skill gives your agent:

- **The full poof workflow** - detect poof and its version (`poof -V`), bootstrap it if
  missing, install a tool, verify the result, then manage versions and PATH.
- **Complete command coverage** - `install`, `download`, `list`, `which`, `what`,
  `use`, `update`, `unlink`, `uninstall`, `enable`, `check`, `completions`, `init`,
  `clean`, `info`, and `version`.
- **Correct syntax** - `OWNER/REPO` slugs, `--tag` pinning (not the Action's `@tag`
  form), supported shell names, and confirmation flags.
- **Safety rules** - see [Safety model](#safety-model) below.
- **Version awareness** - see [Version compatibility](#version-compatibility) below.

## Version compatibility

Commands were introduced over time, so a command available in the latest poof may not
exist in an older installation. The skill bundles a command-introduction table,
verified against poof's release tags, and compares it with the short version from
`poof -V` before using a command. If your poof is too old, the agent reports the
minimum version and offers to update poof instead of running a command that cannot
work. For example, `poof what` arrived in 0.6.0, so it is unavailable on 0.5.x.

Two checks work on every version:

- `poof help` lists exactly the commands your binary supports.
- Recent builds also print a `Since:` line in `poof <command> --help`, so the binary
  itself reports when each command was introduced.

## Requirements

- **Node.js 22.20 or later** - the `skills` CLI runs via `npx`.
- **A coding agent supported by the skills CLI** - for example pi or Claude Code.
- **poof** - install it first (see [Installation](./installation.md)), or let the skill
  guide the bootstrap. poof itself runs on Linux and macOS; see
  [Supported Platforms](./supported-platforms.md).

## Install the skill

From your project directory (project-scoped install):

```bash
npx skills add pirafrank/poof
```

The CLI lists the skills found in the repository and asks which ones to install and
for which agents. Useful variants:

```bash
# Preview without installing anything
npx skills add pirafrank/poof --list

# Install the poof skill globally (available in all projects)
npx skills add pirafrank/poof --skill poof -g

# Non-interactive install for a specific agent
npx skills add pirafrank/poof --skill poof -a claude-code -y

# Pin to a release tag or commit that includes the skill
npx skills add pirafrank/poof@<tag-or-commit> --skill poof
```

:::note
`npx skills add pirafrank/poof` fetches the repository's default branch. The skill is
only present in tags and commits that include it - older release tags predate the
skill.
:::

### Where the skill is installed

| Scope | Location |
| --- | --- |
| Project (default) | `.agents/skills/poof/` in your project, with links for each selected agent (e.g. `.claude/skills/`) |
| Global (`-g`) | `~/.agents/skills/poof/`, with links for each selected agent |

pi reads both `.agents/skills/` and `~/.agents/skills/` natively, so a `skills` CLI
install works with pi without extra configuration. Use `--copy` instead of the default
symlinks if your filesystem does not support them.

Project installs are recorded in `skills-lock.json`; commit it to share the same skill
setup with your team.

:::tip
Review before you install: read the
[skill source](https://github.com/pirafrank/poof/blob/main/skills/poof/SKILL.md)
or run `npx skills add pirafrank/poof --list` first. A skill is a set of instructions
your agent will follow - treat it like any other code you run.
:::

## Use it

Ask your agent in natural language, for example:

- *"Install BurntSushi/ripgrep with poof."*
- *"Install sharkdp/fd pinned to v8.7.0."*
- *"Switch the default ripgrep to 13.0.0."*
- *"Update everything installed with poof."*
- *"Add poof's bin directory to my zsh PATH."*

In pi you can also force-load the skill explicitly:

```text
/skill:poof install BurntSushi/ripgrep
```

After installing or updating the skill, reload your agent (in pi: `/reload`) so it
picks up the new instructions.

## Safety model

The skill encodes poof's user-space philosophy as explicit agent rules:

- **User-space only** - never `sudo`, never system directories or system package
  managers.
- **Approval gates** - the agent must ask before bootstrapping poof, installing or
  downloading anything, updating, uninstalling, cleaning the cache, or running
  `poof enable` (which edits a shell startup file). Read-only inspection (`list`,
  `which`, `what`, `info`, `check`, `version`) needs no approval.
- **Canonical sources only** - bootstrap uses the official
  [`install.sh`](https://raw.githubusercontent.com/pirafrank/poof/main/install.sh),
  downloaded and reviewed before running; no mirrors or proxy URLs.
- **Repository confirmation** - the exact `OWNER/REPO` is confirmed with you before
  installing, to avoid typosquatting.
- **Untrusted assets** - release binaries are treated as untrusted code; running an
  installed binary stays your decision.
- **Reproducibility** - prefer `--tag` pinning when it matters.

## Manage the skill

```bash
npx skills list          # show installed skills
npx skills check         # check for available updates
npx skills update poof   # update the poof skill
npx skills remove poof   # remove the poof skill
```

Updates are fetched from the poof repository, so the skill stays in sync with the
command documentation shipped in the repo.

## Troubleshooting

- **Agent doesn't see the skill** - reload or restart the agent (in pi: `/reload`),
  then confirm with `npx skills list` that the skill is installed for that agent.
- **`npx skills` fails to run** - check your Node.js version (`node --version`); the
  CLI requires 22.20 or later.
- **Verify what the repository offers** - `npx skills add pirafrank/poof --list`
  prints the skill name and description without installing anything.
- **A command is unavailable** - your poof may predate it; see
  [Version compatibility](#version-compatibility). Update poof, then retry.
- **Questions or bugs** - open an issue at
  [pirafrank/poof](https://github.com/pirafrank/poof/issues).

## See also

- [Installation](./installation.md) - get poof itself
- [Usage](./usage.md) - poof command basics
- [Shell Configuration](./shell-configuration.md) - PATH and shell integration
- [GitHub Action](./github.md) - poof in CI pipelines
- [Features](./features.md) - what poof can do
