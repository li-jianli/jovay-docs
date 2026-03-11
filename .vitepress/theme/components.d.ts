declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    CustomImage: typeof import('./components/CustomImage.vue').default
    ImagePreview: typeof import('./components/ImagePreview.vue').default
    EnhancedCollapsibleCodeBlock: typeof import('./components/EnhancedCollapsibleCodeBlock.vue').default
    CopyPageButton: typeof import('./components/CopyPageButton.vue').default
  }
}