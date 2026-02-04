import type {ReactNode} from 'react';
import {useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function InstallCommand() {
  const [copied, setCopied] = useState(false);
  const installScript = 'curl -fsSL https://raw.githubusercontent.com/pirafrank/poof/main/install.sh | sh';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(installScript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={styles.installCommand}>
      <code>{installScript}</code>
      <button
        className={styles.copyButton}
        onClick={handleCopy}
        aria-label="Copy install command"
        title={copied ? 'Copied!' : 'Copy to clipboard'}
      >
        {copied ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"/>
            <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"/>
          </svg>
        )}
      </button>
    </div>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title} 🪄
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p className={styles.heroDescription}>
          Easy-to-use all-in-one binary with zero-config, zero-install, and zero-dependencies.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/installation">
            Get Started
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            to="/docs/intro">
            Learn More
          </Link>
        </div>
        <InstallCommand />
      </div>
    </header>
  );
}

function QuickExample() {
  return (
    <section className={styles.exampleSection}>
      <div className="container">
        <div className={styles.exampleHeader}>
          <span className={styles.exampleEmoji}>⚡</span>
          <Heading as="h2" className="text--center">
            Install any GitHub release in seconds
          </Heading>
          <p className={styles.exampleSubtitle}>
            No package manager? No problem. Just point poof at any GitHub repo and... *poof!* it's installed.
          </p>
        </div>

        <div className={styles.exampleGrid}>
          <div className={styles.exampleCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardNumber}>1</span>
              <h3>Install poof</h3>
            </div>
            <div className={styles.cardCode}>
              Install via brew, cargo, asdf, and more.
            </div>
            <p className={styles.cardDescription}>One command to get started</p>
          </div>

          <div className={styles.exampleCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardNumber}>2</span>
              <h3>Add to PATH</h3>
            </div>
            <div className={styles.cardCode}>
              <code>poof enable</code>
            </div>
            <p className={styles.cardDescription}>Configure your shell automatically</p>
          </div>

          <div className={styles.exampleCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardNumber}>3</span>
              <h3>Install anything</h3>
            </div>
            <div className={styles.cardCode}>
              <code>poof install user/repo</code>
            </div>
            <p className={styles.cardDescription}>Works with any GitHub release</p>
          </div>
        </div>

        <div className={styles.exampleShowcase}>
          <div className={styles.showcaseHeader}>
            <span className={styles.showcaseWand}>✨</span>
            <h3>Magical tools you can install right now</h3>
            <p className={styles.showcaseTagline}>One command. Endless possibilities.</p>
          </div>
          <div className={styles.toolsGrid}>
            <div className={styles.toolItem}>
              <span className={styles.toolIcon}>🔍</span>
              <code>BurntSushi/ripgrep</code>
            </div>
            <div className={styles.toolItem}>
              <span className={styles.toolIcon}>🎯</span>
              <code>acheronfail/repgrep</code>
            </div>
            <div className={styles.toolItem}>
              <span className={styles.toolIcon}>🎬</span>
              <code>asciinema/asciinema</code>
            </div>
            <div className={styles.toolItem}>
              <span className={styles.toolIcon}>🎞️</span>
              <code>asciinema/agg</code>
            </div>
            <div className={styles.toolItem}>
              <span className={styles.toolIcon}>📺</span>
              <code>alexpasmantier/television</code>
            </div>
            <div className={styles.toolItem}>
              <span className={styles.toolIcon}>💾</span>
              <code>ayungavis/rudu</code>
            </div>
            <div className={styles.toolItem}>
              <span className={styles.toolIcon}>⚙️</span>
              <code>bytecodealliance/wasmtime</code>
            </div>
            <div className={styles.toolItem}>
              <span className={styles.toolIcon}>🧊</span>
              <code>charmbracelet/freeze</code>
            </div>
            <div className={styles.toolItem}>
              <span className={styles.toolIcon}>✨</span>
              <code>charmbracelet/glow</code>
            </div>
            <div className={styles.toolItem}>
              <span className={styles.toolIcon}>🔄</span>
              <code>CycloneDX/cyclonedx-cli</code>
            </div>
            <div className={styles.toolItem}>
              <span className={styles.toolIcon}>🌊</span>
              <code>dandavison/delta</code>
            </div>
            <div className={styles.toolItem}>
              <span className={styles.toolIcon}>📂</span>
              <code>direnv/direnv</code>
            </div>
            <div className={styles.toolItem}>
              <span className={styles.toolIcon}>🌳</span>
              <code>extrawurst/gitui</code>
            </div>
            <div className={styles.toolItem}>
              <span className={styles.toolIcon}>📋</span>
              <code>eza-community/eza</code>
            </div>
            <div className={styles.toolItem}>
              <span className={styles.toolIcon}>🗂️</span>
              <code>gokcehan/lf</code>
            </div>
            <div className={styles.toolItem}>
              <span className={styles.toolIcon}>📝</span>
              <code>helix-editor/helix</code>
            </div>
            <div className={styles.toolItem}>
              <span className={styles.toolIcon}>🦥</span>
              <code>jesseduffield/lazygit</code>
            </div>
            <div className={styles.toolItem}>
              <span className={styles.toolIcon}>🐳</span>
              <code>jesseduffield/lazydocker</code>
            </div>
            <div className={styles.toolItem}>
              <span className={styles.toolIcon}>🌲</span>
              <code>chmouel/lazyworktree</code>
            </div>
            <div className={styles.toolItem}>
              <span className={styles.toolIcon}>🔒</span>
              <code>karol-broda/snitch</code>
            </div>
            <div className={styles.toolItem}>
              <span className={styles.toolIcon}>🔧</span>
              <code>ms-jpq/sad</code>
            </div>
            <div className={styles.toolItem}>
              <span className={styles.toolIcon}>☀️</span>
              <code>pomdtr/sunbeam</code>
            </div>
            <div className={styles.toolItem}>
              <span className={styles.toolIcon}>🌐</span>
              <code>pranshuparmar/witr</code>
            </div>
            <div className={styles.toolItem}>
              <span className={styles.toolIcon}>🔍</span>
              <code>sharkdp/fd</code>
            </div>
          </div>
          <div className={styles.showcaseFooter}>
            <p>Install any of these with <code className={styles.inlineCode}>poof install owner/repo</code></p>
          </div>
        </div>

        <div className="text--center margin-top--xl">
          <Link
            className="button button--primary button--lg"
            to="/docs/getting-started/installation">
            Start using poof →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Magic manager of pre-built software`}
      description="poof is a magic manager of pre-built software. Install GitHub releases with a single command. Zero-config, zero-install, zero-dependencies.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <QuickExample />
      </main>
    </Layout>
  );
}
