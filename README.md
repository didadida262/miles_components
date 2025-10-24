# @miles-wang/vue-components

A high-quality Vue 3 component library with TypeScript support, built for modern web applications.

[![npm version](https://badge.fury.io/js/%40miles-wang%2Fvue-components.svg)](https://badge.fury.io/js/%40miles-wang%2Fvue-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)

## ✨ Features

- 🎨 **Beautiful Design**: Modern, clean UI with smooth animations
- 🔧 **TypeScript Support**: Full type definitions and IntelliSense
- 📱 **Responsive**: Works perfectly on all screen sizes
- 🎯 **Accessible**: Built with accessibility in mind
- 🚀 **Lightweight**: Optimized bundle size
- 🎨 **Customizable**: Easy to theme and customize
- 📦 **Tree-shakable**: Only import what you need
- 🔄 **Vue 3 Compatible**: Built for Vue 3 Composition API

## 📦 Installation

```bash
npm install miles-wang-vue-components
# or
yarn add miles-wang-vue-components
# or
pnpm add miles-wang-vue-components
```

## 🚀 Quick Start

### Global Installation

```javascript
// main.js
import { createApp } from 'vue'
import VueComponents from 'miles-wang-vue-components'
import App from './App.vue'

const app = createApp(App)
app.use(VueComponents)
app.mount('#app')
```

### Basic Usage

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
import { TaskCard } from 'miles-wang-vue-components'
</script>
```

### With Click Handler

```vue
<template>
  <TaskCard
    title="待处理"
    tag="审批"
    :number="12"
    unit="项"
    icon-type="task"
    :clickable="true"
    @click="handleCardClick"
  />
</template>

<script setup>
import { TaskCard } from 'miles-wang-vue-components'

const handleCardClick = (data) => {
  console.log('Card clicked:', data)
}
</script>
```

## 📚 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Card title (required) |
| `tag` | `string` | - | Tag text (required) |
| `number` | `number \| string` | - | Number value (required) |
| `unit` | `string` | - | Unit text (required) |
| `iconType` | `IconType` | `'clipboard'` | Icon type |
| `clickable` | `boolean` | `false` | Whether the card is clickable |
| `customClass` | `string` | `''` | Custom CSS class |
| `clickData` | `any` | `undefined` | Data passed to click event |

### Events

| Event | Description | Parameters |
|-------|-------------|------------|
| `click` | Fired when card is clicked | `(data?: any)` |

### Icon Types

| Value | Description | Use Case |
|-------|-------------|----------|
| `clipboard` | Clipboard icon | Documents, forms |
| `shopping-cart` | Shopping cart icon | Shopping, purchases |
| `folder` | Folder icon | File management, tasks |
| `document` | Document icon | Files, reports |
| `calendar` | Calendar icon | Schedules, events |
| `task` | Task icon | Todo items, tasks |

## 🎨 Examples

### Dashboard Layout

```vue
<template>
  <div class="dashboard">
    <div class="card-grid">
      <TaskCard
        title="待分配"
        tag="请购单"
        :number="5"
        unit="张"
        icon-type="clipboard"
        :clickable="true"
        @click="handlePurchaseClick"
      />
      
      <TaskCard
        title="待审核"
        tag="采购单"
        :number="6"
        unit="张"
        icon-type="shopping-cart"
        :clickable="true"
        @click="handleProcurementClick"
      />
      
      <TaskCard
        title="日程"
        tag="我的任务"
        :number="8"
        unit="笔"
        icon-type="folder"
        :clickable="true"
        @click="handleTaskClick"
      />
    </div>
  </div>
</template>

<script setup>
import { TaskCard } from '@miles-wang/task-card'

const handlePurchaseClick = () => {
  // Handle purchase click
}

const handleProcurementClick = () => {
  // Handle procurement click
}

const handleTaskClick = () => {
  // Handle task click
}
</script>

<style scoped>
.dashboard {
  padding: 20px;
  background: #f7f7fa;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
</style>
```

### Different Icon Types

```vue
<template>
  <div class="icon-showcase">
    <TaskCard
      title="文档"
      tag="文件"
      :number="15"
      unit="个"
      icon-type="document"
    />
    
    <TaskCard
      title="日程"
      tag="会议"
      :number="3"
      unit="场"
      icon-type="calendar"
    />
    
    <TaskCard
      title="任务"
      tag="待办"
      :number="9"
      unit="项"
      icon-type="task"
    />
  </div>
</template>

<script setup>
import { TaskCard } from '@miles-wang/task-card'
</script>
```

## 🎨 Customization

### CSS Variables

You can customize the component appearance using CSS variables:

```css
.task-card {
  --card-padding: 24px;
  --card-radius: 16px;
  --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  --card-hover-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}
```

### Theme Customization

```vue
<style>
:root {
  --task-card-primary: #8B5CF6;
  --task-card-text-primary: #1F2937;
  --task-card-text-secondary: #6B7280;
  --task-card-bg-white: #ffffff;
  --task-card-bg-gray: #F3F4F6;
}
</style>
```

## 🔧 Development

### Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0

### Setup

```bash
# Clone the repository
git clone https://github.com/miles-wang/vue-components.git
cd vue-components

# Install dependencies
npm install

# Start development
npm run dev
```

### Create New Component

```bash
# 创建新组件
node scripts/create-component.js Button

# 创建输入框组件
node scripts/create-component.js Input

# 创建模态框组件
node scripts/create-component.js Modal
```

### Build

```bash
# Build the library
npm run build

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📝 Changelog

### v1.0.0

- ✨ Initial release
- 🎨 Beautiful TaskCard component
- 🔧 TypeScript support
- 📱 Responsive design
- 🎯 Accessibility features
- 🚀 Optimized bundle size

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Vue.js team for the amazing framework
- TypeScript team for excellent type system
- All contributors and users

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Contact us at miles.wang@example.com

---

Made with ❤️ by [Miles Wang](https://github.com/miles-wang)