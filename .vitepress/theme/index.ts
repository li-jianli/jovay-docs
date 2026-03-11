import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import { useData, useRoute } from "vitepress";
import codeblocksFold from "vitepress-plugin-codeblocks-fold";
import "vitepress-plugin-codeblocks-fold/style/index.css";
import ImagePreview from "./components/ImagePreview.vue";
import CustomImage from "./components/CustomImage.vue";
import EnhancedCollapsibleCodeBlock from "./components/EnhancedCollapsibleCodeBlock.vue";
import CopyPageButton from "./components/CopyPageButton.vue";

// 创建一个简单的事件总线
const eventBus = {
  listeners: new Map(),
  emit(event: string, data: any) {
    const listeners = this.listeners.get(event) || [];
    listeners.forEach((callback: Function) => callback(data));
  },
  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(callback);
  },
};

const imagePreviewService = {
  openPreview: (src: string) => {
    eventBus.emit("preview-image", src);
  },
};

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("CustomImage", CustomImage);
    app.provide("imagePreview", imagePreviewService);
    app.provide("eventBus", eventBus);
    app.component("EnhancedCollapsibleCodeBlock", EnhancedCollapsibleCodeBlock);
    app.component("CopyPageButton", CopyPageButton);
  },
  setup() {
    // get frontmatter and route
    const { frontmatter } = useData();
    const route = useRoute();
    // basic use - 默认展开所有代码块，不自动折叠
    codeblocksFold({ route, frontmatter }, false, 400);
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "layout-bottom": () => h(ImagePreview),
      // 挂载在 content-after，组件内会把 DOM 挪到 #local-search 后（主题里 after 实际在 menu 之后）
      "nav-bar-content-after": () => h(CopyPageButton),
    });
  },
};
