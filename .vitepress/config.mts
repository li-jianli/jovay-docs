import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Jovay",
  description: "Docs for Jovay!",
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/guide/intro' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Whitepaper', link: '/guide/whitepaper' },
          { text: 'SmartCogent', link: '/guide/smartcogent' },
          { text: 'DTVM', link: '/guide/dtvm' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ZanTeam/jovay-docs' }
    ]
  },
})
