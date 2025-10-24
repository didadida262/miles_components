/**
 * 组件注册系统
 */

import type { App } from 'vue'
import TaskCard from './TaskCard/TaskCard.vue'
import TaskCardDemo from './TaskCard/TaskCardDemo.vue'

// 注册所有组件
export function registerComponents(app: App) {
  // 注册TaskCard组件
  app.component('TaskCard', TaskCard)
  app.component('TaskCardDemo', TaskCardDemo)
}

// 按需注册组件
export function registerComponent(app: App, name: string) {
  switch (name) {
    case 'TaskCard':
      app.component('TaskCard', TaskCard)
      break
    case 'TaskCardDemo':
      app.component('TaskCardDemo', TaskCardDemo)
      break
    default:
      console.warn(`Component ${name} not found`)
  }
}

// 导出所有组件
export { default as TaskCard } from './TaskCard/TaskCard.vue'
export { default as TaskCardDemo } from './TaskCard/TaskCardDemo.vue'

// 导出组件类型
export type { TaskCardProps, TaskCardEmits, IconType } from './TaskCard/TaskCard.types'
