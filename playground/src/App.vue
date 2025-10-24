<template>
  <div class="app">
    <header class="header">
      <h1>Vue组件库演示</h1>
      <p>TaskCard组件的默认状态和悬停效果</p>
    </header>

    <main class="main">
      <div class="demo-section">
        <h2>TaskCard 组件演示</h2>
        <p>鼠标悬停查看渐变背景和轻微放大效果</p>
        <div class="cards-grid">
          <TaskCard
            title="待审核"
            tag="请购单"
            :number="7"
            unit="笔"
            icon-type="pending"
            :clickable="true"
            :click-data="{ id: 1, type: 'pending' }"
            @click="handleCardClick"
          />
          <TaskCard
            title="待分配"
            tag="请购单"
            :number="5"
            unit="张"
            icon-type="purchase"
            :clickable="true"
            :click-data="{ id: 2, type: 'purchase' }"
            @click="handleCardClick"
          />
          <TaskCard
            title="文档"
            tag="文件"
            :number="15"
            unit="个"
            icon-type="schedule"
            :clickable="true"
            :click-data="{ id: 3, type: 'schedule' }"
            @click="handleCardClick"
          />
        </div>
      </div>

      <div class="demo-section">
        <h2>LineChart 组件演示</h2>
        <p>库存周转率趋势图，支持交互和数据点点击</p>
        <div class="chart-container">
          <LineChart
            :data="chartData"
            :config="chartConfig"
            :width="chartWidth"
            :height="350"
            :clickable="true"
            :click-data="{ type: 'inventory-turnover' }"
            :enable-validation="true"
            @click="handleChartClick"
            @point-click="handlePointClick"
            @validation-error="handleValidationError"
          />
        </div>
      </div>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { DataPoint, ChartConfig } from 'miles-wang-vue-components'

// 处理卡片点击事件
const handleCardClick = (clickData: any) => {
  console.log('TaskCard被点击了！', clickData)
}

// 图表数据
const chartData = ref<DataPoint[]>([
  { x: '2024-09', y: 4.2 },
  { x: '2024-10', y: 4.4 },
  { x: '2024-11', y: 3.7 },
  { x: '2024-12', y: 4.0 },
  { x: '2025-01', y: 3.6 },
  { x: '2025-02', y: 4.6 },
  { x: '2025-03', y: 3.5 },
  { x: '2025-04', y: 3.9 },
  { x: '2025-05', y: 3.6 },
  { x: '2025-06', y: 5.8 },
  { x: '2025-07', y: 4.8 }
])

// 图表配置
const chartConfig = ref<ChartConfig>({
  title: '库存周转率趋势',
  subtitle: '(最近12个月)',
  xAxisLabel: '月份',
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
})

// 处理图表点击事件
const handleChartClick = (clickData: any) => {
  console.log('LineChart被点击了！', clickData)
}

// 处理数据点点击事件
const handlePointClick = (point: DataPoint, index: number) => {
  console.log('数据点被点击了！', point, index)
  alert(`点击了数据点：\n时间：${point.x}\n数值：${point.y}\n索引：${index}`)
}

// 处理验证错误
const handleValidationError = (errors: string[]) => {
  console.error('数据验证错误:', errors)
  alert(`数据验证失败：\n${errors.join('\n')}`)
}

// 响应式宽度计算
const containerWidth = ref(0)

const chartWidth = computed(() => {
  return Math.max(800, containerWidth.value - 100) // 增加最小宽度，确保填满容器
})

const updateWidth = () => {
  const container = document.querySelector('.chart-container')
  if (container) {
    containerWidth.value = container.clientWidth
  }
}

onMounted(() => {
  updateWidth()
  window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.header h1 {
  color: #1f2937;
  margin: 0 0 8px 0;
  font-size: 32px;
  font-weight: 700;
}

.header p {
  color: #6b7280;
  margin: 0;
  font-size: 18px;
}

.main {
  max-width: 1200px;
  margin: 0 auto;
}

.demo-section {
  background: white;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.demo-section h2 {
  color: #1f2937;
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 600;
}

.demo-section p {
  color: #6b7280;
  margin: 0 0 24px 0;
  font-size: 16px;
}

.cards-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: flex-start;
  justify-content: flex-start;
}

.chart-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  margin-top: 16px;
  box-sizing: border-box;
}

</style>
