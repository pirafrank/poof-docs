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
        'shell-completions',
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
        'versioning-policy',
      ],
    },
    {
      type: 'category',
      label: 'Maintenance',
      items: [
        'uninstall',
        'migrations',
      ],
    },
    'roadmap',
    'project-goals',
    'support',
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
