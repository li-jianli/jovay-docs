import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Jovay",
  description: "Docs for Jovay!",
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/guide/about-jovay' }
    ],

    sidebar: [
//      {
//        text: 'Guide',
//        items: [
          {
            text: 'Learn about Jovay',
            collapsed: false,
            link: '/guide/learn-about-jovay',
            items: [
              { text: 'About Jovay', link: '/guide/about-jovay' },
              { text: 'DTVM', link: '/guide/dtvm' },
              { text: 'Explorer', link: '/guide/explorer' },
            ],
          },
          { text: 'Jovay Layer2 Whitepaper', link: '/guide/whitepaper' },
          { text: 'SmartCogent Introduction', link: '/guide/smartcogent' },
          { text: 'How to access the devnet', link: '/guide/how-to-access-the-devnet' }
//        ]
//      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ZanTeam/jovay-docs' }
    ]
  },
})
