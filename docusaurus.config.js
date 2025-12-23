// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "STATUS documentation",
  tagline:
    "Explore a business process compliance management system for your organization",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://your-docusaurus-site.example.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: "warn",
      onBrokenMarkdownImages: "warn",
    },
  },
  themes: ['@docusaurus/theme-mermaid'],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "statuscompliance", // Usually your GitHub org/user name.
  projectName: "status-docs", // Usually your repo name.

  onBrokenLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    localeConfigs: {
      en: {
        label: "English",
      },
      es: {
        label: "Español",
      },
    },
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/theme-search-algolia')} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      mermaid: {
        theme: { light: 'neutral', dark: 'forest' },
      },
      algolia: {
        // The application ID provided by Algolia
        appId: "IJZ96449HV",
        // Public API key: it is safe to commit it
        apiKey: "0b31969857df8ab34b7cad2867e6dfd5",
        indexName: "status-netlify",
        // Optional: see doc section below
        contextualSearch: false,
        // Optional: Replace parts of item URLs from Algolia. Useful when using same search index for multiple deployments using a different baseUrl. You can use regexp or string in `from` param. For example: localhost:3000 vs myCompany.com/docs
        // replaceSearchResultPathname: {
        //   from: "/docs/", // or as RegExp: /\/docs\//
        //   to: "/",
        // },
        // Optional: Algolia search parameters
        searchParameters: {},
        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: "search",
        // Optional: whether insights feature is enabled or not on Docsearch (`false` by default)
        insights: false,
      },
      navbar: {
        title: "STATUS documentation",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "documentationSidebar",
            position: "left",
            label: "Docs",
          },
          {
            href: "https://github.com/statuscompliance/status-docs",
            label: "GitHub",
            position: "right",
          },
          {
            type: "localeDropdown",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Docs",
                to: "/docs/intro",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} STATUS, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
