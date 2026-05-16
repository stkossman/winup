# Contributing to Winup

First off, thank you for considering contributing to Winup.

I value minimalism, reliability, and safe-by-default behavior over clever hacks or feature bloat. If your PR aligns with these principles, it is highly welcome.

## Tech Stack

- **Runtime:** Node.js (ESM)
- **Language:** TypeScript (Strict mode)
- **Package Manager & Bundler:** Bun
- **Testing:** Vitest
- **CLI Utilities:** Commander, @inquirer/checkbox, picocolors

## Development Setup

1. **Prerequisites:** Ensure you have [Bun](https://bun.sh/) and [Node.js](https://nodejs.org/) installed.
2. **Clone the repo:**
   ```bash
   git clone [https://github.com/stkossman/winup.git](https://github.com/stkossman/winup.git)
   cd winup
   ```
3. **Install dependencies:**
    ```bash
    bun install
    ```
4. **Run tests:**
    ```bash
    bun test # if any errors, run:
    bunx vitest run
    ```
5. **Build the project locally:**
    ```bash
    bun run build
    ```

## Code Philosophy
* **No Hidden Magic**: Do not run unexpected system commands. Operations like upgrading packages should always require explicit user consent or explicit flags.
* **Idempotency:** Running a command twice should not break the system or throw unhandled errors.
* **Zero-Dependency Core:** Keep external dependencies to an absolute minimum. I prefer using native Node APIs (`node:child_process`) over heavy wrappers.
* **Isolate Side Effects:**  Keep parsing logic (`src/core/parser.ts`) completely separate from executing logic (`src/core/runner.ts`). This makes unit testing trivial.

## Pull Request Process
1. Fork the repository and create your branch from `main`.
2. Write unit tests for your changes, especially if you are modifying the `Parser` or `Normalizer`.
3. Ensure the test suite passes (`bun test` / `bunx vitest run`).
4. Ensure the code compiles cleanly (`bun run build`).
5. Open a Pull Request and **fill out the provided PR template**. Please ensure all checklist items are completed and provide visuals if applicable.

## Issues and Bugs
I use GitHub Issue Templates to keep tracking organized. When opening an issue, please select the appropriate template (Bug, Feature, or Chore) and fill out all required fields.

If you are reporting a **bug**, please ensure you include:
- The raw output of `winget upgrade` on your machine.
- The exact command you ran.
- The expected vs. actual behavior.
- Your environment details (Node.js, Windows, and Winget versions).

Thank you for helping keep Windows package management clean and simple.