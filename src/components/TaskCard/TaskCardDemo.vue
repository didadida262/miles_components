<template>
  <div class="task-card-demo">
    <h2>TaskCard 组件使用示例</h2>
    
    <!-- 基础用法 -->
    <section class="demo-section">
      <h3>基础用法</h3>
      <div class="demo-grid">
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
        
        <TaskCard
          title="待审核"
          tag="请购单"
          :number="7"
          unit="笔"
          icon-type="clipboard"
        />
      </div>
    </section>
    
    <!-- Hover效果 -->
    <section class="demo-section">
      <h3>Hover效果（紫色渐变）</h3>
      <div class="demo-grid">
        <TaskCard
          title="日程"
          tag="我的任务"
          :number="8"
          unit="笔"
          icon-type="folder"
          :clickable="true"
        />
      </div>
    </section>
    
    <!-- 可点击卡片 -->
    <section class="demo-section">
      <h3>可点击卡片</h3>
      <div class="demo-grid">
        <TaskCard
          title="待处理"
          tag="审批"
          :number="12"
          unit="项"
          icon-type="task"
          :clickable="true"
          @click="handleCardClick"
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
    <section class="demo-section">
      <h3>不同图标类型</h3>
      <div class="demo-grid">
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
    
    <!-- 点击事件处理 -->
    <div v-if="clickedCard" class="click-info">
      <p>点击了卡片: {{ clickedCard }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TaskCard from './TaskCard.vue'

const clickedCard = ref<any>(null)

const handleCardClick = (data?: any) => {
  clickedCard.value = data || '无数据'
  console.log('卡片被点击:', data)
}
</script>

<style lang="less" scoped>
.item-card-demo {
  padding: 24px;
  background: #f7f7fa;
  min-height: 100vh;
  
  h2 {
    margin-bottom: 32px;
    color: #1f2937;
    font-size: 24px;
    font-weight: 700;
  }
  
  h3 {
    margin-bottom: 16px;
    color: #374151;
    font-size: 18px;
    font-weight: 600;
  }
}

.demo-section {
  margin-bottom: 48px;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
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
  
  p {
    margin: 0;
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
