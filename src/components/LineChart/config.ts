/**
 * LineChart 组件默认配置
 */

import type { ChartConfig } from './LineChart.types'

// 默认配置
export const defaultConfig: ChartConfig = {
  title: '折线图',
  subtitle: '',
  xAxisLabel: '',
  yAxisLabel: '',
  yMin: 0,
  yMax: 10,
  yStep: 1,
  showGrid: true,
  showDots: true,
  lineColor: '#A0A0FF',
  dotColor: '#FFFFFF',
  strokeWidth: 3,
  dotSize: 6,
  showShadow: true
}

// 预设主题配置
export const themes = {
  purple: {
    lineColor: '#A0A0FF',
    dotColor: '#FFFFFF',
    showShadow: true
  },
  blue: {
    lineColor: '#3B82F6',
    dotColor: '#FFFFFF',
    showShadow: true
  },
  green: {
    lineColor: '#10B981',
    dotColor: '#FFFFFF',
    showShadow: true
  },
  orange: {
    lineColor: '#F59E0B',
    dotColor: '#FFFFFF',
    showShadow: true
  }
} as const

// 常用配置模板
export const templates = {
  // 库存周转率配置
  inventoryTurnover: {
    title: '库存周转率趋势',
    subtitle: '(最近12个月)',
    xAxisLabel: '',
    yAxisLabel: '周转率',
    yMin: 0,
    yMax: 6,
    yStep: 1,
    showGrid: true,
    showDots: true,
    lineColor: '#A0A0FF',
    dotColor: '#FFFFFF',
    strokeWidth: 3,
    dotSize: 6,
    showShadow: true
  },
  // 销售趋势配置
  salesTrend: {
    title: '销售趋势',
    subtitle: '(最近6个月)',
    xAxisLabel: '',
    yAxisLabel: '销售额(万元)',
    yMin: 0,
    yMax: 100,
    yStep: 20,
    showGrid: true,
    showDots: true,
    lineColor: '#3B82F6',
    dotColor: '#FFFFFF',
    strokeWidth: 3,
    dotSize: 6,
    showShadow: true
  }
} as const
