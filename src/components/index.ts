/**
 * 组件注册系统
 */

import type { App } from 'vue'

// 注册所有组件
export function registerComponents(app: App) {
  // 注册TaskCard组件
  app.component('TaskCard', () => import('./TaskCard/TaskCard.vue'))
  app.component('TaskCardDemo', () => import('./TaskCard/TaskCardDemo.vue'))
}

// 按需注册组件
export function registerComponent(app: App, name: string) {
  switch (name) {
    case 'TaskCard':
      app.component('TaskCard', () => import('./TaskCard/TaskCard.vue'))
      break
    case 'TaskCardDemo':
      app.component('TaskCardDemo', () => import('./TaskCard/TaskCardDemo.vue'))
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
