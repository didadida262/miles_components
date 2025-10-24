#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// 颜色输出
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

// 获取组件名
const componentName = process.argv[2]

if (!componentName) {
  log('❌ 请提供组件名称', 'red')
  log('用法: node scripts/create-component.js ComponentName', 'yellow')
  process.exit(1)
}

// 验证组件名格式
if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
  log('❌ 组件名必须使用PascalCase格式', 'red')
  log('示例: Button, Input, Modal, TaskCard', 'yellow')
  process.exit(1)
}

// 组件目录路径
const componentDir = path.join(__dirname, '..', 'src', 'components', componentName)

// 检查组件是否已存在
if (fs.existsSync(componentDir)) {
  log(`❌ 组件 ${componentName} 已存在`, 'red')
  process.exit(1)
}

// 创建组件目录
fs.mkdirSync(componentDir, { recursive: true })

// 组件模板
const componentTemplate = `<template>
  <div 
    class="${componentName.toLowerCase()}"
    :class="[
      \`${componentName.toLowerCase()}--\${size}\`,
      \`${componentName.toLowerCase()}--\${variant}\`,
      { '${componentName.toLowerCase()}--disabled': disabled }
    ]"
    @click="handleClick"
  >
    <!-- 组件内容 -->
    <slot>{{ content }}</slot>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, defineEmits } from 'vue'
import type { ${componentName}Props, ${componentName}Emits } from './${componentName}.types'

// 定义Props
const props = withDefaults(defineProps<${componentName}Props>(), {
  size: 'medium',
  variant: 'default',
  disabled: false,
  content: ''
})

// 定义事件
const emit = defineEmits<${componentName}Emits>()

// 事件处理
const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style lang="less" scoped>
.${componentName.toLowerCase()} {
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
</style>`

// 类型定义模板
const typesTemplate = `/**
 * ${componentName} 组件类型定义
 */

// 组件Props接口
export interface ${componentName}Props {
  /** 组件大小 */
  size?: 'small' | 'medium' | 'large'
  /** 组件变体 */
  variant?: 'default' | 'primary' | 'secondary'
  /** 是否禁用 */
  disabled?: boolean
  /** 组件内容 */
  content?: string
  /** 自定义类名 */
  customClass?: string
  /** 自定义样式 */
  customStyle?: string | Record<string, any>
}

// 组件事件接口
export interface ${componentName}Emits {
  /** 点击事件 */
  click?: (event: MouseEvent) => void
}

// 组件配置类型
export interface ${componentName}Config {
  // 配置项
  defaultSize: 'small' | 'medium' | 'large'
  defaultVariant: 'default' | 'primary' | 'secondary'
}`

// 配置文件模板
const configTemplate = `/**
 * ${componentName} 组件配置
 */

import type { ${componentName}Config } from './${componentName}.types'

// 默认配置
export const DEFAULT_CONFIG: ${componentName}Config = {
  defaultSize: 'medium',
  defaultVariant: 'default'
}

// 主题配置
export const THEME_CONFIG = {
  colors: {
    primary: '#1890ff',
    secondary: '#6c757d',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d'
  },
  sizes: {
    small: {
      fontSize: '12px',
      padding: '4px 8px'
    },
    medium: {
      fontSize: '14px',
      padding: '8px 16px'
    },
    large: {
      fontSize: '16px',
      padding: '12px 24px'
    }
  }
} as const`

// 演示组件模板
const demoTemplate = `<template>
  <div class="${componentName.toLowerCase()}-demo">
    <h2>${componentName} 组件演示</h2>
    
    <!-- 基础用法 -->
    <section class="demo-section">
      <h3>基础用法</h3>
      <div class="demo-grid">
        <${componentName} content="基础按钮" />
        <${componentName} content="主要按钮" variant="primary" />
        <${componentName} content="次要按钮" variant="secondary" />
      </div>
    </section>
    
    <!-- 不同尺寸 -->
    <section class="demo-section">
      <h3>不同尺寸</h3>
      <div class="demo-grid">
        <${componentName} content="小按钮" size="small" />
        <${componentName} content="中等按钮" size="medium" />
        <${componentName} content="大按钮" size="large" />
      </div>
    </section>
    
    <!-- 禁用状态 -->
    <section class="demo-section">
      <h3>禁用状态</h3>
      <div class="demo-grid">
        <${componentName} content="禁用按钮" disabled />
        <${componentName} content="禁用主要按钮" variant="primary" disabled />
      </div>
    </section>
    
    <!-- 点击事件 -->
    <section class="demo-section">
      <h3>点击事件</h3>
      <div class="demo-grid">
        <${componentName} 
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
import ${componentName} from './${componentName}.vue'

const clicked = ref(false)

const handleClick = () => {
  clicked.value = true
  setTimeout(() => {
    clicked.value = false
  }, 2000)
}
</script>

<style lang="less" scoped>
.${componentName.toLowerCase()}-demo {
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
</style>`

// 入口文件模板
const indexTemplate = `/**
 * ${componentName} 组件入口文件
 */

// 导出主组件
export { default as ${componentName} } from './${componentName}.vue'

// 导出演示组件
export { default as ${componentName}Demo } from './${componentName}Demo.vue'

// 导出类型定义
export * from './${componentName}.types'

// 导出配置
export * from './${componentName}.config'

// 导出组件类型
export type { ${componentName}Props, ${componentName}Emits } from './${componentName}.types'`

// README模板
const readmeTemplate = `# ${componentName} 组件

## 功能特性

- ✅ **TypeScript支持**: 完整的类型定义
- ✅ **响应式设计**: 适配不同屏幕尺寸
- ✅ **多种变体**: 支持不同样式变体
- ✅ **多种尺寸**: 支持小、中、大三种尺寸
- ✅ **事件支持**: 支持点击等事件
- ✅ **可定制**: 支持自定义样式

## 基础用法

\`\`\`vue
<template>
  <${componentName} content="基础按钮" />
</template>

<script setup>
import { ${componentName} } from '@miles-wang/vue-components'
</script>
\`\`\`

## Props 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| size | 'small' \| 'medium' \| 'large' | 'medium' | 组件大小 |
| variant | 'default' \| 'primary' \| 'secondary' | 'default' | 组件变体 |
| disabled | boolean | false | 是否禁用 |
| content | string | '' | 组件内容 |
| customClass | string | '' | 自定义类名 |
| customStyle | string \| object | - | 自定义样式 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击事件 | (event: MouseEvent) |

## 使用示例

### 不同变体

\`\`\`vue
<template>
  <${componentName} content="默认按钮" />
  <${componentName} content="主要按钮" variant="primary" />
  <${componentName} content="次要按钮" variant="secondary" />
</template>
\`\`\`

### 不同尺寸

\`\`\`vue
<template>
  <${componentName} content="小按钮" size="small" />
  <${componentName} content="中等按钮" size="medium" />
  <${componentName} content="大按钮" size="large" />
</template>
\`\`\`

### 禁用状态

\`\`\`vue
<template>
  <${componentName} content="禁用按钮" disabled />
</template>
\`\`\`

### 点击事件

\`\`\`vue
<template>
  <${componentName} 
    content="点击我" 
    @click="handleClick"
  />
</template>

<script setup>
const handleClick = (event) => {
  console.log('按钮被点击了', event)
}
</script>
\`\`\`

## 样式定制

\`\`\`css
.${componentName.toLowerCase()} {
  --primary-color: #1890ff;
  --border-radius: 4px;
  --font-size: 14px;
}
\`\`\``

// 创建文件
const files = [
  { name: `${componentName}.vue`, content: componentTemplate },
  { name: `${componentName}.types.ts`, content: typesTemplate },
  { name: `${componentName}.config.ts`, content: configTemplate },
  { name: `${componentName}Demo.vue`, content: demoTemplate },
  { name: 'index.ts', content: indexTemplate },
  { name: 'README.md', content: readmeTemplate }
]

files.forEach(file => {
  const filePath = path.join(componentDir, file.name)
  fs.writeFileSync(filePath, file.content)
  log(`✅ 创建文件: ${file.name}`, 'green')
})

log(`🎉 组件 ${componentName} 创建成功！`, 'green')
log(`📁 组件目录: ${componentDir}`, 'blue')
log(`📝 下一步: 更新 src/components/index.ts 和 src/index.ts 文件`, 'yellow')
