<template>
  <div 
    class="line-chart"
    :class="[
      { 'line-chart--clickable': clickable }
    ]"
    @click="handleClick"
  >
    <!-- 图表标题 -->
    <div class="line-chart__header">
      <h3 class="line-chart__title">
        {{ config.title }}
        <span v-if="config.subtitle" class="line-chart__subtitle">{{ config.subtitle }}</span>
      </h3>
    </div>

    <!-- 图表容器 -->
    <div class="line-chart__container" :style="{ width: `${width}px`, height: `${height}px` }">
      <svg
        :width="width"
        :height="height"
        class="line-chart__svg"
        :viewBox="`0 0 ${width} ${height}`"
        preserveAspectRatio="xMidYMid meet"
      >
        <!-- 网格线 -->
        <g v-if="config.showGrid" class="line-chart__grid">
          <line
            v-for="(tick, index) in yTicks"
            :key="`grid-${index}`"
            :x1="padding.left"
            :y1="getYPosition(tick)"
            :x2="chartWidth + padding.left"
            :y2="getYPosition(tick)"
            class="line-chart__grid-line"
          />
        </g>

        <!-- 阴影效果 -->
        <defs v-if="config.showShadow">
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3"/>
            <feOffset dx="0" dy="2" result="offset"/>
            <feFlood flood-color="#A0A0FF" flood-opacity="0.3"/>
            <feComposite in2="offset" operator="in"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <!-- 填充区域 -->
        <path
          :d="fillPathData"
          :fill="config.lineColor"
          fill-opacity="0.15"
          class="line-chart__fill"
        />

        <!-- 数据路径 -->
        <path
          :d="pathData"
          :stroke="config.lineColor"
          :stroke-width="config.strokeWidth"
          fill="none"
          class="line-chart__line"
          :filter="config.showShadow ? 'url(#shadow)' : ''"
        />

        <!-- 数据点 -->
        <g v-if="config.showDots" class="line-chart__dots">
          <circle
            v-for="(point, index) in data"
            :key="`dot-${index}`"
            :cx="getXPosition(point.x)"
            :cy="getYPosition(point.y)"
            :r="config.dotSize"
            :fill="config.dotColor"
            :stroke="config.lineColor"
            :stroke-width="2"
            class="line-chart__dot"
            @click="handlePointClick(point, index)"
          />
        </g>

        <!-- X轴标签 -->
        <g class="line-chart__x-axis">
          <text
            v-for="(point, index) in data"
            :key="`x-label-${index}`"
            :x="getXPosition(point.x)"
            :y="height - 48"
            class="line-chart__x-label"
            text-anchor="middle"
          >
            {{ point.x }}
          </text>
        </g>

        <!-- Y轴标签 -->
        <g class="line-chart__y-axis">
          <text
            v-for="(tick, index) in yTicks"
            :key="`y-label-${index}`"
            :x="padding.left - 8"
            :y="getYPosition(tick) + 5"
            class="line-chart__y-label"
            text-anchor="end"
          >
            {{ tick }}
          </text>
        </g>

        <!-- 轴标签 -->
        <text
          v-if="config.xAxisLabel"
          :x="width / 2"
          :y="height - 25"
          class="line-chart__axis-label line-chart__axis-label--x"
          text-anchor="middle"
        >
          {{ config.xAxisLabel }}
        </text>
        
        <text
          v-if="config.yAxisLabel"
          :x="padding.left - 15"
          :y="padding.top - 10"
          class="line-chart__axis-label line-chart__axis-label--y"
          text-anchor="middle"
        >
          {{ config.yAxisLabel }}
        </text>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, withDefaults, defineProps, defineEmits, onMounted } from 'vue'
import type { DataPoint, ChartConfig, ValidationResult } from './LineChart.types'

// 定义Props接口
interface Props {
  data: DataPoint[]
  config?: ChartConfig
  width?: number
  height?: number
  clickable?: boolean
  clickData?: any
  enableValidation?: boolean
  customValidator?: (data: DataPoint[]) => ValidationResult
}

// 设置默认值
const props = withDefaults(defineProps<Props>(), {
  width: 400,
  height: 300,
  clickable: false,
  clickData: undefined,
  enableValidation: true,
  customValidator: undefined,
  config: () => ({
    title: '折线图',
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
  })
})

const emit = defineEmits(['click', 'pointClick', 'validationError'])

// 图表内边距
const padding = {
  top: 40,
  right: 20,
  bottom: 70,
  left: 50
}

// 数据验证函数
const validateData = (data: DataPoint[]): ValidationResult => {
  const errors: string[] = []
  const warnings: string[] = []

  if (!data || data.length === 0) {
    errors.push('数据不能为空')
    return { isValid: false, errors, warnings }
  }

  if (data.length < 2) {
    errors.push('至少需要2个数据点才能绘制折线图')
  }

  data.forEach((point, index) => {
    // 验证x值
    if (typeof point.x !== 'string' || point.x.trim() === '') {
      errors.push(`第${index + 1}个数据点的x值必须是非空字符串`)
    }
    
    // 验证y值
    if (typeof point.y !== 'number' || isNaN(point.y) || !isFinite(point.y)) {
      errors.push(`第${index + 1}个数据点的y值必须是有效数字`)
    }
    
    // 警告：负值
    if (point.y < 0) {
      warnings.push(`第${index + 1}个数据点的y值为负数`)
    }
    
    // 警告：极大值
    if (Math.abs(point.y) > 1000000) {
      warnings.push(`第${index + 1}个数据点的y值过大，可能影响图表显示`)
    }
  })

  return { isValid: errors.length === 0, errors, warnings }
}

// 计算图表区域尺寸
const chartWidth = computed(() => props.width - padding.left - padding.right)
const chartHeight = computed(() => props.height - padding.top - padding.bottom)

// 计算Y轴刻度
const yTicks = computed(() => {
  const { yMin = 0, yMax = 10, yStep = 1 } = props.config
  const ticks = []
  for (let i = yMin; i <= yMax; i += yStep) {
    ticks.push(i)
  }
  return ticks
})

// 获取X轴位置
const getXPosition = (x: string | number) => {
  const index = props.data.findIndex(point => point.x === x)
  if (index === -1) return padding.left
  
  // 让数据点从图表区域开始到结束均匀分布，充分利用宽度
  const step = chartWidth.value / Math.max(1, props.data.length - 1)
  return padding.left + index * step
}

// 获取Y轴位置
const getYPosition = (y: number) => {
  const { yMin = 0, yMax = 10 } = props.config
  const ratio = (y - yMin) / (yMax - yMin)
  return padding.top + chartHeight.value * (1 - ratio)
}

// 生成平滑路径数据（贝塞尔曲线）
const pathData = computed(() => {
  if (props.data.length < 2) return ''

  let path = ''
  const points = props.data.map(point => ({
    x: getXPosition(point.x),
    y: getYPosition(point.y)
  }))

  // 开始路径
  path += `M ${points[0].x},${points[0].y}`

  // 使用统一的贝塞尔曲线算法
  for (let i = 1; i < points.length; i++) {
    const currentPoint = points[i]
    const prevPoint = points[i - 1]

    // 计算控制点 - 根据数据变化幅度动态调整弧度
    const deltaX = currentPoint.x - prevPoint.x
    const deltaY = currentPoint.y - prevPoint.y
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    
    // 根据Y轴变化幅度调整弧度强度
    const yChange = Math.abs(deltaY)
    const curvatureFactor = Math.min(0.6, Math.max(0.2, yChange / 50)) // 动态弧度因子
    
    const controlX = prevPoint.x + deltaX * curvatureFactor
    const controlY = prevPoint.y + deltaY * curvatureFactor

    path += ` Q ${controlX},${controlY} ${currentPoint.x},${currentPoint.y}`
  }

  return path
})

// 生成填充路径数据（从X轴填充到曲线）
const fillPathData = computed(() => {
  if (props.data.length < 2) return ''

  let path = ''
  const points = props.data.map(point => ({
    x: getXPosition(point.x),
    y: getYPosition(point.y)
  }))

  // 开始路径 - 从第一个点开始
  path += `M ${points[0].x},${points[0].y}`

  // 使用统一的贝塞尔曲线算法（与主路径完全一致）
  for (let i = 1; i < points.length; i++) {
    const currentPoint = points[i]
    const prevPoint = points[i - 1]

    // 计算控制点 - 与主路径保持一致的动态弧度
    const deltaX = currentPoint.x - prevPoint.x
    const deltaY = currentPoint.y - prevPoint.y
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    
    // 根据Y轴变化幅度调整弧度强度
    const yChange = Math.abs(deltaY)
    const curvatureFactor = Math.min(0.6, Math.max(0.2, yChange / 50)) // 动态弧度因子
    
    const controlX = prevPoint.x + deltaX * curvatureFactor
    const controlY = prevPoint.y + deltaY * curvatureFactor

    path += ` Q ${controlX},${controlY} ${currentPoint.x},${currentPoint.y}`
  }

  // 连接到X轴形成封闭区域
  const lastPoint = points[points.length - 1]
  const firstPoint = points[0]
  path += ` L ${lastPoint.x},${padding.top + chartHeight.value} L ${firstPoint.x},${padding.top + chartHeight.value} Z`

  return path
})

// 处理点击事件
const handleClick = () => {
  if (props.clickable) {
    emit('click', props.clickData)
  }
}

// 处理数据点点击
const handlePointClick = (point: DataPoint, index: number) => {
  emit('pointClick', point, index)
}

// 数据验证
onMounted(() => {
  if (props.enableValidation) {
    const validation = props.customValidator ? props.customValidator(props.data) : validateData(props.data)
    if (!validation.isValid) {
      emit('validationError', validation.errors)
      console.error('LineChart数据验证失败:', validation.errors)
    }
    if (validation.warnings.length > 0) {
      console.warn('LineChart数据警告:', validation.warnings)
    }
  }
})
</script>

<style lang="less" scoped>
.line-chart {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.28) 100%);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  &:hover {
    box-shadow: 0 8px 32px rgba(160, 160, 255, 0.2);
  }

  &--clickable {
    cursor: pointer;
  }
}

.line-chart__header {
  margin-bottom: 20px;
}

.line-chart__title {
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
  line-height: 1.4;
  
  .line-chart__subtitle {
    font-size: 14px;
    font-weight: 400;
    color: #6B7280;
    margin-left: 8px;
  }
}

.line-chart__container {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

.line-chart__svg {
  width: 100%;
  height: 100%;
  display: block;
}

.line-chart__grid-line {
  stroke: #E5E7EB;
  stroke-width: 1;
  stroke-dasharray: 2,2;
}

.line-chart__fill {
  transition: all 0.3s ease;
}

.line-chart__line {
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: all 0.3s ease;
}

.line-chart__dot {
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    r: 8;
    filter: drop-shadow(0 2px 4px rgba(160, 160, 255, 0.3));
  }
}

.line-chart__x-label,
.line-chart__y-label {
  font-size: 10px;
  fill: #6B7280;
  font-weight: 500;
}

.line-chart__axis-label {
  font-size: 13px;
  fill: #374151;
  font-weight: 500;

  &--x {
    text-anchor: middle;
  }

  &--y {
    text-anchor: middle;
  }
}
</style>
