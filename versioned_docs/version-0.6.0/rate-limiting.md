---
sidebar_position: 4
sidebar_label: Rate Limiting
title: GitHub Rate Limiting
description: Understanding GitHub API rate limits and how to configure authentication
---

# GitHub Rate Limiting

## Overview

When you use `poof` to install software from GitHub repositories, it makes API calls to GitHub to fetch release information. GitHub applies rate limits to these API requests to ensure fair usage of their services.

## Rate Limits

GitHub enforces different rate limits depending on whether your requests are authenticated:

- **Without authentication token**: 60 requests per hour per IP address
- **With authentication token**: 5,000 requests per hour

This means that if you're frequently installing tools or working in an environment where multiple people share the same IP address, you may quickly hit the unauthenticated rate limit.

## How poof uses GITHUB_TOKEN

Poof automatically checks for a `GITHUB_TOKEN` environment variable. If present, it uses this token to authenticate API requests, giving you access to the higher rate limit of 5,000 requests per hour.

The token is used:

- When downloading release information from GitHub repositories
- When making any GitHub API calls during the installation process

No configuration is needed—simply set the `GITHUB_TOKEN` environment variable, and poof will automatically use it.

## Setting the Environment Variable

Add the following to your shell configuration file (`.bashrc`, `.zshrc`, etc.):

```bash
export GITHUB_TOKEN="your_token_here"
```

After adding it, reload your shell configuration:

```bash
source ~/.bashrc  # or ~/.zshrc
```

## Creating a GitHub Token

### Option 1: Fine-Grained Personal Access Token (Recommended)

Fine-grained tokens provide better security by limiting access to specific permissions and repositories.

1. Go to [GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens](https://github.com/settings/tokens?type=beta)
2. Click **Generate new token**
3. Fill in the token details:
   - **Token name**: Give it a descriptive name (e.g., "poof-cli")
   - **Expiration**: Choose an expiration period (90 days recommended, or custom)
   - **Repository access**: Select **Public Repositories (read-only)**
4. Under **Permissions**, you can leave all permissions at their default settings
   - For public repository access, no additional permissions are required
5. Click **Generate token**
6. Copy the token immediately (you won't be able to see it again)

### Option 2: Personal Access Token (Classic)

If you prefer using classic tokens:

1. Go to [GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens)
2. Click **Generate new token (classic)**
3. Fill in the token details:
   - **Note**: Give it a descriptive name (e.g., "poof-cli")
   - **Expiration**: Choose an expiration period
   - **Scopes**: **Do not select any scopes** for public repository access only
4. Click **Generate token**
5. Copy the token immediately (you won't be able to see it again)

:::tip
For reading public repositories and releases, you don't need to grant any special permissions. An empty scope token works perfectly for poof's use case.
:::

## Getting Your Token from GitHub CLI

If you already use the [GitHub CLI](https://cli.github.com/) (`gh`), you can retrieve your authentication token:

```bash
gh auth token
```

You can then export it for use by poof:

```bash
export GITHUB_TOKEN=$(gh auth token)
```

To make this permanent, add the export line to your shell configuration file.

## Token Permissions and gh CLI Compatibility

:::warning Important

If you create a custom GitHub token for poof with minimal permissions (as recommended above) and set it as your `GITHUB_TOKEN` environment variable, be aware that **both poof and the GitHub CLI (`gh`) will use this token**.
:::

The GitHub CLI requires more permissions for certain operations (like creating issues, pull requests, etc.). If your token has only public read access, some `gh` commands may fail with **HTTP 403 Forbidden** errors.

**Solutions:**

1. **Use `gh auth token` as shown above**: Let `gh` manage its own token and export it for poof to use
2. **Grant additional permissions**: If you use `gh` frequently, consider granting your token the necessary permissions for your workflow

## Checking Your Rate Limit

You can check your current rate limit status using the GitHub CLI:

```bash
gh api rate_limit
```

To show only the core API rate limit (which poof uses):

```bash
gh api rate_limit | jq '.resources.core'
```

This will display:

```json
{
  "limit": 5000,
  "used": 0,
  "remaining": 5000,
  "reset": 1770317715
}
```

Or to see just the remaining requests:

```bash
gh api rate_limit | jq '.resources.core.remaining'
```

You can also check with curl:

```bash
# Without authentication
curl -sI https://api.github.com/users/octocat | grep -E '^x-ratelimit-'

# With authentication
curl -sI -H "Authorization: Bearer $GITHUB_TOKEN" https://api.github.com/users/octocat | grep -E '^x-ratelimit-'
```

and look for the `X-RateLimit-Limit` and `X-RateLimit-Remaining` headers in the response.

## References

- [GitHub REST API Rate Limits](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)
- [Managing Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
- [GitHub CLI Authentication](https://cli.github.com/manual/gh_auth)
