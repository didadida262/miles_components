# LineChart 折线图组件

一个功能丰富的折线图组件，支持数据验证、交互事件等。

## 基础用法

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

## LineChartCard - 简化版本

对于只需要一个图表组件的场景，推荐使用 `LineChartCard`，它提供了更简洁的配置方式。

### 使用方法

```vue
<template>
  <LineChartCard
    :chart-data="completeChartData"
    :width="800"
    :height="400"
  />
</template>

<script setup>
import { ref } from 'vue'
import { LineChartCard } from 'miles-wang-vue-components'
import type { CompleteChartData } from 'miles-wang-vue-components'

const completeChartData = ref<CompleteChartData>({
  title: '库存周转率趋势',
  subtitle: '(最近12个月)',
  data: [
    { x: '2024-01', y: 4.2 },
    { x: '2024-02', y: 4.4 },
    { x: '2024-03', y: 3.7 },
    { x: '2024-04', y: 4.0 }
  ],
  xAxisLabel: '月份',
  yAxisLabel: '周转率',
  yAxis: {
    min: 0,
    max: 6,
    step: 1
  },
  style: {
    lineColor: '#A0A0FF',
    dotColor: '#FFFFFF',
    strokeWidth: 3,
    dotSize: 6
  },
  display: {
    showGrid: true,
    showDots: true,
    showShadow: true
  }
})
</script>
```

### CompleteChartData 配置说明

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | `string` | ✅ | 图表标题 |
| `subtitle` | `string` | ❌ | 图表副标题 |
| `data` | `DataPoint[]` | ✅ | 图表数据 |
| `xAxisLabel` | `string` | ❌ | X轴标签 |
| `yAxisLabel` | `string` | ❌ | Y轴标签 |
| `yAxis.min` | `number` | ❌ | Y轴最小值 |
| `yAxis.max` | `number` | ❌ | Y轴最大值 |
| `yAxis.step` | `number` | ❌ | Y轴步长 |
| `style.lineColor` | `string` | ❌ | 线条颜色 |
| `style.dotColor` | `string` | ❌ | 数据点颜色 |
| `style.strokeWidth` | `number` | ❌ | 线条宽度 |
| `style.dotSize` | `number` | ❌ | 数据点大小 |
| `display.showGrid` | `boolean` | ❌ | 是否显示网格线 |
| `display.showDots` | `boolean` | ❌ | 是否显示数据点 |
| `display.showShadow` | `boolean` | ❌ | 是否显示阴影效果 |

### 优势

- ✅ **更简洁的配置**：所有配置集中在一个对象中
- ✅ **更好的可读性**：配置结构清晰，易于理解
- ✅ **完整的封装**：包含标题、副标题、图表等所有元素
- ✅ **类型安全**：完整的 TypeScript 类型支持

## Props

### LineChart Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `data` | `DataPoint[]` | - | 图表数据（必填） |
| `config` | `ChartConfig` | - | 图表配置 |
| `width` | `number` | `400` | 图表宽度 |
| `height` | `number` | `300` | 图表高度 |
| `autoWidth` | `boolean` | `false` | 是否自动适应容器宽度 |
| `autoHeight` | `boolean` | `false` | 是否自动适应容器高度 |
| `clickable` | `boolean` | `false` | 是否可点击 |
| `clickData` | `any` | - | 点击事件传递的数据 |
| `enableValidation` | `boolean` | `true` | 是否启用数据验证 |
| `customValidator` | `function` | - | 自定义验证函数 |

### LineChartCard Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `chartData` | `CompleteChartData` | - | 完整的图表配置数据（必填） |
| `width` | `number` | `800` | 图表宽度 |
| `height` | `number` | `400` | 图表高度 |
| `autoWidth` | `boolean` | `false` | 是否自动适应容器宽度 |
| `autoHeight` | `boolean` | `false` | 是否自动适应容器高度 |
| `clickable` | `boolean` | `false` | 是否可点击 |
| `clickData` | `any` | - | 点击事件传递的数据 |
| `enableValidation` | `boolean` | `true` | 是否启用数据验证 |
| `customValidator` | `function` | - | 自定义验证函数 |

## Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| `click` | 图表被点击时触发 | `data?: any` |
| `pointClick` | 数据点被点击时触发 | `point: DataPoint, index: number` |
| `validationError` | 数据验证失败时触发 | `errors: string[]` |

## 选择哪个组件？

- **LineChart**：适合需要灵活配置的场景，可以分别配置数据和图表样式
- **LineChartCard**：适合快速开发，配置更简洁，适合大多数场景

## 示例

查看 `playground/src/App.vue` 获取更多示例。
