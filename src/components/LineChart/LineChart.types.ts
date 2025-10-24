/**
 * LineChart 组件类型定义
 */

// 数据点接口
export interface DataPoint {
  /** X轴值（必须是字符串，支持日期格式：YYYY-MM, YYYY-MM-DD, MM-DD等） */
  x: string
  /** Y轴值（必须是有效数字） */
  y: number
  /** 可选的标签 */
  label?: string
  /** 可选的工具提示内容 */
  tooltip?: string
}

// 数据验证结果
export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

// 图表配置接口
export interface ChartConfig {
  /** 图表标题 */
  title: string
  /** 图表副标题 */
  subtitle?: string
  /** X轴标签 */
  xAxisLabel?: string
  /** Y轴标签 */
  yAxisLabel?: string
  /** Y轴最小值 */
  yMin?: number
  /** Y轴最大值 */
  yMax?: number
  /** Y轴步长 */
  yStep?: number
  /** 是否显示网格线 */
  showGrid?: boolean
  /** 是否显示数据点 */
  showDots?: boolean
  /** 线条颜色 */
  lineColor?: string
  /** 数据点颜色 */
  dotColor?: string
  /** 线条宽度 */
  strokeWidth?: number
  /** 数据点大小 */
  dotSize?: number
  /** 是否显示阴影效果 */
  showShadow?: boolean
}

// 组件Props接口
export interface LineChartProps {
  /** 图表数据（必须是非空数组） */
  data: DataPoint[]
  /** 图表配置 */
  config?: ChartConfig
  /** 图表宽度 */
  width?: number
  /** 图表高度 */
  height?: number
  /** 是否可点击 */
  clickable?: boolean
  /** 点击事件数据 */
  clickData?: any
  /** 是否启用数据验证 */
  enableValidation?: boolean
  /** 自定义验证函数 */
  customValidator?: (data: DataPoint[]) => ValidationResult
}

// 组件事件接口
export interface LineChartEmits {
  (e: 'click', data?: any): void
  (e: 'pointClick', point: DataPoint, index: number): void
  (e: 'validationError', errors: string[]): void
}
