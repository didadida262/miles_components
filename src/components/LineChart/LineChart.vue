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
      <h3 class="line-chart__title">{{ config.title }}</h3>
      <p v-if="config.subtitle" class="line-chart__subtitle">{{ config.subtitle }}</p>
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
            :y="height - 45"
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
          :y="height - 30"
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
import { computed, withDefaults, defineProps, defineEmits } from 'vue'
import type { DataPoint, ChartConfig } from './LineChart.types'

// 定义Props接口
interface Props {
  data: DataPoint[]
  config?: ChartConfig
  width?: number
  height?: number
  clickable?: boolean
  clickData?: any
}

// 设置默认值
const props = withDefaults(defineProps<Props>(), {
  width: 400,
  height: 300,
  clickable: false,
  clickData: undefined,
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

const emit = defineEmits<{
  click: [data?: any]
  pointClick: [point: DataPoint, index: number]
}>()

// 图表内边距
const padding = {
  top: 40,
  right: 20,
  bottom: 80,
  left: 50
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
  
  // 让数据点从图表区域开始到结束均匀分布
  const step = chartWidth.value / Math.max(1, props.data.length - 1)
  return padding.left + index * step
}

// 获取Y轴位置
const getYPosition = (y: number) => {
  const { yMin = 0, yMax = 10 } = props.config
  const ratio = (y - yMin) / (yMax - yMin)
  return padding.top + chartHeight.value * (1 - ratio)
}

// 生成路径数据
const pathData = computed(() => {
  if (props.data.length < 2) return ''
  
  const points = props.data.map(point => {
    const x = getXPosition(point.x)
    const y = getYPosition(point.y)
    return `${x},${y}`
  })
  
  return `M ${points.join(' L ')}`
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
    transform: scale(1.02);
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
}

.line-chart__subtitle {
  font-size: 14px;
  color: #6B7280;
  margin: 0;
  line-height: 1.4;
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
  font-size: 11px;
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
