# poof Documentation

Official documentation website for [poof](https://github.com/pirafrank/poof) - the magic manager of pre-built software.

This website is built using [Docusaurus 3](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
npm install
```

## Sample Workflow

```sh
# 1. Working on next version
nvim docs/getting-started/installation.md

# 2. Poof releases v0.8.0
npm run docusaurus docs:version 0.8.0

# 3. Found a typo in v0.8.0 docs after release
nvim versioned_docs/version-0.8.0/getting-started/installation.md
git commit -m "fix: typo in v0.8.0 installation guide"

# 4. Continue working on next features
nvim docs/features/overview.md  # This is for "Next" version
```

## Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

### Manual Deployment

```bash
npm run build
npm run serve
```

## Project Structure

```
poof-docs/
├── docs/                      # Documentation files
│   ├── getting-started/       # Installation and setup guides
│   ├── concepts/              # Core concepts
│   ├── features/              # Features and capabilities
│   ├── maintenance/           # Maintenance guides
│   └── development/           # Development and contribution guides
├── src/                       # React components and pages
├── static/                    # Static assets (images, CNAME)
├── docusaurus.config.ts       # Site configuration
├── sidebars.ts                # Sidebar navigation structure
└── package.json               # Dependencies and scripts

```

## Scripts

- `npm start` - Start development server
- `npm run build` - Build production site
- `npm run serve` - Serve built site locally
- `npm run clear` - Clear Docusaurus cache
- `npm run typecheck` - Run TypeScript type checking

## Contributing

Contributions to the documentation are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm start`
5. Submit a pull request

## License

This documentation is part of the poof project and is licensed under the MIT License.

## Links

- **poof Repository**: [https://github.com/pirafrank/poof](https://github.com/pirafrank/poof)
- **Documentation Site**: [https://pirafrank.github.io/poof-docs](https://pirafrank.github.io/poof-docs)
- **Issues**: [https://github.com/pirafrank/poof/issues](https://github.com/pirafrank/poof/issues)
- **Discussions**: [https://github.com/pirafrank/poof/discussions](https://github.com/pirafrank/poof/discussions)
