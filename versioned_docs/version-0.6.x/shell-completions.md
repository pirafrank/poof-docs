---
sidebar_position: 4
sidebar_label: Shell Completions
title: Shell Completions
description: Setup shell completions for poof commands
---

# Shell Completions

Generate completions for your shell and source them in your shell configuration.

## Quick start

```bash
poof completions --shell <shell>
```

Replace `<shell>` with one of the supported shells:

- `bash`
- `zsh`
- `fish`
- `elvish`
- `nushell`
- `powershell`
- `xonsh`

## Supported Shells

### Bash

```bash
# Add the following to ~/.bashrc
eval "$(poof completions --shell bash)"

# Then reload your shell config
source ~/.bashrc
```

**Alternative: Manual evaluation**

```bash
# Generate and save the completion script
poof completions --shell bash > ~/.local/share/bash-completion/completions/poof

# Or, for system-wide installation (requires sudo)
sudo poof completions --shell bash > /usr/share/bash-completion/completions/poof

# Then reload your shell
source ~/.bashrc
```

:::note
Bash completions are automatically loaded from `~/.local/share/bash-completion/completions/` or `/usr/share/bash-completion/completions/`. It requires `bash-completion` to be installed.
:::

**Documentation:** [Bash Completion](https://github.com/scop/bash-completion)

---

### Zsh

```bash
# Add the following to ~/.zshrc
eval "$(poof completions --shell zsh)"

# Then reload your shell config
source ~/.zshrc
```

**Alternative: Manual evaluation**

```bash
# Ensure completions directory exists
mkdir -p ~/.zsh/completions

# Generate and save the completion script
poof completions --shell zsh > ~/.zsh/completions/_poof

# Add the following to ~/.zshrc (before compinit if present)
fpath=(~/.zsh/completions $fpath)
autoload -Uz compinit
compinit

# Then reload your shell config
source ~/.zshrc
```

:::note
Zsh looks for completion files starting with an underscore (e.g., `_poof`).
:::

**Documentation:** [Zsh Completion System](https://zsh.sourceforge.io/Doc/Release/Completion-System.html)

---

### Fish

```bash
# Generate and save the completion script
poof completions --shell fish > ~/.config/fish/completions/poof.fish

# Then reload your shell config
source ~/.config/fish/config.fish
```

:::note
Fish automatically loads completions from `~/.config/fish/completions/`.
:::

**Documentation:** [Fish Completion](https://fishshell.com/docs/current/completions.html)

---

### Elvish

```bash
# Ensure completions directory exists
mkdir -p ~/.config/elvish/lib

# Generate and save the completion script
poof completions --shell elvish > ~/.config/elvish/lib/poof-completions.elv

# Add the following to ~/.config/elvish/rc.elv
use poof-completions

# Then reload your shell config
use rc; rc:reload
```

**Documentation:** [Elvish Completions](https://elv.sh/ref/edit.html#completion-api)

---

### Nushell

```bash
# Generate and save the completion script
poof completions --shell nushell > ~/.config/nushell/completions/poof.nu

# Add the following to ~/.config/nushell/config.nu
source ~/.config/nushell/completions/poof.nu

# Then restart your shell or run
source ~/.config/nushell/config.nu
```

**Documentation:** [Nushell Custom Completions](https://www.nushell.sh/book/custom_completions.html)

---

### PowerShell

```powershell
# Create completions directory if it doesn't exist
New-Item -Type Directory -Path (Split-Path -Parent $PROFILE)\Completions -Force

# Generate and save the completion script
poof completions --shell powershell | Out-File -FilePath (Split-Path -Parent $PROFILE)\Completions\poof.ps1 -Encoding utf8

# Add the following to your PowerShell profile
# typically `~/.config/powershell/Microsoft.PowerShell_profile.ps1` on Linux/macOS
# and `$env:HOME\Documents\PowerShell\Microsoft.PowerShell_profile.ps1` on Windows
Add-Content $PROFILE '. (Join-Path (Split-Path -Parent $PROFILE) "Completions\poof.ps1")'

# Then reload your profile
. $PROFILE
```

**Alternative: Direct invocation**

```powershell
# Add the following to your PowerShell profile
Add-Content $PROFILE 'Invoke-Expression (& poof completions --shell powershell)'

# Then reload your profile
. $PROFILE
```

**Documentation:** [PowerShell Tab Completion](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/register-argumentcompleter)

---

### Xonsh

```bash
# Generate and save the completion script
poof completions --shell xonsh > ~/.config/xonsh/poof-completions.xsh

# Add the following to ~/.xonshrc
source ~/.config/xonsh/poof-completions.xsh

# Then reload your shell config
source ~/.xonshrc
```

:::note
Xonsh uses bash-style completions through its bash foreign function interface. The `poof completions --shell xonsh` command generates bash-compatible completions.
:::

**Documentation:** [Xonsh Tutorial: Bash Completions](https://xon.sh/tutorial.html#bash-completions)

## Conditional Setup

To avoid errors if `poof` is not installed, you can add a conditional check in your shell config:

**Bash**

```bash
if command -v poof > /dev/null 2>&1; then
   eval "$(poof completions --shell bash)"
fi
```

**Zsh**

```bash
if command -v poof > /dev/null 2>&1; then
   eval "$(poof completions --shell zsh)"
fi
```

## Troubleshooting

### Completions not working after setup

Please:

- Make sure you've reloaded your shell configuration:
  - Bash/Zsh: `source ~/.bashrc` or `source ~/.zshrc`
  - Fish: `source ~/.config/fish/config.fish`
  - Or simply restart your terminal
- Verify the completion script was generated correctly by checking the output file
- For Zsh, ensure `compinit` is called after adding the completions directory to `fpath`

### Completions showing errors

If you see errors when loading completions:

1. Regenerate the completion script: `poof completions --shell <shell> > <output-file>`
2. Make sure you're using the correct shell-specific syntax
3. Check that the completion script has proper permissions: `chmod +r <output-file>`

### Completions not updating after poof update

After updating poof, you may need to regenerate completions if you set them up manually:

```bash
# Example for bash
poof completions --shell bash > ~/.local/share/bash-completion/completions/poof
```

Or you may need to restart your shell (if using direct evaluation, `eval "$(poof completions ...)"`).

### Duplicate completions

If you have both direct evaluation and a saved completion file, you may see duplicate suggestions. Choose one method:

- **Option 1:** Save to file and let your shell auto-load it
- **Option 2:** Use direct evaluation in your shell config

Remove the method you don't want to use.

### Bash-completion not installed (Bash)

If completions aren't working in Bash, you may need to install bash-completion:

- **Debian/Ubuntu:** `sudo apt install bash-completion`
- **Fedora/RHEL:** `sudo dnf install bash-completion`
- **macOS:** `brew install bash-completion@2`

## See Also

- [poof README](https://github.com/pirafrank/poof/tree/main/README.md) - Main project documentation
- [Configure your shell](./shell-configuration.md) - Guide for adding poof to your PATH
- Shell-specific documentation (linked throughout this guide)
