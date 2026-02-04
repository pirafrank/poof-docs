---
sidebar_position: 2
sidebar_label: Shell Configuration
title: Configure Your Shell
description: Guide to configure your shell to use poof
---

# Configure Your Shell

After installing poof, it's necessary to add its `bin` directory to `$PATH`.

## Automatically

Via poof itself by running:

```sh
poof enable
```

Then reload your shell.

:::note
You can safely re-run `poof enable`. It will detect the existing line and do nothing if it's already present.
:::

## Manually

Add the following command to your shell configuration:

```bash
poof init --shell <shell>
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
# Add the following to ~/.bashrc or ~/.bash_profile
eval "$(poof init --shell bash)"

# Then reload your shell config
source ~/.bashrc
```

---

### Zsh

```bash
# Add the following to ~/.zshrc
eval "$(poof init --shell zsh)"

# Then reload your shell config
source ~/.zshrc
```

---

### Fish

```bash
# Add the following to ~/.config/fish/config.fish
poof init --shell fish >> ~/.config/fish/config.fish

# Then reload your shell config
source ~/.config/fish/config.fish
```

**Documentation:** [fish_add_path](https://fishshell.com/docs/current/cmds/fish_add_path.html)

---

### Elvish

```elvish
# Add the following to ~/.config/elvish/rc.elv
eval (poof init --shell elvish)

# Then reload your shell config
use rc; rc:reload
```

**Documentation:** [Elvish PATH Management](https://elv.sh/learn/tour.html#changing-path)

---

### Nushell

```bash
# Run the following to add to ~/.config/nushell/env.nu (for environment variables)
poof init --shell nushell >> ~/.config/nushell/env.nu

# Then restart your shell or run
source ~/.config/nushell/env.nu
```

**Documentation:** [Nushell Environment Variables](https://www.nushell.sh/book/environment.html#env-var-assignment)

---

### PowerShell

```powershell
# Add the following to PowerShell profile
# typically `~/.config/poweshell/Microsoft.PowerShell_profile.ps1` on Linux/macOS
# and `$env:HOME\Documents\PowerShell\Microsoft.PowerShell_profile.ps1` on Windows
Add-Content $PROFILE 'Invoke-Expression (& poof init --shell powershell)'

# Then reload your profile
. $PROFILE
```

**Notes:**

- PowerShell uses semicolons (`;`) as PATH separators on all platforms.
- PowerShell uses `Invoke-Expression` (or `iex`) instead of `eval`, and `&` for command invocation.

**Documentation:** [PowerShell Environment Variables](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_environment_variables?view=powershell-7.5)

---

### Xonsh

```bash
# Add the following to ~/.xonshrc
poof init --shell xonsh >> ~/.xonshrc

# Then reload your shell config
source ~/.xonshrc
```

**Documentation:** [Xonsh Cheatsheet](https://pypi.org/project/xontrib-cheatsheet/)

---

## Verification

After adding the init script to your shell configuration, verify that poof is in your PATH:

```bash
poof --help
```

## Conditional PATH addition

To avoid adding the poof directory if `poof` is not installed, you can add a conditional check in your shell config:

**Bash**

```bash
if command -v poof > /dev/null 2>&1; then
   eval "$(poof init --shell bash)"
fi
```

**Zsh**

```bash
if command -v poof > /dev/null 2>&1; then
   eval "$(poof init --shell zsh)"
fi
```

## Additional Notes

- The `poof init` command detects the poof bin directory automatically based on your system configuration
- All shells prepend the poof bin directory to PATH, ensuring poof-installed binaries take precedence over system binaries
- Changes to shell configuration only affect new shell sessions; existing sessions need to reload the configuration

## Troubleshooting

### PATH not updated after adding init script

Please:

- Make sure you've reloaded your shell configuration:
  - Bash/Zsh: `source ~/.bashrc` or `source ~/.zshrc`
  - Fish: `source ~/.config/fish/config.fish`
  - Or simply restart your terminal
- Check if the init script was added correctly to your config file.

### Duplicate PATH entries

If you accidentally added the init script multiple times, you may have duplicate PATH entries. To fix:

1. Edit your shell configuration file
2. Remove duplicate lines
3. Reload your shell configuration

### Permission issues

If binaries aren't executable:

```bash
chmod +x ~/.local/share/poof/bin/*
```

## See Also

- [poof README](https://github.com/pirafrank/poof/tree/main/README.md) - Main project documentation
- Shell-specific documentation (linked throughout this guide)
