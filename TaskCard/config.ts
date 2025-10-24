/**
 * TaskCard 组件配置文件
 * 包含组件的默认配置和常量定义
 */

import type { IconType } from './TaskCard.types'

// 默认配置
export const DEFAULT_CONFIG = {
  // 默认图标类型
  defaultIconType: 'clipboard' as IconType,
  
  
  // 是否默认可点击
  defaultClickable: false,
  
  // 动画持续时间
  animationDuration: '0.3s',
  
  // 悬停时的上移距离
  hoverTranslateY: '-2px',
  
  // 卡片最小高度
  minHeight: '120px',
  
  // 卡片内边距
  padding: '20px',
  
  // 卡片圆角
  borderRadius: '12px'
} as const

// 图标配置映射
export const ICON_CONFIG_MAP = {
  clipboard: {
    name: '剪贴板',
    description: '用于表示文档、请购单等文档类型',
    color: '#8B5CF6'
  },
  'shopping-cart': {
    name: '购物车',
    description: '用于表示采购、购物等商业活动',
    color: '#8B5CF6'
  },
  folder: {
    name: '文件夹',
    description: '用于表示任务、文件管理等',
    color: '#8B5CF6'
  },
  document: {
    name: '文档',
    description: '用于表示文档、文件等',
    color: '#8B5CF6'
  },
  calendar: {
    name: '日历',
    description: '用于表示日程、时间相关',
    color: '#8B5CF6'
  },
  task: {
    name: '任务',
    description: '用于表示待办、任务列表等',
    color: '#8B5CF6'
  }
} as const


// 颜色主题
export const COLOR_THEME = {
  // 文字颜色
  text: {
    primary: '#1F2937',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    white: '#ffffff'
  },
  
  // 背景颜色
  background: {
    white: '#ffffff',
    gray: '#F3F4F6',
    lightGray: '#f8fafc'
  },
  
  // 渐变色
  gradients: {
    normal: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.28) 100%)',
    hover: 'linear-gradient(135deg, #A0A0FF 0%, #5D78FF 100%)'
  },
  
  // 阴影
  shadows: {
    default: '0 2px 8px rgba(0, 0, 0, 0.06)',
    hover: '0 8px 24px rgba(0, 0, 0, 0.12)'
  }
} as const

// 响应式断点
export const BREAKPOINTS = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1280px'
} as const
