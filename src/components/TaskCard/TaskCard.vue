<template>
  <div 
    class="task-card"
    :class="[
      { 'task-card--clickable': clickable }
    ]"
    @click="handleClick"
  >
    <!-- 卡片内容 -->
    <div class="task-card__content">
      <!-- 标题和标签区域 -->
      <div class="task-card__header">
        <h3 class="task-card__title">{{ title }}</h3>
        <span class="task-card__tag">{{ tag }}</span>
      </div>
      
      <!-- 数字和单位区域 -->
      <div class="task-card__number-section">
        <span class="task-card__number">{{ number }}</span>
        <span class="task-card__unit">{{ unit }}</span>
      </div>
    </div>
    
    <!-- 图标区域 -->
    <div class="task-card__icon">
      <img 
        :src="getIconSrc(iconType)" 
        :alt="iconType"
        class="task-card__icon-img"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, defineEmits } from 'vue'

// 定义组件Props接口
interface TaskCardProps {
  /** 卡片标题 */
  title: string
  /** 标签文本 */
  tag: string
  /** 数字值 */
  number: number | string
  /** 单位文本 */
  unit: string
  /** 图标类型 */
  iconType?: 'clipboard' | 'shopping-cart' | 'folder' | 'document' | 'calendar' | 'task'
  /** 是否可点击 */
  clickable?: boolean
  /** 自定义类名 */
  customClass?: string
  /** 点击事件数据 */
  clickData?: any
}

// 定义事件
interface TaskCardEmits {
  (e: 'click', data?: any): void
}

// 设置默认值
const props = withDefaults(defineProps<TaskCardProps>(), {
  iconType: 'clipboard',
  clickable: false,
  customClass: '',
  clickData: undefined
})

const emit = defineEmits<TaskCardEmits>()

// 获取图标路径
const getIconSrc = (iconType: string) => {
  // 使用import方式导入SVG图标，确保正确的路径解析
  const iconMap: Record<string, string> = {
    'clipboard': new URL('@/assets/icons/clipboard.svg', import.meta.url).href,
    'shopping-cart': new URL('@/assets/icons/shopping-cart.svg', import.meta.url).href,
    'folder': new URL('@/assets/icons/folder.svg', import.meta.url).href,
    'document': new URL('@/assets/icons/document.svg', import.meta.url).href,
    'calendar': new URL('@/assets/icons/calendar.svg', import.meta.url).href,
    'task': new URL('@/assets/icons/task.svg', import.meta.url).href
  }
  return iconMap[iconType] || new URL('@/assets/icons/clipboard.svg', import.meta.url).href
}

// 处理点击事件
const handleClick = () => {
  if (props.clickable) {
    emit('click', props.clickData)
  }
}
</script>


<style lang="less" scoped>
// 基础卡片样式
.task-card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.28) 100%);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  min-height: 120px;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  
  &--clickable {
    cursor: pointer;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      background: linear-gradient(135deg, #A0A0FF 0%, #5D78FF 100%);
      color: #ffffff;
      
      .task-card__title {
        color: #ffffff;
      }
      
      .task-card__tag {
        background: rgba(255, 255, 255, 0.2);
        color: #ffffff;
      }
      
      .task-card__number {
        color: #ffffff;
      }
      
      .task-card__unit {
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
}

// 卡片内容区域
.task-card__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 2;
  min-width: 0;
  max-width: calc(100% - 80px); // 为图标留出空间
  overflow: hidden;
}

// 头部区域（标题和标签）
.task-card__header {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: nowrap;
}

.task-card__title {
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-shrink: 0;
  min-width: 0;
}

.task-card__tag {
  display: inline-block;
  padding: 4px 8px;
  background: #F3F4F6;
  color: #6B7280;
  font-size: 12px;
  font-weight: 500;
  border-radius: 12px;
  white-space: nowrap;
  flex-shrink: 0;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
}

// 数字区域
.task-card__number-section {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.task-card__number {
  font-size: 32px;
  font-weight: 700;
  color: #1F2937;
  line-height: 1;
}

.task-card__unit {
  font-size: 14px;
  color: #9CA3AF;
  font-weight: 500;
}

// 图标区域
.task-card__icon {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  z-index: 1;
  opacity: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .task-card__icon-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 8px;
  }
}

// hover时的图标样式
.task-card--clickable:hover .task-card__icon {
  .task-card__icon-img {
    filter: brightness(1.2) contrast(1.1);
    transform: scale(1.05);
  }
}
</style>
