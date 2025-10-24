# Card 组件

## 功能特性

- ✅ **TypeScript支持**: 完整的类型定义
- ✅ **响应式设计**: 适配不同屏幕尺寸
- ✅ **多种变体**: 支持不同样式变体
- ✅ **多种尺寸**: 支持小、中、大三种尺寸
- ✅ **事件支持**: 支持点击等事件
- ✅ **可定制**: 支持自定义样式

## 基础用法

```vue
<template>
  <Card content="基础按钮" />
</template>

<script setup>
import { Card } from '@miles-wang/vue-components'
</script>
```

## Props 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| size | 'small' | 'medium' | 'large' | 'medium' | 组件大小 |
| variant | 'default' | 'primary' | 'secondary' | 'default' | 组件变体 |
| disabled | boolean | false | 是否禁用 |
| content | string | '' | 组件内容 |
| customClass | string | '' | 自定义类名 |
| customStyle | string | object | - | 自定义样式 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击事件 | (event: MouseEvent) |

## 使用示例

### 不同变体

```vue
<template>
  <Card content="默认按钮" />
  <Card content="主要按钮" variant="primary" />
  <Card content="次要按钮" variant="secondary" />
</template>
```

### 不同尺寸

```vue
<template>
  <Card content="小按钮" size="small" />
  <Card content="中等按钮" size="medium" />
  <Card content="大按钮" size="large" />
</template>
```

### 禁用状态

```vue
<template>
  <Card content="禁用按钮" disabled />
</template>
```

### 点击事件

```vue
<template>
  <Card 
    content="点击我" 
    @click="handleClick"
  />
</template>

<script setup>
const handleClick = (event) => {
  console.log('按钮被点击了', event)
}
</script>
```

## 样式定制

```css
.card {
  --primary-color: #1890ff;
  --border-radius: 4px;
  --font-size: 14px;
}
```