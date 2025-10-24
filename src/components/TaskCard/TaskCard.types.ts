/**
 * TaskCard 组件类型定义
 */

// 图标类型枚举
export type IconType = 
  | 'clipboard'      // 剪贴板图标（请购单）
  | 'shopping-cart'  // 购物车图标（采购单）
  | 'folder'         // 文件夹图标（我的任务）
  | 'document'       // 文档图标
  | 'calendar'       // 日历图标
  | 'task'           // 任务图标


// 组件Props接口
export interface TaskCardProps {
  /** 卡片标题 */
  title: string
  /** 标签文本 */
  tag: string
  /** 数字值 */
  number: number | string
  /** 单位文本 */
  unit: string
  /** 图标类型 */
  iconType?: IconType
  /** 是否可点击 */
  clickable?: boolean
  /** 自定义类名 */
  customClass?: string
  /** 点击事件数据 */
  clickData?: any
}

// 组件事件接口
export interface TaskCardEmits {
  (e: 'click', data?: any): void
}

// 图标配置映射
export const ICON_CONFIG = {
  clipboard: {
    name: '剪贴板',
    description: '用于表示文档、请购单等文档类型'
  },
  'shopping-cart': {
    name: '购物车',
    description: '用于表示采购、购物等商业活动'
  },
  folder: {
    name: '文件夹',
    description: '用于表示任务、文件管理等'
  },
  document: {
    name: '文档',
    description: '用于表示文档、文件等'
  },
  calendar: {
    name: '日历',
    description: '用于表示日程、时间相关'
  },
  task: {
    name: '任务',
    description: '用于表示待办、任务列表等'
  }
} as const

