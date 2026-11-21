# Documentation maintenance

Keep documentation accurate as poof's code and distribution channels change.

## Verify claims against their source

- Treat poof source as authoritative for CLI and runtime behavior. Check `src/cli.rs`,
  `src/commands/`, `src/core/`, `src/files/`, and `src/models/`; use `Cargo.toml` and release
  workflows for version, platform, and build claims.
- Check distribution and integration details in their own sources, including `npm/`, `skills/`,
  and the relevant workflow or integration repository. Do not infer launcher or integration
  requirements from poof's runtime requirements.
- For CLI examples and command descriptions, verify accepted arguments, defaults, output, and
  side effects in the command implementation. For asset-selection explanations or scoring tables,
  check the selector and its tests; describe only the implemented criteria and precedence.
- Keep requirements scoped to the component that needs them. In particular, distinguish Node
  requirements for the npm launcher from requirements of poof itself, and from requirements of
  separately distributed tools such as `npx skills`.
- For supported platforms, shells, archive formats, and environment variables, verify the actual
  supported set and behavior in code and tests. Do not broaden support based only on a tool being
  mentioned in docs or on a plausible platform/runtime assumption.
- For security and release-verification pages, describe the guarantees actually implemented.
  Avoid exhaustive lists of filtered or trusted items when behavior is defined by general checks
  such as checksums and signatures.
- Verify links, package names, launcher pages, and integration instructions against the relevant
  upstream project or registry page. Core poof documentation is not sufficient evidence for these.
- Use exact wording for version-sensitive behavior. Distinguish the latest release, the highest
  installed version, and the active version.

## Keep documentation versions aligned

- `docs/` describes the next version; `versioned_docs/version-0.6.x/` describes the 0.6.x line.
- When a change applies to both, update both copies and compare them. Preserve intentional
  historical differences in versioned pages.
- When adding, removing, or renaming a page, check `sidebars.ts` and
  `versioned_sidebars/version-0.6.x-sidebars.json`. Follow the existing Docusaurus release
  workflow for version snapshots and `versions.json`.

Keep edits focused. For documentation changes, check links and run `npm run build` when
dependencies are available. Do not commit changes.
