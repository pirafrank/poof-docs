import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Main documentation sidebar matching the wiki structure
  docsSidebar: [
    'intro',
    'supported-platforms',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'installation',
        'shell-configuration',
        'usage',
      ],
    },
    {
      type: 'category',
      label: 'Features',
      collapsed: false,
      items: [
        'features',
        'rate-limiting',
        'environment-variables',
        'shell-completions',
        'advanced-usage',
        'debug-logs',
        'disable',
      ],
    },
    {
      type: 'category',
      label: 'Concepts',
      collapsed: false,
      items: [
        'concepts',
        'data-storage',
        'how-it-works',
        'versioning-policy',
      ],
    },
    'roadmap',
    'project-goals',
    'migrations',
    'support',
    'uninstall',
    {
      type: 'category',
      label: 'Contribute',
      items: [
        'contribute',
        'development-guide',
      ],
    },
  ],
};

export default sidebars;
