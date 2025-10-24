<template>
  <div class="app">
    <h1>TaskCard 组件使用示例</h1>
    
    <!-- 基础用法 -->
    <section class="section">
      <h2>基础用法</h2>
      <div class="card-grid">
        <TaskCard
          title="待分配"
          tag="请购单"
          :number="5"
          unit="张"
          icon-type="clipboard"
        />
        
        <TaskCard
          title="待审核"
          tag="采购单"
          :number="6"
          unit="张"
          icon-type="shopping-cart"
        />
      </div>
    </section>
    
    <!-- 可点击卡片 -->
    <section class="section">
      <h2>可点击卡片</h2>
      <div class="card-grid">
        <TaskCard
          title="待处理"
          tag="审批"
          :number="12"
          unit="项"
          icon-type="task"
          :clickable="true"
          @click="handleTaskClick"
        />
        
        <TaskCard
          title="已完成"
          tag="任务"
          :number="25"
          unit="项"
          icon-type="document"
          :clickable="true"
          click-data="{ type: 'completed', id: 1 }"
          @click="handleCardClick"
        />
      </div>
    </section>
    
    <!-- 不同图标类型 -->
    <section class="section">
      <h2>不同图标类型</h2>
      <div class="card-grid">
        <TaskCard
          title="文档"
          tag="文件"
          :number="15"
          unit="个"
          icon-type="document"
        />
        
        <TaskCard
          title="日程"
          tag="会议"
          :number="3"
          unit="场"
          icon-type="calendar"
        />
        
        <TaskCard
          title="任务"
          tag="待办"
          :number="9"
          unit="项"
          icon-type="task"
        />
      </div>
    </section>
    
    <!-- 点击事件信息 -->
    <div v-if="clickedCard" class="click-info">
      <p>点击了卡片: {{ clickedCard }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { TaskCard } from '@miles-wang/task-card'

const clickedCard = ref(null)

const handleTaskClick = (data) => {
  clickedCard.value = data || '任务卡片被点击'
  console.log('任务卡片被点击:', data)
}

const handleCardClick = (data) => {
  clickedCard.value = data || '卡片被点击'
  console.log('卡片被点击:', data)
}
</script>

<style scoped>
.app {
  padding: 24px;
  background: #f7f7fa;
  min-height: 100vh;
}

h1 {
  margin-bottom: 32px;
  color: #1f2937;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
}

h2 {
  margin-bottom: 16px;
  color: #374151;
  font-size: 20px;
  font-weight: 600;
}

.section {
  margin-bottom: 48px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.click-info {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #10b981;
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

.click-info p {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
}
</style>
