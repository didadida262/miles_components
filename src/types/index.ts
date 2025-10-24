/**
 * 通用类型定义
 */

// 基础类型
export type Size = 'small' | 'medium' | 'large'
export type Theme = 'light' | 'dark'
export type Variant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'

// 组件基础属性
export interface BaseComponentProps {
  /** 组件大小 */
  size?: Size
  /** 是否禁用 */
  disabled?: boolean
  /** 自定义类名 */
  customClass?: string
  /** 自定义样式 */
  customStyle?: string | Record<string, any>
}

// 事件处理器类型
export type EventHandler<T = any> = (event: T) => void
export type AsyncEventHandler<T = any> = (event: T) => Promise<void>

// 组件事件接口
export interface BaseComponentEmits {
  /** 点击事件 */
  click?: EventHandler<MouseEvent>
  /** 鼠标进入事件 */
  mouseenter?: EventHandler<MouseEvent>
  /** 鼠标离开事件 */
  mouseleave?: EventHandler<MouseEvent>
  /** 焦点事件 */
  focus?: EventHandler<FocusEvent>
  /** 失焦事件 */
  blur?: EventHandler<FocusEvent>
}

// 表单组件基础属性
export interface FormComponentProps extends BaseComponentProps {
  /** 表单值 */
  modelValue?: any
  /** 是否必填 */
  required?: boolean
  /** 占位符 */
  placeholder?: string
  /** 错误信息 */
  error?: string
  /** 帮助文本 */
  help?: string
}

// 表单组件事件
export interface FormComponentEmits extends BaseComponentEmits {
  /** 值变化事件 */
  'update:modelValue'?: (value: any) => void
  /** 输入事件 */
  input?: EventHandler<Event>
  /** 变化事件 */
  change?: EventHandler<Event>
  /** 验证事件 */
  validate?: (valid: boolean) => void
}

// 位置类型
export type Position = 'top' | 'bottom' | 'left' | 'right' | 'center'
export type Alignment = 'start' | 'center' | 'end' | 'stretch'

// 动画类型
export type AnimationType = 'fade' | 'slide' | 'zoom' | 'bounce' | 'none'
export type AnimationDirection = 'up' | 'down' | 'left' | 'right'

// 响应式断点
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

// 颜色类型
export type Color = 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info'
  | string

// 图标类型
export type BaseIconType = string
export type IconPosition = 'left' | 'right' | 'top' | 'bottom'

// 加载状态
export interface LoadingState {
  loading: boolean
  text?: string
}

// 分页类型
export interface Pagination {
  current: number
  pageSize: number
  total: number
  showSizeChanger?: boolean
  showQuickJumper?: boolean
}

// 选项类型
export interface Option<T = any> {
  label: string
  value: T
  disabled?: boolean
  children?: Option<T>[]
}

// 树形数据
export interface TreeNode<T = any> {
  key: string | number
  title: string
  children?: TreeNode<T>[]
  disabled?: boolean
  expanded?: boolean
  selected?: boolean
  data?: T
}

// 表格列定义
export interface TableColumn<T = any> {
  key: string
  title: string
  dataIndex?: keyof T
  width?: number | string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  filterable?: boolean
  render?: (value: any, record: T, index: number) => any
}

// 菜单项
export interface MenuItem {
  key: string
  title: string
  icon?: string
  path?: string
  children?: MenuItem[]
  disabled?: boolean
  hidden?: boolean
}

// 面包屑
export interface BreadcrumbItem {
  title: string
  path?: string
  icon?: string
}

// 步骤
export interface StepItem {
  title: string
  description?: string
  status?: 'wait' | 'process' | 'finish' | 'error'
  icon?: string
}

// 标签页
export interface TabItem {
  key: string
  title: string
  content?: any
  disabled?: boolean
  closable?: boolean
}

// 通知类型
export interface NotificationOptions {
  title?: string
  message: string
  type?: 'success' | 'warning' | 'error' | 'info'
  duration?: number
  position?: Position
  closable?: boolean
}

// 确认对话框
export interface ConfirmOptions {
  title?: string
  content: string
  type?: 'warning' | 'error' | 'info'
  okText?: string
  cancelText?: string
  onOk?: () => void | Promise<void>
  onCancel?: () => void
}

// 工具提示
export interface TooltipOptions {
  content: string
  placement?: Position
  trigger?: 'hover' | 'click' | 'focus'
  delay?: number
  disabled?: boolean
}

// 弹出层
export interface PopoverOptions {
  content: any
  placement?: Position
  trigger?: 'hover' | 'click' | 'focus' | 'manual'
  visible?: boolean
  disabled?: boolean
  offset?: number
}

// 组件实例类型
export interface ComponentInstance {
  $el: HTMLElement
  $props: Record<string, any>
  $emit: (event: string, ...args: any[]) => void
  $nextTick: (callback?: () => void) => Promise<void>
}

// 插件类型
export interface Plugin {
  install: (app: any, options?: any) => void
  name?: string
}

// 主题配置
export interface ThemeConfig {
  primaryColor: string
  successColor: string
  warningColor: string
  errorColor: string
  infoColor: string
  borderRadius: string
  fontSize: Record<Size, string>
  spacing: Record<Size, string>
  shadow: Record<Size, string>
}

// 国际化
export interface LocaleConfig {
  locale: string
  messages: Record<string, any>
}

// 路由配置
export interface RouteConfig {
  path: string
  name?: string
  component?: any
  children?: RouteConfig[]
  meta?: Record<string, any>
}
