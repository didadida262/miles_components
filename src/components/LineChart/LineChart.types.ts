/**
 * LineChart 组件类型定义
 */

// 数据点接口
export interface DataPoint {
  /** X轴值（通常是时间或类别） */
  x: string | number
  /** Y轴值（数值） */
  y: number
  /** 可选的标签 */
  label?: string
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
  /** 图表数据 */
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
}

// 组件事件接口
export interface LineChartEmits {
  (e: 'click', data?: any): void
  (e: 'pointClick', point: DataPoint, index: number): void
}
