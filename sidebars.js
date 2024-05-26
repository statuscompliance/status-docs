/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  documentationSidebar: [
    // { type: "autogenerated", dirName: "." },
    "intro",
    // "Overview",
    "Architecture/intro",
    // {
    //   type: "category",
    //   label: "Architecture",
    //   collapsible: true,
    //   collapsed: true,
    //   link: { type: "doc", id: "Architecture/intro" },
    //   items: ["Architecture/services"],
    // },
    {
      type: "category",
      className: "sidebar-hr",
      label: "🔧 DEVELOPMENT",
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "category",
          label: "Getting Started",
          collapsible: true,
          collapsed: true,
          items: [
            "Getting-started/installation",
            "Getting-started/configuration",
            "Getting-started/testing",
            "Getting-started/nodeRED",
          ],
        },
        {
          type: "category",
          label: "Tooling",
          collapsible: true,
          collapsed: true,
          items: ["Tooling/nodeRED", "Tooling/bluejay", "Tooling/openAI"],
        },
      ],
    },
    {
      type: "category",
      className: "sidebar-hr",
      label: "📖 ABOUT",
      collapsible: false,
      collapsed: false,
      items: ["About/License"],
    },
  ],
};

export default sidebars;
