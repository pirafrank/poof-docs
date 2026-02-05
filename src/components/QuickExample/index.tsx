import type {ReactNode} from 'react';
import {useState} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

import styles from './styles.module.css';
import tools from '@site/src/data/tools.json';

interface Tool {
  icon: string;
  repo: string;
}

export default function QuickExample(): ReactNode {
  const [copiedRepo, setCopiedRepo] = useState<string | null>(null);

  // Shuffle and pick 'count' number of random tools
  const getRandomTools = (toolsList: Tool[], count: number): Tool[] => {
    const array = [...toolsList];

    // Fisher-Yates shuffle
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }

    return array.slice(0, count);
  };

  const [displayedTools] = useState(() => getRandomTools(tools, 12));

  const handleToolClick = async (repo: string) => {
    try {
      const installCommand = `poof install ${repo}`;
      await navigator.clipboard.writeText(installCommand);
      setCopiedRepo(repo);
      setTimeout(() => setCopiedRepo(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section className={styles.exampleSection}>
      <div className="container" id="install">
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
              <h3>Enable it</h3>
            </div>
            <div className={styles.cardCode}>
              <code>poof enable</code>
            </div>
            <p className={styles.cardDescription}>Automatically add poof's directory to PATH</p>
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

        <div className={styles.exampleShowcase} id="tools">
          <div className={styles.showcaseHeader}>
            <span className={styles.showcaseWand}>✨</span>
            <h3>Magical tools you can install right now</h3>
            <p className={styles.showcaseTagline}>One command. Endless possibilities.</p>
          </div>
          <div className={styles.toolsGrid}>
            {displayedTools.map((tool: Tool) => (
              <div
                key={tool.repo}
                className={styles.toolItem}
                onClick={() => handleToolClick(tool.repo)}
                title={copiedRepo === tool.repo ? 'Copied!' : `Click to copy: poof install ${tool.repo}`}
                style={{ cursor: 'pointer' }}
              >
                <span className={styles.toolIcon}>{tool.icon}</span>
                <code>{tool.repo}</code>
                {copiedRepo === tool.repo && (
                  <span className={styles.copiedIndicator}>✓</span>
                )}
              </div>
            ))}
          </div>
          <div className={styles.showcaseFooter}>
            <p>
              Click on a tool to copy the install command to clipboard.
              <br/>
              Tools are randomly selected. Get back later to see more.
            </p>
          </div>
        </div>

        <div className="text--center margin-top--xl">
          <Link
            className="button button--primary button--lg"
            to="/docs/installation">
            Start using poof →
          </Link>
        </div>
      </div>
    </section>
  );
}
