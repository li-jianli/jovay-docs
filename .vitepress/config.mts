import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Jovay",
  description: "Docs for Jovay!",
  cleanUrls: true,
  
  head: [
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-HH2VW9FRN9' }
    ],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-HH2VW9FRN9');
    `]
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/guide/about-jovay' }
    ],

    sidebar: [
      { text: 'About Jovay', link: '/guide/about-jovay' },
      { text: 'Jovay Layer2 Whitepaper', link: '/guide/whitepaper' },
      { text: 'Learn about Jovay', link: '/guide/learn-about-jovay' },
      { text: 'SmartCogent Introduction', link: '/guide/smartcogent' },
      { text: 'How to access the devnet', link: '/guide/how-to-access-the-devnet' }
    ],

    socialLinks: [
      { icon: 'x', link: 'https://x.com/Jovay_Network' }
    ],

    footer: {
      copyright: '©2025 Copyright by Jovay, all rights reserved.'
    }
  },
})
