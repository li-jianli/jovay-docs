// .vitepress/theme/utils/md-content-loader.ts
// 生产环境原文由 buildEnd 镜像到 dist/<filePath>（与 html 同级），按页 fetch；未再使用全局 __mdRawContentLoaderData。
export interface MarkdownContent {
  path: string;
  src: string;
  url: string;
  frontmatter: Record<string, any>;
}

// 声明全局变量
declare global {
  interface Window {
    __mdRawContentLoaderData?: MarkdownContent[];
  }
}

// 用于检查和获取原始内容的工具函数
export function getRawMarkdownContent(filePath: string): string | null {
  if (typeof window !== 'undefined' && window.__mdRawContentLoaderData) {
    const fileData = window.__mdRawContentLoaderData.find(item => item.path === filePath);
    return fileData?.src || null;
  }
  return null;
}