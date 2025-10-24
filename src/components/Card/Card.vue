<template>
  <div 
    class="card"
    :class="[
      `card--${size}`,
      `card--${variant}`,
      { 'card--disabled': disabled }
    ]"
    @click="handleClick"
  >
    <!-- 组件内容 -->
    <slot>{{ content }}</slot>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, defineEmits } from 'vue'
import type { CardProps, CardEmits } from './Card.types'

// 定义Props
const props = withDefaults(defineProps<CardProps>(), {
  size: 'medium',
  variant: 'default',
  disabled: false,
  content: ''
})

// 定义事件
const emit = defineEmits<CardEmits>()

// 事件处理
const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style lang="less" scoped>
.card {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &--small {
    padding: 4px 8px;
    font-size: 12px;
  }
  
  &--medium {
    padding: 8px 16px;
    font-size: 14px;
  }
  
  &--large {
    padding: 12px 24px;
    font-size: 16px;
  }
  
  &--default {
    background: #f5f5f5;
    color: #333;
  }
  
  &--primary {
    background: #1890ff;
    color: white;
  }
  
  &--secondary {
    background: #6c757d;
    color: white;
  }
  
  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:hover:not(&--disabled) {
    opacity: 0.8;
  }
}
</style>