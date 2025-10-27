<template>
  <div class="line-chart-card">
    <LineChart
      :data="chartData.data"
      :config="computedConfig"
      :width="width"
      :height="height"
      :auto-width="autoWidth"
      :auto-height="autoHeight"
      :clickable="clickable"
      :click-data="clickData"
      :enable-validation="enableValidation"
      :custom-validator="customValidator"
      @click="handleClick"
      @point-click="handlePointClick"
      @validation-error="handleValidationError"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import LineChart from './LineChart.vue'
import type { DataPoint, CompleteChartData, ChartConfig, ValidationResult } from './LineChart.types'

// Props
interface Props {
  /** 完整的图表配置数据 */
  chartData: CompleteChartData
  /** 图表宽度 */
  width?: number
  /** 图表高度 */
  height?: number
  /** 是否自动适应容器宽度 */
  autoWidth?: boolean
  /** 是否自动适应容器高度 */
  autoHeight?: boolean
  /** 是否可点击 */
  clickable?: boolean
  /** 点击事件数据 */
  clickData?: any
  /** 是否启用数据验证 */
  enableValidation?: boolean
  /** 自定义验证函数 */
  customValidator?: (data: DataPoint[]) => ValidationResult
}

const props = withDefaults(defineProps<Props>(), {
  width: 800,
  height: 400,
  autoWidth: false,
  autoHeight: false,
  clickable: false,
  enableValidation: true
})

const emit = defineEmits(['click', 'pointClick', 'validationError'])

// 计算配置
const computedConfig = computed<ChartConfig>(() => ({
  title: props.chartData.title,
  subtitle: props.chartData.subtitle,
  xAxisLabel: props.chartData.xAxisLabel,
  yAxisLabel: props.chartData.yAxisLabel,
  yMin: props.chartData.yAxis?.min,
  yMax: props.chartData.yAxis?.max,
  yStep: props.chartData.yAxis?.step,
  lineColor: props.chartData.style?.lineColor,
  dotColor: props.chartData.style?.dotColor,
  strokeWidth: props.chartData.style?.strokeWidth,
  dotSize: props.chartData.style?.dotSize,
  showGrid: props.chartData.display?.showGrid,
  showDots: props.chartData.display?.showDots,
  showShadow: props.chartData.display?.showShadow
}))

// 事件处理
const handleClick = (data?: any) => {
  emit('click', data)
}

const handlePointClick = (point: DataPoint, index: number) => {
  emit('pointClick', point, index)
}

const handleValidationError = (errors: string[]) => {
  emit('validationError', errors)
}
</script>

<style lang="less" scoped>
.line-chart-card {
  width: 100%;
  height: 100%;
}
</style>
