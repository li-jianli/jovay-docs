import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "BULGARI",
  description: "Docs for BULGARI!",
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
          { text: 'Introduction', link: '/guide/intro' },
          { text: 'Get Started', link: '/guide/get-started' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ZanTeam/bulgari-docs' }
    ]
  },
})
