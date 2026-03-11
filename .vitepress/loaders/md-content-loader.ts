// .vitepress/loaders/md-content-loader.ts
import { createContentLoader } from 'vitepress'

// 创建一个加载所有Markdown内容的loader
export default createContentLoader('**/*.md', {
  includeSrc: true,
  render: false,
  excerpt: false
})