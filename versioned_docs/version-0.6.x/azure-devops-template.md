---
sidebar_position: 4
sidebar_label: Azure DevOps Template
title: Azure DevOps YAML Template
description: Install poof and GitHub release tools with an Azure Pipelines template
---

The `poof` Azure DevOps YAML step template installs poof and optionally installs
pre-built binaries from GitHub Releases. It prepends poof and package binary
directories to `PATH` so later steps in the same job can use them.

Package names in the examples are for illustration. Replace them with the
software your pipeline needs.

## Use the hosted template

Create a GitHub service connection in **Project Settings → Service connections**
and note its name. Azure Pipelines uses it to fetch the template repository.
This connection does not provide a GitHub API token to poof.

```yaml
pool:
  vmImage: ubuntu-latest

resources:
  repositories:
    - repository: poofTemplates
      type: github
      name: pirafrank/poof-azure-templates
      ref: refs/tags/v1.0.0
      endpoint: my-github-service-connection

steps:
  - template: poof.yml@poofTemplates
    parameters:
      version: "latest"
      packages: |
        pirafrank/vault-conductor@v0.3.0
        ms-jpq/sad

  - bash: |
      vault-conductor --version
      sad --version
```

To install poof without packages, omit the `parameters` block or leave
`packages` empty. Pin the repository to a tag in production:

```yaml
ref: refs/tags/v1.0.0
```

You can also follow the main branch with `refs/heads/main`, though a tag makes
pipeline behavior more reproducible. If you copied `poof.yml` into your own
repository, reference its local path instead:

```yaml
steps:
  - template: .azure/templates/poof.yml
    parameters:
      packages: 'cli/cli,ms-jpq/sad'
```

## GitHub API token

Without a token, GitHub API requests are unauthenticated and subject to rate
limits. Store a GitHub personal access token as a secret pipeline variable or
variable group, then pass the variable's name using `githubTokenVariable`:

```yaml
variables:
  - group: my-variable-group # contains GITHUB_TOKEN as a secret

steps:
  - template: poof.yml@poofTemplates
    parameters:
      githubTokenVariable: GITHUB_TOKEN
```

Do not hardcode the token in YAML. `System.AccessToken` authenticates to Azure
DevOps and cannot be used as a GitHub token.

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `version` | poof release to install, such as `v0.6.0`; `latest` selects the latest release. | `latest` |
| `packages` | Newline or comma-separated `owner/repository` or `owner/repository@tag` entries. | Empty |
| `githubTokenVariable` | Name of the pipeline variable containing a GitHub token. | `GITHUB_TOKEN` |

Spaces alone do not separate package entries. Do not include inline comments in
the `packages` value.

## Supported agents and paths

Use a Linux or macOS agent with Bash, curl, and tar. Linux glibc and musl are
supported on amd64 and arm64; macOS is supported on Intel and Apple Silicon.
Native Windows agents are unsupported.

The poof executable is installed in `$HOME/.local/bin`. Package binaries use
`${XDG_DATA_HOME:-$HOME/.local/share}/poof/bin` on Linux (absolute
`XDG_DATA_HOME` values only), or `$HOME/Library/Application Support/poof/bin`
on macOS. The template prepends these directories to `PATH` for subsequent
steps in the same job.

## Versioning and development

The template repository has its own version, independent of poof. Pin the
template tag, poof release, and package tags for reproducible builds. Each
invocation installs the requested poof release, replacing an existing binary;
`latest` resolves the current release each time. The template does not configure
pipeline caching.

The repository's regression suite uses Python 3.9+ and Bash:

```sh
python3 -m unittest discover -s tests -v
```

These tests mock GitHub downloads and do not evaluate Azure template expressions
or logging commands. A live pipeline is needed to verify secret-variable mapping,
step conditions, and PATH persistence. The repository includes an optional
smoke pipeline that downloads pinned poof and package releases.

See the [template repository](https://github.com/pirafrank/poof-azure-templates)
for implementation and pipeline details.
