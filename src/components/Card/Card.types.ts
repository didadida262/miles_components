/**
 * Card 组件类型定义
 */

// 组件Props接口
export interface CardProps {
  /** 组件大小 */
  size?: 'small' | 'medium' | 'large'
  /** 组件变体 */
  variant?: 'default' | 'primary' | 'secondary'
  /** 是否禁用 */
  disabled?: boolean
  /** 组件内容 */
  content?: string
  /** 自定义类名 */
  customClass?: string
  /** 自定义样式 */
  customStyle?: string | Record<string, any>
}

// 组件事件接口
export interface CardEmits {
  /** 点击事件 */
  (e: 'click', event: MouseEvent): void
}

// 组件配置类型
export interface CardConfig {
  // 配置项
  defaultSize: 'small' | 'medium' | 'large'
  defaultVariant: 'default' | 'primary' | 'secondary'
}