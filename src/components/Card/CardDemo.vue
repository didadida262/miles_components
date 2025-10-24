<template>
  <div class="card-demo">
    <h2>Card 组件演示</h2>
    
    <!-- 基础用法 -->
    <section class="demo-section">
      <h3>基础用法</h3>
      <div class="demo-grid">
        <Card content="基础按钮" />
        <Card content="主要按钮" variant="primary" />
        <Card content="次要按钮" variant="secondary" />
      </div>
    </section>
    
    <!-- 不同尺寸 -->
    <section class="demo-section">
      <h3>不同尺寸</h3>
      <div class="demo-grid">
        <Card content="小按钮" size="small" />
        <Card content="中等按钮" size="medium" />
        <Card content="大按钮" size="large" />
      </div>
    </section>
    
    <!-- 禁用状态 -->
    <section class="demo-section">
      <h3>禁用状态</h3>
      <div class="demo-grid">
        <Card content="禁用按钮" disabled />
        <Card content="禁用主要按钮" variant="primary" disabled />
      </div>
    </section>
    
    <!-- 点击事件 -->
    <section class="demo-section">
      <h3>点击事件</h3>
      <div class="demo-grid">
        <Card 
          content="点击我" 
          @click="handleClick"
        />
      </div>
      <div v-if="clicked" class="click-info">
        按钮被点击了！
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from './Card.vue'

const clicked = ref(false)

const handleClick = () => {
  clicked.value = true
  setTimeout(() => {
    clicked.value = false
  }, 2000)
}
</script>

<style lang="less" scoped>
.card-demo {
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
}

.demo-grid {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.click-info {
  margin-top: 16px;
  padding: 12px 16px;
  background: #10b981;
  color: white;
  border-radius: 8px;
  font-size: 14px;
}
</style>