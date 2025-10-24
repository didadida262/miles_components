# TaskCard 组件使用指南

## 📁 文件结构

```
TaskCard/
├── TaskCard.vue          # 主组件
├── TaskCardDemo.vue       # 演示组件
├── TaskCard.types.ts      # 类型定义
├── config.ts             # 配置文件
├── index.ts              # 入口文件
├── package.json          # 组件包信息
├── README.md             # 详细文档
└── USAGE.md              # 使用指南（本文件）
```

## 🚀 快速开始

### 1. 导入组件

```typescript
// 方式1：从组件目录导入
import { TaskCard } from '@renderer/components/TaskCard'

// 方式2：从具体文件导入
import TaskCard from '@renderer/components/TaskCard/TaskCard.vue'
```

### 2. 基础使用

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
```

### 3. 高级使用

```vue
<template>
  <ItemCard
    title="日程"
    tag="我的任务"
    :number="8"
    unit="笔"
    icon-type="folder"
    variant="highlight"
    :clickable="true"
    @click="handleCardClick"
  />
</template>

<script setup>
const handleCardClick = (data) => {
  console.log('卡片被点击:', data)
}
</script>
```

## 🎨 样式定制

### 1. 使用配置常量

```typescript
import { DEFAULT_CONFIG, COLOR_THEME } from '@renderer/components/ItemCard'

// 使用默认配置
const config = DEFAULT_CONFIG

// 使用颜色主题
const primaryColor = COLOR_THEME.text.primary
```

### 2. 自定义样式

```vue
<style>
.custom-item-card {
  --card-padding: 24px;
  --card-radius: 16px;
  --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
```

## 🔧 开发指南

### 1. 添加新图标类型

1. 在 `ItemCard.types.ts` 中添加新的图标类型
2. 在 `ItemCard.vue` 中实现对应的图标组件
3. 在 `config.ts` 中添加图标配置

### 2. 添加新变体

1. 在 `ItemCard.types.ts` 中定义新的变体类型
2. 在 `ItemCard.vue` 中添加对应的样式
3. 在 `config.ts` 中添加变体配置

### 3. 测试组件

```vue
<template>
  <ItemCardDemo />
</template>

<script setup>
import { ItemCardDemo } from '@renderer/components/ItemCard'
</script>
```

## 📦 组件特性

- ✅ **完全隔离**：所有相关文件都在独立文件夹中
- ✅ **类型安全**：完整的TypeScript类型定义
- ✅ **配置化**：支持自定义配置和主题
- ✅ **可扩展**：易于添加新功能和样式
- ✅ **文档完整**：包含详细的使用文档和示例

## 🔗 相关文件

- `ItemCard.vue` - 主组件实现
- `ItemCard.types.ts` - 类型定义
- `config.ts` - 配置和常量
- `README.md` - 详细文档
- `ItemCardDemo.vue` - 使用示例
