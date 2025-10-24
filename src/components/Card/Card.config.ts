/**
 * Card 组件配置
 */

import type { CardConfig } from './Card.types'

// 默认配置
export const DEFAULT_CONFIG: CardConfig = {
  defaultSize: 'medium',
  defaultVariant: 'default'
}

// 主题配置
export const THEME_CONFIG = {
  colors: {
    primary: '#1890ff',
    secondary: '#6c757d',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d'
  },
  sizes: {
    small: {
      fontSize: '12px',
      padding: '4px 8px'
    },
    medium: {
      fontSize: '14px',
      padding: '8px 16px'
    },
    large: {
      fontSize: '16px',
      padding: '12px 24px'
    }
  }
} as const