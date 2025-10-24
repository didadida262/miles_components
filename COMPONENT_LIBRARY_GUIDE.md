# Vue 组件库开发指南

## 🎉 项目完成状态

✅ **组件库架构已完成！** 你的TaskCard组件已经成功转换为一个可扩展的Vue 3组件库。

## 📦 新的项目结构

```
miles_components/
├── src/                          # 源代码目录
│   ├── components/               # 组件目录
│   │   ├── TaskCard/             # TaskCard组件
│   │   │   ├── TaskCard.vue      # 主组件
│   │   │   ├── TaskCardDemo.vue  # 演示组件
│   │   │   ├── TaskCard.types.ts # 类型定义
│   │   │   ├── config.ts         # 配置文件
│   │   │   ├── index.ts          # 组件入口
│   │   │   └── README.md         # 组件文档
│   │   ├── Card/                 # 新创建的Card组件
│   │   │   ├── Card.vue
│   │   │   ├── Card.types.ts
│   │   │   ├── Card.config.ts
│   │   │   ├── CardDemo.vue
│   │   │   ├── index.ts
│   │   │   └── README.md
│   │   ├── Button/               # 预留的Button组件目录
│   │   ├── Input/                # 预留的Input组件目录
│   │   ├── Modal/                # 预留的Modal组件目录
│   │   └── index.ts              # 组件注册系统
│   ├── assets/icons/             # SVG图标资源
│   ├── styles/                   # 样式文件
│   ├── types/                    # 通用类型定义
│   ├── utils/                    # 工具函数
│   └── index.ts                  # 库入口文件
├── scripts/                      # 脚本目录
│   ├── create-component.js       # 组件创建脚本
│   └── publish.js               # 发布脚本
├── example/                      # 使用示例
├── dist/                         # 构建输出
└── 配置文件...
```

## 🚀 组件库特性

### ✅ 已完成的功能

1. **可扩展架构**
   - 支持多组件扩展
   - 统一的组件注册系统
   - 自动化的组件创建工具

2. **开发工具**
   - 组件创建脚本
   - 统一的开发规范
   - 完整的TypeScript支持

3. **构建系统**
   - 支持ES模块和CommonJS
   - 自动类型声明生成
   - 优化的打包配置

4. **文档系统**
   - 组件开发规范
   - 贡献指南
   - 使用示例

## 🛠️ 如何使用

### 1. 安装组件库

```bash
npm install @miles-wang/vue-components
```

### 2. 全局使用

```javascript
// main.js
import { createApp } from 'vue'
import VueComponents from '@miles-wang/vue-components'
import App from './App.vue'

const app = createApp(App)
app.use(VueComponents)
app.mount('#app')
```

### 3. 按需使用

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
import { TaskCard } from '@miles-wang/vue-components'
</script>
```

## 🔧 开发新组件

### 1. 使用组件创建脚本

```bash
# 创建新组件
node scripts/create-component.js Button

# 创建输入框组件
node scripts/create-component.js Input

# 创建模态框组件
node scripts/create-component.js Modal
```

### 2. 手动创建组件

按照以下目录结构创建新组件：

```
src/components/ComponentName/
├── ComponentName.vue          # 主组件
├── ComponentNameDemo.vue      # 演示组件
├── ComponentName.types.ts     # 类型定义
├── ComponentName.config.ts    # 配置文件
├── index.ts                   # 组件入口
└── README.md                  # 组件文档
```

### 3. 更新组件注册

在 `src/components/index.ts` 中添加新组件：

```typescript
// 注册新组件
export function registerComponents(app: App) {
  app.component('TaskCard', () => import('./TaskCard/TaskCard.vue'))
  app.component('Button', () => import('./Button/Button.vue'))
  app.component('Input', () => import('./Input/Input.vue'))
  // 添加更多组件...
}

// 导出新组件
export { default as Button } from './Button/Button.vue'
export { default as Input } from './Input/Input.vue'
```

## 📝 组件开发规范

### 1. 组件命名
- 使用PascalCase：`TaskCard`, `Button`, `Input`
- 文件名与组件名保持一致
- CSS类名使用kebab-case：`task-card`, `button-primary`

### 2. 组件结构
```vue
<template>
  <div class="component-name">
    <!-- 组件内容 -->
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, defineEmits } from 'vue'
import type { ComponentProps, ComponentEmits } from './Component.types'

const props = withDefaults(defineProps<ComponentProps>(), {
  // 默认值
})

const emit = defineEmits<ComponentEmits>()
</script>

<style lang="less" scoped>
.component-name {
  // 样式
}
</style>
```

### 3. 类型定义
```typescript
export interface ComponentProps {
  size?: 'small' | 'medium' | 'large'
  variant?: 'default' | 'primary' | 'secondary'
  disabled?: boolean
}

export interface ComponentEmits {
  click?: (event: MouseEvent) => void
}
```

## 🚀 发布流程

### 1. 开发新组件
```bash
# 创建组件
node scripts/create-component.js NewComponent

# 开发组件功能
# 编写文档
# 添加测试
```

### 2. 构建和测试
```bash
# 构建项目
npm run build

# 测试包结构
node test-package.js
```

### 3. 发布到npm
```bash
# 发布
node scripts/publish.js

# 或手动发布
npm publish --access public
```

## 📊 当前状态

### 已完成的组件
- ✅ **TaskCard**: 任务卡片组件
- ✅ **Card**: 基础卡片组件（示例）

### 预留的组件目录
- 📁 **Button**: 按钮组件
- 📁 **Input**: 输入框组件
- 📁 **Modal**: 模态框组件

### 构建结果
- **ES模块**: 13.66 KB (gzip: 3.76 KB)
- **CommonJS模块**: 11.71 KB (gzip: 3.49 KB)
- **样式文件**: 3.07 KB (gzip: 1.01 KB)

## 🎯 下一步计划

1. **开发更多组件**
   - Button组件
   - Input组件
   - Modal组件
   - Table组件
   - Form组件

2. **完善功能**
   - 主题系统
   - 国际化支持
   - 动画系统
   - 无障碍访问

3. **优化体验**
   - 组件文档网站
   - 在线演示
   - 设计系统
   - 最佳实践指南

## 🎉 总结

你的组件库现在已经具备了：

- ✅ **可扩展架构**: 支持轻松添加新组件
- ✅ **开发工具**: 自动化组件创建脚本
- ✅ **统一规范**: 完整的开发指南
- ✅ **构建系统**: 优化的打包配置
- ✅ **类型安全**: 完整的TypeScript支持

**恭喜！你的Vue 3组件库已经准备就绪，可以开始开发更多组件了！** 🚀
