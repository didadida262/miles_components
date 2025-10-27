/**
 * 组件注册系统
 */

import type { App } from 'vue'
import TaskCard from './TaskCard/TaskCard.vue'
import LineChart from './LineChart/LineChart.vue'
import LineChartCard from './LineChart/LineChartCard.vue'

// 注册所有组件
export function registerComponents(app: App) {
  // 注册TaskCard组件
  app.component('TaskCard', TaskCard)
  // 注册LineChart组件
  app.component('LineChart', LineChart)
  // 注册LineChartCard组件
  app.component('LineChartCard', LineChartCard)
}

// 按需注册组件
export function registerComponent(app: App, name: string) {
  switch (name) {
    case 'TaskCard':
      app.component('TaskCard', TaskCard)
      break
    case 'LineChart':
      app.component('LineChart', LineChart)
      break
    case 'LineChartCard':
      app.component('LineChartCard', LineChartCard)
      break
    default:
      console.warn(`Component ${name} not found`)
  }
}

// 导出所有组件
export { default as TaskCard } from './TaskCard/TaskCard.vue'
export { default as LineChart } from './LineChart/LineChart.vue'
export { default as LineChartCard } from './LineChart/LineChartCard.vue'

// 导出组件类型
export type { TaskCardProps, TaskCardEmits, IconType } from './TaskCard/TaskCard.types'
export type { LineChartProps, LineChartEmits, DataPoint, ChartConfig, CompleteChartData } from './LineChart/LineChart.types'
