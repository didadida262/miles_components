# TaskCard 组件

一个基于 UI 设计图实现的高质量卡片组件，用于展示数据统计信息。

## 功能特性

- ✅ **严格类型定义**：完整的 TypeScript 类型支持
- ✅ **多种图标类型**：支持 6 种不同的 3D 图标
- ✅ **多种变体样式**：默认、高亮、主要三种样式
- ✅ **交互支持**：支持点击事件和悬停效果
- ✅ **响应式设计**：适配不同屏幕尺寸
- ✅ **无障碍访问**：良好的语义化结构

## 基础用法

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
import TaskCard from '@/components/TaskCard.vue'
</script>
```

## Props 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | string | - | 卡片标题（必填） |
| tag | string | - | 标签文本（必填） |
| number | number \| string | - | 数字值（必填） |
| unit | string | - | 单位文本（必填） |
| iconType | IconType | 'clipboard' | 图标类型 |
| variant | CardVariant | 'default' | 卡片变体样式 |
| clickable | boolean | false | 是否可点击 |
| customClass | string | '' | 自定义类名 |
| clickData | any | undefined | 点击事件数据 |

## 图标类型 (IconType)

| 值 | 说明 | 适用场景 |
|---|------|----------|
| clipboard | 剪贴板图标 | 请购单、文档类 |
| shopping-cart | 购物车图标 | 采购单、商业活动 |
| folder | 文件夹图标 | 任务管理、文件管理 |
| document | 文档图标 | 文档、文件 |
| calendar | 日历图标 | 日程、时间相关 |
| task | 任务图标 | 待办、任务列表 |

## 变体样式 (CardVariant)

| 值 | 说明 | 样式特点 |
|---|------|----------|
| default | 默认样式 | 白色背景，深色文字 |
| highlight | 高亮样式 | 紫色渐变背景，白色文字 |
| primary | 主要样式 | 蓝色渐变背景，白色文字 |

## 使用示例

### 基础卡片

```vue
<ItemCard
  title="待分配"
  tag="请购单"
  :number="5"
  unit="张"
  icon-type="clipboard"
/>
```

### 高亮卡片

```vue
<ItemCard
  title="日程"
  tag="我的任务"
  :number="8"
  unit="笔"
  icon-type="folder"
  variant="highlight"
/>
```

### 可点击卡片

```vue
<template>
  <ItemCard
    title="待处理"
    tag="审批"
    :number="12"
    unit="项"
    icon-type="task"
    :clickable="true"
    click-data="{ type: 'pending', id: 1 }"
    @click="handleCardClick"
  />
</template>

<script setup>
const handleCardClick = (data) => {
  console.log('卡片被点击:', data)
  // 处理点击逻辑
}
</script>
```

### 不同图标类型

```vue
<!-- 文档类 -->
<ItemCard
  title="文档"
  tag="文件"
  :number="15"
  unit="个"
  icon-type="document"
/>

<!-- 日程类 -->
<ItemCard
  title="日程"
  tag="会议"
  :number="3"
  unit="场"
  icon-type="calendar"
/>

<!-- 任务类 -->
<ItemCard
  title="任务"
  tag="待办"
  :number="9"
  unit="项"
  icon-type="task"
/>
```

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 卡片点击事件 | (data?: any) |

## 样式定制

组件使用 CSS 变量，可以通过覆盖变量来自定义样式：

```css
.item-card {
  --card-padding: 20px;
  --card-radius: 12px;
  --card-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
```

## 注意事项

1. **必填参数**：`title`、`tag`、`number`、`unit` 为必填参数
2. **图标选择**：根据业务场景选择合适的图标类型
3. **变体使用**：高亮变体适用于重要信息，主要变体适用于主要操作
4. **点击事件**：只有设置 `clickable="true"` 时才会触发点击事件
5. **响应式**：组件会自动适配不同屏幕尺寸

## 完整示例

```vue
<template>
  <div class="dashboard">
    <div class="card-grid">
      <ItemCard
        title="待分配"
        tag="请购单"
        :number="5"
        unit="张"
        icon-type="clipboard"
        :clickable="true"
        @click="handlePurchaseClick"
      />
      
      <ItemCard
        title="待审核"
        tag="采购单"
        :number="6"
        unit="张"
        icon-type="shopping-cart"
        :clickable="true"
        @click="handleProcurementClick"
      />
      
      <ItemCard
        title="日程"
        tag="我的任务"
        :number="8"
        unit="笔"
        icon-type="folder"
        variant="highlight"
        :clickable="true"
        @click="handleTaskClick"
      />
    </div>
  </div>
</template>

<script setup>
import ItemCard from '@/components/ItemCard.vue'

const handlePurchaseClick = () => {
  // 处理请购单点击
  console.log('查看请购单')
}

const handleProcurementClick = () => {
  // 处理采购单点击
  console.log('查看采购单')
}

const handleTaskClick = () => {
  // 处理任务点击
  console.log('查看我的任务')
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
