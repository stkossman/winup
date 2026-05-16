# Winup

> Minimal CLI tool for managing winget upgrades.

A fast, interactive, and safe wrapper around `winget` that allows you to cleanly check, list, and install updates on Windows without the visual noise.

---

## Features

- **Safe by default:** Packages with `unknown` versions are hidden and ignored unless explicitly requested.
- **Interactive UI:** Select which packages to upgrade using a simple checkbox prompt.
- **Dependency-free runtime:** Available as a standalone `.exe` or a lightweight NPM package.
- **Idempotent:** Safe to run multiple times. Handles `winget` quirks, errors, and UAC prompts gracefully.

## Installation

**Option A: Standalone Executable**
1. Go to the [Releases](../../releases) page.
2. Download `winup.exe`.
3. Place it in a folder that is added to your system's `PATH`.

**Option B: Via NPM / Bun (For developers)**
```bash
npm install -g winup-cli
# or
bun add -g winup-cli
```

## Usage
Run the tool from your terminal:
```bash
# Interactively upgrade safe packages
winup upgrade

# Just check how many updates are available
winup check

# List all available safe updates in a table
winup list

# List ALL updates, including risky 'unknown' versions
winup list --include-unknown
```

## Commands & Flags
* `check` - Quickly check for available updates without printing the full list.
* `list` - Display a dynamic table of available updates.
* `upgrade` - Launch the interactive upgrade prompt.

### Upgrade Flags
* `--all-safe` - Automatically upgrade all safe packages without prompting.
* `-i, --id <ids...>` - Upgrade specific package(s) by ID (e.g., winup upgrade -i Google.Chrome).
* `--include-unknown` - Include unknown versions in the interactive list or automatic upgrade.
* `--dry-run`-  Simulate the upgrade process without making system changes.

## Local Development
Written in strict TypeScript using ESM.
```bash
# Install dependencies
bun install

# Run unit tests
bun test

# Build the project
bun run build

# Compile standalone executable locally
bun run compile:exe
```

---

<div align="center">
<sub>Made by Kossman</sub>
</div>