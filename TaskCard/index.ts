/**
 * TaskCard 组件入口文件
 * 提供统一的导出接口
 */

// 导出主组件
export { default as TaskCard } from './TaskCard.vue'

// 导出演示组件
export { default as TaskCardDemo } from './TaskCardDemo.vue'

// 导出类型定义
export * from './TaskCard.types'

// 导出配置
export * from './config'

// 导出组件类型（用于TypeScript）
export type { TaskCardProps, TaskCardEmits, IconType } from './TaskCard.types'
