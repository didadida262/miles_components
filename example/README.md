# TaskCard 组件使用示例

这个示例展示了如何在Vue 3项目中使用 `@miles-wang/task-card` 组件库。

## 安装

```bash
npm install @miles-wang/task-card
# 或
yarn add @miles-wang/task-card
# 或
pnpm add @miles-wang/task-card
```

## 基础使用

```vue
<template>
  <TaskCard
    title="待分配"
    tag="请购单"
    :number="5"
    unit="张"
    icon-type="clipboard"
  />
</template>

<script setup>
import { TaskCard } from '@miles-wang/task-card'
</script>
```

## 完整示例

查看 `usage-example.vue` 文件了解完整的使用示例。

## 特性

- ✅ **TypeScript支持**: 完整的类型定义
- ✅ **响应式设计**: 适配不同屏幕尺寸
- ✅ **可定制**: 支持自定义样式和主题
- ✅ **轻量级**: 优化的打包大小
- ✅ **易用**: 简单的API设计

## 文档

更多详细信息请查看主README文件。
