# @miles-wang/vue-components

一个高质量的 Vue 3 组件库，支持 TypeScript，专为现代 Web 应用构建。

[![npm version](https://badge.fury.io/js/%40miles-wang%2Fvue-components.svg)](https://badge.fury.io/js/%40miles-wang%2Fvue-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)

## ✨ 特性

- 🎨 **精美设计**: 现代化、简洁的 UI，流畅的动画效果
- 🔧 **TypeScript 支持**: 完整的类型定义和智能提示
- 📱 **响应式**: 在所有屏幕尺寸上完美工作
- 🎯 **无障碍**: 内置无障碍功能
- 🚀 **轻量级**: 优化的打包体积
- 🎨 **可定制**: 易于主题化和自定义
- 📦 **按需加载**: 只导入你需要的组件
- 🔄 **Vue 3 兼容**: 基于 Vue 3 Composition API 构建

## 📦 安装

```bash
npm install miles-wang-vue-components
# 或
yarn add miles-wang-vue-components
# 或
pnpm add miles-wang-vue-components
```

## 🚀 快速开始

### 全局安装

```javascript
// main.js
import { createApp } from 'vue'
import VueComponents from 'miles-wang-vue-components'
import App from './App.vue'

const app = createApp(App)
app.use(VueComponents)
app.mount('#app')
```

### 按需导入

```javascript
// 只导入需要的组件
import { TaskCard, LineChart } from 'miles-wang-vue-components'
```

## 📚 组件文档

### TaskCard 任务卡片组件

一个美观的任务卡片组件，适用于仪表板、统计展示等场景。

#### 基础用法

```vue
<template>
  <TaskCard
    title="待分配"
    tag="请购单"
    :number="5"
    unit="张"
    icon-type="pending"
  />
</template>

<script setup>
import { TaskCard } from 'miles-wang-vue-components'
</script>
```

#### 可点击卡片

```vue
<template>
  <TaskCard
    title="待处理"
    tag="审批"
    :number="12"
    unit="项"
    icon-type="purchase"
    :clickable="true"
    :click-data="{ id: 1, type: 'approval' }"
    @click="handleCardClick"
  />
</template>

<script setup>
import { TaskCard } from 'miles-wang-vue-components'

const handleCardClick = (data) => {
  console.log('卡片被点击:', data)
  // 处理点击逻辑
}
</script>
```

#### TaskCard Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | - | 卡片标题（必填） |
| `tag` | `string` | - | 标签文本（必填） |
| `number` | `number \| string` | - | 数字值（必填） |
| `unit` | `string` | - | 单位文本（必填） |
| `iconType` | `IconType` | `'pending'` | 图标类型 |
| `clickable` | `boolean` | `false` | 是否可点击 |
| `customClass` | `string` | `''` | 自定义 CSS 类名 |
| `clickData` | `any` | `undefined` | 点击事件传递的数据 |

#### TaskCard 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| `click` | 卡片被点击时触发 | `(data?: any)` |

#### 图标类型

| 值 | 说明 | 使用场景 |
|----|------|----------|
| `pending` | 待处理图标 | 待审核、待分配等 |
| `purchase` | 采购图标 | 请购单、采购单等 |
| `schedule` | 日程图标 | 会议、任务等 |

### LineChart 折线图组件

一个功能丰富的折线图组件，支持数据验证、交互事件等。

#### 基础用法

```vue
<template>
  <LineChart
    :data="chartData"
    :config="chartConfig"
    :width="800"
    :height="400"
  />
</template>

<script setup>
import { ref } from 'vue'
import { LineChart } from 'miles-wang-vue-components'
import type { DataPoint, ChartConfig } from 'miles-wang-vue-components'

const chartData = ref<DataPoint[]>([
  { x: '2024-01', y: 4.2 },
  { x: '2024-02', y: 4.4 },
  { x: '2024-03', y: 3.7 },
  { x: '2024-04', y: 4.0 }
])

const chartConfig = ref<ChartConfig>({
  title: '库存周转率趋势',
  subtitle: '(最近12个月)',
  xAxisLabel: '月份',
  yAxisLabel: '周转率',
  yMin: 0,
  yMax: 6,
  yStep: 1,
  showGrid: true,
  showDots: true,
  lineColor: '#A0A0FF',
  dotColor: '#FFFFFF',
  strokeWidth: 3,
  dotSize: 6,
  showShadow: true
})
</script>
```

#### 交互式图表

```vue
<template>
  <LineChart
    :data="chartData"
    :config="chartConfig"
    :width="800"
    :height="400"
    :clickable="true"
    :click-data="{ type: 'inventory-turnover' }"
    :enable-validation="true"
    @click="handleChartClick"
    @point-click="handlePointClick"
    @validation-error="handleValidationError"
  />
</template>

<script setup>
import { ref } from 'vue'
import { LineChart } from 'miles-wang-vue-components'
import type { DataPoint, ChartConfig } from 'miles-wang-vue-components'

// 图表数据
const chartData = ref<DataPoint[]>([
  { x: '2024-01', y: 4.2 },
  { x: '2024-02', y: 4.4 },
  { x: '2024-03', y: 3.7 },
  { x: '2024-04', y: 4.0 }
])

// 图表配置
const chartConfig = ref<ChartConfig>({
  title: '库存周转率趋势',
  subtitle: '(最近12个月)',
  xAxisLabel: '月份',
  yAxisLabel: '周转率',
  yMin: 0,
  yMax: 6,
  yStep: 1,
  showGrid: true,
  showDots: true,
  lineColor: '#A0A0FF',
  dotColor: '#FFFFFF',
  strokeWidth: 3,
  dotSize: 6,
  showShadow: true
})

// 处理图表点击
const handleChartClick = (data) => {
  console.log('图表被点击:', data)
}

// 处理数据点点击
const handlePointClick = (point, index) => {
  console.log('数据点被点击:', point, index)
  alert(`点击了数据点：\n时间：${point.x}\n数值：${point.y}`)
}

// 处理验证错误
const handleValidationError = (errors) => {
  console.error('数据验证错误:', errors)
  alert(`数据验证失败：\n${errors.join('\n')}`)
}
</script>
```

#### LineChart Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `data` | `DataPoint[]` | - | 图表数据（必填） |
| `config` | `ChartConfig` | - | 图表配置 |
| `width` | `number` | `800` | 图表宽度 |
| `height` | `number` | `400` | 图表高度 |
| `autoWidth` | `boolean` | `false` | 是否自动适应容器宽度 |
| `autoHeight` | `boolean` | `false` | 是否自动适应容器高度 |
| `clickable` | `boolean` | `false` | 是否可点击 |
| `clickData` | `any` | `undefined` | 点击事件数据 |
| `enableValidation` | `boolean` | `false` | 是否启用数据验证 |
| `customValidator` | `Function` | `undefined` | 自定义验证函数 |

#### LineChart 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| `click` | 图表被点击时触发 | `(data?: any)` |
| `pointClick` | 数据点被点击时触发 | `(point: DataPoint, index: number)` |
| `validationError` | 数据验证失败时触发 | `(errors: string[])` |

#### ChartConfig 配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | - | 图表标题 |
| `subtitle` | `string` | `''` | 图表副标题 |
| `xAxisLabel` | `string` | `''` | X轴标签 |
| `yAxisLabel` | `string` | `''` | Y轴标签 |
| `yMin` | `number` | `0` | Y轴最小值 |
| `yMax` | `number` | `10` | Y轴最大值 |
| `yStep` | `number` | `1` | Y轴步长 |
| `showGrid` | `boolean` | `true` | 是否显示网格线 |
| `showDots` | `boolean` | `true` | 是否显示数据点 |
| `lineColor` | `string` | `'#A0A0FF'` | 线条颜色 |
| `dotColor` | `string` | `'#FFFFFF'` | 数据点颜色 |
| `strokeWidth` | `number` | `3` | 线条宽度 |
| `dotSize` | `number` | `6` | 数据点大小 |
| `showShadow` | `boolean` | `true` | 是否显示阴影效果 |

## 🎨 使用示例

### 仪表板布局

```vue
<template>
  <div class="dashboard">
    <div class="card-grid">
      <TaskCard
        title="待分配"
        tag="请购单"
        :number="5"
        unit="张"
        icon-type="pending"
        :clickable="true"
        :click-data="{ id: 1, type: 'purchase' }"
        @click="handlePurchaseClick"
      />
      
      <TaskCard
        title="待审核"
        tag="采购单"
        :number="6"
        unit="张"
        icon-type="purchase"
        :clickable="true"
        :click-data="{ id: 2, type: 'procurement' }"
        @click="handleProcurementClick"
      />
      
      <TaskCard
        title="日程"
        tag="我的任务"
        :number="8"
        unit="笔"
        icon-type="schedule"
        :clickable="true"
        :click-data="{ id: 3, type: 'schedule' }"
        @click="handleTaskClick"
      />
    </div>
    
    <div class="chart-section">
      <LineChart
        :data="chartData"
        :config="chartConfig"
        :width="800"
        :height="350"
        :clickable="true"
        :click-data="{ type: 'inventory-turnover' }"
        @click="handleChartClick"
        @point-click="handlePointClick"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { TaskCard, LineChart } from 'miles-wang-vue-components'
import type { DataPoint, ChartConfig } from 'miles-wang-vue-components'

// 图表数据
const chartData = ref<DataPoint[]>([
  { x: '2024-01', y: 4.2 },
  { x: '2024-02', y: 4.4 },
  { x: '2024-03', y: 3.7 },
  { x: '2024-04', y: 4.0 },
  { x: '2024-05', y: 3.6 },
  { x: '2024-06', y: 4.6 }
])

// 图表配置
const chartConfig = ref<ChartConfig>({
  title: '库存周转率趋势',
  subtitle: '(最近6个月)',
  xAxisLabel: '月份',
  yAxisLabel: '周转率',
  yMin: 0,
  yMax: 6,
  yStep: 1,
  showGrid: true,
  showDots: true,
  lineColor: '#A0A0FF',
  dotColor: '#FFFFFF',
  strokeWidth: 3,
  dotSize: 6,
  showShadow: true
})

// 事件处理
const handlePurchaseClick = (data) => {
  console.log('请购单被点击:', data)
}

const handleProcurementClick = (data) => {
  console.log('采购单被点击:', data)
}

const handleTaskClick = (data) => {
  console.log('任务被点击:', data)
}

const handleChartClick = (data) => {
  console.log('图表被点击:', data)
}

const handlePointClick = (point, index) => {
  console.log('数据点被点击:', point, index)
}
</script>

<style scoped>
.dashboard {
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.chart-section {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
</style>
```

### 不同图标类型展示

```vue
<template>
  <div class="icon-showcase">
    <TaskCard
      title="待审核"
      tag="请购单"
      :number="7"
      unit="笔"
      icon-type="pending"
    />
    
    <TaskCard
      title="待分配"
      tag="请购单"
      :number="5"
      unit="张"
      icon-type="purchase"
    />
    
    <TaskCard
      title="文档"
      tag="文件"
      :number="15"
      unit="个"
      icon-type="schedule"
    />
  </div>
</template>

<script setup>
import { TaskCard } from 'miles-wang-vue-components'
</script>
```

### 自适应宽度示例

```vue
<template>
  <div class="chart-wrapper">
    <LineChart
      :data="chartData"
      :config="chartConfig"
      :height="400"
      :auto-width="true"
      :enable-validation="true"
      @validation-error="handleValidationError"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { LineChart } from 'miles-wang-vue-components'
import type { DataPoint, ChartConfig } from 'miles-wang-vue-components'

const chartData = ref<DataPoint[]>([
  { x: '2024-01', y: 4.2 },
  { x: '2024-02', y: 4.4 },
  { x: '2024-03', y: 3.7 },
  { x: '2024-04', y: 4.0 }
])

const chartConfig = ref<ChartConfig>({
  title: '自适应宽度图表',
  subtitle: '(自动适应容器宽度)',
  xAxisLabel: '月份',
  yAxisLabel: '数值',
  yMin: 0,
  yMax: 6,
  yStep: 1,
  showGrid: true,
  showDots: true,
  lineColor: '#A0A0FF',
  dotColor: '#FFFFFF',
  strokeWidth: 3,
  dotSize: 6,
  showShadow: true
})

const handleValidationError = (errors) => {
  console.error('数据验证错误:', errors)
}
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
```

### 数据验证示例

```vue
<template>
  <LineChart
    :data="chartData"
    :config="chartConfig"
    :width="800"
    :height="400"
    :enable-validation="true"
    @validation-error="handleValidationError"
  />
</template>

<script setup>
import { ref } from 'vue'
import { LineChart } from 'miles-wang-vue-components'
import type { DataPoint, ChartConfig } from 'miles-wang-vue-components'

// 包含无效数据的图表数据
const chartData = ref<DataPoint[]>([
  { x: '2024-01', y: 4.2 },
  { x: '2024-02', y: 4.4 },
  { x: '2024-03', y: 3.7 },
  { x: '2024-04', y: 4.0 },
  { x: '2024-05', y: 3.6 },
  { x: '2024-06', y: 4.6 }
])

const chartConfig = ref<ChartConfig>({
  title: '库存周转率趋势',
  subtitle: '(最近6个月)',
  xAxisLabel: '月份',
  yAxisLabel: '周转率',
  yMin: 0,
  yMax: 6,
  yStep: 1,
  showGrid: true,
  showDots: true,
  lineColor: '#A0A0FF',
  dotColor: '#FFFFFF',
  strokeWidth: 3,
  dotSize: 6,
  showShadow: true
})

const handleValidationError = (errors) => {
  console.error('数据验证错误:', errors)
  // 可以显示错误提示给用户
  alert(`数据验证失败：\n${errors.join('\n')}`)
}
</script>
```

## 🎨 自定义主题

### CSS 变量

你可以使用 CSS 变量来自定义组件外观：

```css
/* TaskCard 组件自定义 */
.task-card {
  --card-padding: 24px;
  --card-radius: 16px;
  --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  --card-hover-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  --card-bg: #ffffff;
  --card-hover-bg: #f8fafc;
}

/* LineChart 组件自定义 */
.line-chart {
  --chart-bg: #ffffff;
  --chart-border: #e5e7eb;
  --chart-text: #374151;
  --chart-grid: #f3f4f6;
}
```

### 主题定制

```vue
<style>
:root {
  /* TaskCard 主题变量 */
  --task-card-primary: #8B5CF6;
  --task-card-text-primary: #1F2937;
  --task-card-text-secondary: #6B7280;
  --task-card-bg-white: #ffffff;
  --task-card-bg-gray: #F3F4F6;
  
  /* LineChart 主题变量 */
  --line-chart-primary: #A0A0FF;
  --line-chart-secondary: #FFFFFF;
  --line-chart-grid: #F3F4F6;
  --line-chart-text: #374151;
}
</style>
```

### 响应式设计

```vue
<template>
  <div class="responsive-dashboard">
    <div class="card-grid">
      <TaskCard
        v-for="card in cards"
        :key="card.id"
        v-bind="card"
        :class="getCardClass()"
      />
    </div>
    
    <div class="chart-container">
      <LineChart
        :data="chartData"
        :config="chartConfig"
        :width="chartWidth"
        :height="chartHeight"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { TaskCard, LineChart } from 'miles-wang-vue-components'

const containerWidth = ref(0)

const chartWidth = computed(() => {
  return Math.max(600, containerWidth.value - 100)
})

const chartHeight = computed(() => {
  return Math.min(400, window.innerHeight * 0.4)
})

const getCardClass = () => {
  return containerWidth.value < 768 ? 'card-mobile' : 'card-desktop'
}

const updateWidth = () => {
  const container = document.querySelector('.responsive-dashboard')
  if (container) {
    containerWidth.value = container.clientWidth
  }
}

onMounted(() => {
  updateWidth()
  window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})
</script>

<style scoped>
.responsive-dashboard {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.chart-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
}

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .chart-container {
    padding: 16px;
  }
}
</style>
```

## 🔧 开发指南

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/miles-wang/vue-components.git
cd vue-components

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 启动演示页面
npm run playground
```

### 创建新组件

```bash
# 创建新组件
node scripts/create-component.js Button

# 创建输入框组件
node scripts/create-component.js Input

# 创建模态框组件
node scripts/create-component.js Modal
```

### 构建和发布

```bash
# 构建库
npm run build

# 类型检查
npm run type-check

# 代码检查
npm run lint

# 发布到 npm
npm run publish
```

## 📝 更新日志

### v1.0.9

- ✨ 新增 LineChart 折线图组件
- 🎨 优化 TaskCard 组件样式
- 🔧 修复 TypeScript 类型定义
- 📱 改进响应式设计
- 🎯 增强无障碍功能
- 🚀 优化打包体积

### v1.0.0

- ✨ 初始版本发布
- 🎨 精美的 TaskCard 组件
- 🔧 TypeScript 支持
- 📱 响应式设计
- 🎯 无障碍功能
- 🚀 优化的打包体积

## 🤝 贡献指南

欢迎贡献代码！请随时提交 Pull Request。

1. Fork 仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目基于 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- Vue.js 团队提供的优秀框架
- TypeScript 团队提供的类型系统
- 所有贡献者和用户

## 📞 支持

如有问题或需要帮助，请：

- 在 GitHub 上创建 issue
- 联系我们：miles.wang@example.com

---

由 [Miles Wang](https://github.com/miles-wang) 用 ❤️ 制作

npm 包地址：https://www.npmjs.com/package/miles-wang-vue-components
