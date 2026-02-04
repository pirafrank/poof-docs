import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  emoji: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Zero Everything',
    emoji: '🚀',
    description: (
      <>
        <strong>Zero-config</strong>, <strong>zero-install</strong>, and <strong>zero-dependencies</strong>.
        One self-contained binary that works out of the box. No YAML, no TOML, no setup required.
      </>
    ),
  },
  {
    title: 'Smart Asset Selection',
    emoji: '🧠',
    description: (
      <>
        Automatically detects your OS, architecture, and libc to download the right binary.
        Supports multi-tool releases, mono-repos, and handles 10+ archive formats with magic number validation.
      </>
    ),
  },
  {
    title: 'Version Management',
    emoji: '🔄',
    description: (
      <>
        Install multiple versions side-by-side and switch between them instantly with <code>poof use</code>.
        Update all installed tools with a single command.
      </>
    ),
  },
  {
    title: 'User-Space First',
    emoji: '👤',
    description: (
      <>
        Designed to work in user-space and be portable. No root access needed.
        XDG-compliant directory structure keeps your system clean and organized.
      </>
    ),
  },
  {
    title: 'Cross-Platform',
    emoji: '🌍',
    description: (
      <>
        Works on Linux and macOS. Supports 8 architectures on Linux, both Intel and Apple Silicon on macOS.
        Native shell integration for bash, zsh, fish, elvish, nushell, powershell, and xonsh.
      </>
    ),
  },
  {
    title: 'Fast & Safe',
    emoji: '⚡',
    description: (
      <>
        Written in Rust for speed and safety. Built on reliable dependencies with linting
        and formatting applied at commit time. Helpful error messages guide you when things go wrong.
      </>
    ),
  },
];

function Feature({title, emoji, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <div className={styles.featureEmoji}>{emoji}</div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
