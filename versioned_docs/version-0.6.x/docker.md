---
sidebar_position: 1
sidebar_label: Docker Image
title: Docker Image
description: Try poof in an ephimeral container or deploy it in containerized workflows
---

A Docker image of `poof` is available on [Docker Hub](https://hub.docker.com/r/pirafrank/poof).

It is [based on Alpine Linux](https://github.com/pirafrank/poof/blob/main/Dockerfile#L3)
and built automatically on every stable release via a GitHub Action
[workflow](.github/workflows/docker.yml).

## Supported architectures

- `linux/amd64`
- `linux/arm64`
- `linux/arm/v7`
- `linux/riscv64`
- `linux/386`

## Usage

The container is meant to run `poof` without changing your host environment, or
to install binaries on the fly by mounting poof's data and bin directories from
the host.

:::info
Please do note that when run from a Docker container `poof` only downloads
Linux MUSL assets for the CPU architecture of the container it is running on.
Since they are statically built and should work on any Linux distribution.
:::

```sh
docker run --rm \
  -u $(id -u):$(id -g) \
  -v ~/.local/share/poof:/.local/share/poof \
  -e HOME=/ \
  pirafrank/poof:latest poof install pirafrank/vault-conductor
```

You can also define an alias to use the containerized `poof` transparently:

```sh
alias poof='docker run --rm -u $(id -u):$(id -g) -v ~/.local/share/poof:/.local/share/poof -e HOME=/ pirafrank/poof:latest poof'
```

## Use Cases

### Ephemeral toolbox for incident response

During an incident you need `kubectl`, `stern`, or `grpcurl` but the jump host or
bastion is locked down and has no package manager. Mount a temporary directory,
install the tools, then move on. Nothing is left behind on the host.

```sh
mkdir -p /tmp/incident-tools/share /tmp/incident-tools/bin

docker run --rm \
  -u $(id -u):$(id -g) \
  -v /tmp/incident-tools/share:/.local/share/poof \
  -e HOME=/ \
  pirafrank/poof:latest \
  poof install stern/stern

# Add the ephemeral bin directory to PATH for this session
export PATH="/tmp/incident-tools/share/bin:$PATH"
stern my-service -n production
```

When the incident is resolved, clean up with `rm -rf /tmp/incident-tools`.

---

### Populate a shared tools directory on a server

Provision a shared `/opt/tools/bin` directory accessible to all users on a
headless server without installing anything via `apt`, `yum`, or `brew`:

```sh
sudo mkdir -p /opt/tools/share /opt/tools/bin

docker run --rm \
  -u $(id -u):$(id -g) \
  -v /opt/tools/share:/.local/share/poof \
  -e HOME=/ \
  -e GITHUB_TOKEN="${GITHUB_TOKEN}" \
  pirafrank/poof:latest sh -c '
    poof install BurntSushi/ripgrep
    poof install sharkdp/fd
    poof install jesseduffield/lazygit
  '

# Expose tools to every user
echo 'export PATH="/opt/tools/share/bin:$PATH"' | \
  sudo tee /etc/profile.d/poof-tools.sh
```

---

### Pin and audit tool versions in production

In regulated or security-conscious environments you need to know exactly which
binary version is running on every node. Use `poof list` inside the container to
produce a manifest you can ship to your audit log or CMDB:

```sh
docker run --rm \
  -u $(id -u):$(id -g) \
  -v ~/.local/share/poof:/.local/share/poof \
  -e HOME=/ \
  pirafrank/poof:latest poof list \
  | tee tools-manifest-$(date +%Y%m%d).txt
```

Commit or upload the manifest to an S3 bucket / artifact store as part of your
weekly compliance job.

---

### Immutable tool layer in a multi-stage Dockerfile

Install a reproducible, pinned set of CLI tools in a build stage, then copy only
the resulting binaries into your final image. The `poof` image is never present
in the shipped layer:

```dockerfile
# ** build stage **********************************************
FROM pirafrank/poof:latest AS toolchain

RUN poof install cli/cli --tag v2.63.0 \
 && poof install aquasecurity/trivy --tag v0.58.2 \
 && poof install siderolabs/talosctl --tag v1.9.4

# ** final image **********************************************
FROM alpine:3.21

COPY --from=toolchain /.local/share/poof/bin/ /usr/local/bin/

ENTRYPOINT ["/bin/sh"]
```

Because each tool is pinned to a specific tag, the layer digest is fully
reproducible across rebuilds and environments.

---

### Batch-update tools on multiple remote hosts

Combine a simple loop, SSH, and the containerized `poof` to roll out tool
updates across a fleet of servers without a configuration management system:

```sh
HOSTS=(web-01 web-02 web-03 db-01)

for host in "${HOSTS[@]}"; do
  echo "Updating tools on ${host}…"
  ssh "${host}" \
    "docker run --rm \
       -u \$(id -u):\$(id -g) \
       -v ~/.local/share/poof:/.local/share/poof \
       -e HOME=/ \
       -e GITHUB_TOKEN=${GITHUB_TOKEN} \
       pirafrank/poof:latest poof update --all"
done
```

Each host updates its own poof-managed binaries in parallel. No agent, no
central server required.

---

### Smoke-test a new tool version before rolling out

Pull a candidate version into an isolated container volume, run a quick sanity
check, and only promote it to the host if it passes:

```sh
docker volume create poof-staging

# Install candidate into the staging volume
docker run --rm \
  -v poof-staging:/.local/share/poof \
  -e HOME=/ \
  pirafrank/poof:latest \
  poof install BurntSushi/ripgrep --tag 14.1.1

# Run the smoke test in the same isolated volume
docker run --rm \
  -v poof-staging:/.local/share/poof \
  -e HOME=/ \
  --entrypoint /.local/share/poof/bin/rg \
  pirafrank/poof:latest --version

# Promote to host only when the test passes
docker run --rm \
  -u $(id -u):$(id -g) \
  -v poof-staging:/.local/share/poof \
  -v ~/.local/share/poof:/.local/share/poof-host \
  -e HOME=/ \
  pirafrank/poof:latest \
  sh -c 'cp -a /.local/share/poof/. /.local/share/poof-host/'

docker volume rm poof-staging
```

---

### GitHub Enterprise: point to an internal API mirror

Teams that operate behind a corporate firewall with GitHub Enterprise Server can
override the API endpoint so `poof` resolves releases from the internal instance:

```sh
docker run --rm \
  -u $(id -u):$(id -g) \
  -v ~/.local/share/poof:/.local/share/poof \
  -e HOME=/ \
  -e GITHUB_TOKEN="${GHE_TOKEN}" \
  -e POOF_GITHUB_API_URL="https://github.corp.example.com/api/v3/repos" \
  pirafrank/poof:latest poof install myorg/internal-tool
```
