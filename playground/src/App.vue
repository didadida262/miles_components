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

    </main>
  </div>
</template>

<script setup lang="ts">
// 处理卡片点击事件
const handleCardClick = (clickData: any) => {
  console.log('TaskCard被点击了！', clickData)
}
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

</style>
