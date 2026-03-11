/**
 * 静态内容加载器 - 用于构建时获取所有Markdown文件的原始内容
 * 兼容VitePress构建环境
 */
import { createContentLoader } from 'vitepress'

// 创建Markdown文件内容加载器
// 这个loader会在构建时将所有md文件的内容收集到客户端bundle中
export default createContentLoader('**/*.md', {
  // 包含原始markdown源码内容
  includeSrc: true,
  // 不需要渲染HTML（节省空间和性能）
  render: false,
  // 不需要摘要内容
  excerpt: false,
  // 可以添加transform来处理数据
  transform(rawData) {
    // 可以在这里添加自定义处理逻辑
    return rawData
  }
})