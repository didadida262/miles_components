/**
 * @miles-wang/vue-components
 * A high-quality Vue 3 component library with TypeScript support
 */

import type { App } from 'vue'
import { registerComponents } from './components'

// 引入样式文件
import './styles/index.css'

// 导出所有组件
export * from './components'

// 导出工具函数
export * from './utils'

// 导出类型
export * from './types'

// 组件注册函数
export function install(app: App) {
  // 注册所有组件
  registerComponents(app)
}

// 默认导出
export default {
  install
}