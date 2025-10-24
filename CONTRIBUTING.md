# 贡献指南

## 📋 组件开发规范

### 1. 组件目录结构

每个组件都应该遵循以下目录结构：

```
src/components/ComponentName/
├── ComponentName.vue          # 主组件
├── ComponentNameDemo.vue       # 演示组件
├── ComponentName.types.ts      # 类型定义
├── ComponentName.config.ts     # 配置文件
├── index.ts                    # 组件入口
└── README.md                   # 组件文档
```

### 2. 组件命名规范

- **组件名**: 使用PascalCase，如 `TaskCard`, `Button`, `Input`
- **文件名**: 与组件名保持一致
- **目录名**: 与组件名保持一致
- **CSS类名**: 使用kebab-case，如 `task-card`, `button-primary`

### 3. 组件开发模板

#### 主组件模板 (ComponentName.vue)

```vue
<template>
  <div 
    class="component-name"
    :class="[
      `component-name--${size}`,
      `component-name--${variant}`,
      { 'component-name--disabled': disabled }
    ]"
    @click="handleClick"
  >
    <!-- 组件内容 -->
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, defineEmits } from 'vue'
import type { ComponentNameProps, ComponentNameEmits } from './ComponentName.types'

// 定义Props
const props = withDefaults(defineProps<ComponentNameProps>(), {
  size: 'medium',
  variant: 'default',
  disabled: false
})

// 定义事件
const emit = defineEmits<ComponentNameEmits>()

// 事件处理
const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style lang="less" scoped>
.component-name {
  // 基础样式
}
</style>
```

#### 类型定义模板 (ComponentName.types.ts)

```typescript
/**
 * ComponentName 组件类型定义
 */

// 组件Props接口
export interface ComponentNameProps {
  /** 组件大小 */
  size?: 'small' | 'medium' | 'large'
  /** 组件变体 */
  variant?: 'default' | 'primary' | 'secondary'
  /** 是否禁用 */
  disabled?: boolean
  /** 自定义类名 */
  customClass?: string
  /** 自定义样式 */
  customStyle?: string | Record<string, any>
}

// 组件事件接口
export interface ComponentNameEmits {
  /** 点击事件 */
  click?: (event: MouseEvent) => void
  /** 其他事件... */
}

// 组件配置类型
export interface ComponentNameConfig {
  // 配置项
}
```

#### 配置文件模板 (ComponentName.config.ts)

```typescript
/**
 * ComponentName 组件配置
 */

import type { ComponentNameConfig } from './ComponentName.types'

// 默认配置
export const DEFAULT_CONFIG: ComponentNameConfig = {
  // 默认配置项
}

// 主题配置
export const THEME_CONFIG = {
  // 主题配置
} as const

// 尺寸配置
export const SIZE_CONFIG = {
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
} as const
```

#### 组件入口模板 (index.ts)

```typescript
/**
 * ComponentName 组件入口文件
 */

// 导出主组件
export { default as ComponentName } from './ComponentName.vue'

// 导出演示组件
export { default as ComponentNameDemo } from './ComponentNameDemo.vue'

// 导出类型定义
export * from './ComponentName.types'

// 导出配置
export * from './ComponentName.config'

// 导出组件类型
export type { ComponentNameProps, ComponentNameEmits } from './ComponentName.types'
```

### 4. 组件开发检查清单

#### 开发前
- [ ] 确认组件功能需求
- [ ] 设计组件API
- [ ] 创建组件目录结构
- [ ] 编写类型定义

#### 开发中
- [ ] 实现组件功能
- [ ] 添加样式和动画
- [ ] 处理边界情况
- [ ] 添加事件处理
- [ ] 编写演示组件

#### 开发后
- [ ] 编写组件文档
- [ ] 添加使用示例
- [ ] 测试组件功能
- [ ] 检查TypeScript类型
- [ ] 运行代码检查
- [ ] 更新主入口文件

### 5. 样式开发规范

#### CSS类命名
```css
/* 组件根元素 */
.component-name { }

/* 修饰符 */
.component-name--primary { }
.component-name--large { }
.component-name--disabled { }

/* 子元素 */
.component-name__header { }
.component-name__content { }
.component-name__footer { }

/* 状态 */
.component-name.is-active { }
.component-name.is-loading { }
```

#### 响应式设计
```css
/* 移动端 */
@media (max-width: 768px) {
  .component-name {
    font-size: 14px;
  }
}

/* 平板端 */
@media (min-width: 769px) and (max-width: 1024px) {
  .component-name {
    font-size: 16px;
  }
}

/* 桌面端 */
@media (min-width: 1025px) {
  .component-name {
    font-size: 18px;
  }
}
```

### 6. 测试规范

#### 组件测试
```typescript
// 基础功能测试
describe('ComponentName', () => {
  it('should render correctly', () => {
    // 测试渲染
  })
  
  it('should handle click events', () => {
    // 测试点击事件
  })
  
  it('should support different sizes', () => {
    // 测试不同尺寸
  })
})
```

#### 视觉测试
- [ ] 在不同浏览器中测试
- [ ] 测试不同屏幕尺寸
- [ ] 测试不同主题
- [ ] 测试无障碍访问

### 7. 文档规范

#### 组件文档模板
```markdown
# ComponentName 组件

## 功能特性
- 特性1
- 特性2

## 基础用法
\`\`\`vue
<template>
  <ComponentName />
</template>
\`\`\`

## API
| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| size | string | 'medium' | 组件大小 |

## 事件
| 事件名 | 说明 | 回调参数 |
|-------|------|----------|
| click | 点击事件 | (event: MouseEvent) |
```

### 8. 提交规范

#### Git提交信息格式
```
feat(ComponentName): 添加新功能
fix(ComponentName): 修复问题
docs(ComponentName): 更新文档
style(ComponentName): 代码格式调整
refactor(ComponentName): 代码重构
test(ComponentName): 添加测试
chore(ComponentName): 构建过程或辅助工具的变动
```

#### 提交前检查
- [ ] 代码格式化
- [ ] 类型检查通过
- [ ] 测试通过
- [ ] 文档更新
- [ ] 提交信息规范

### 9. 发布流程

#### 新组件发布
1. 开发组件
2. 编写文档
3. 添加测试
4. 更新主入口文件
5. 更新README
6. 构建测试
7. 提交代码
8. 发布版本

#### 版本管理
- 新组件: 小版本更新 (1.0.0 -> 1.1.0)
- 功能增强: 小版本更新
- 破坏性变更: 大版本更新 (1.0.0 -> 2.0.0)
- 修复问题: 补丁版本更新 (1.0.0 -> 1.0.1)

### 10. 最佳实践

#### 组件设计
- 保持组件单一职责
- 提供清晰的API
- 支持自定义样式
- 考虑无障碍访问
- 优化性能

#### 代码质量
- 使用TypeScript
- 添加JSDoc注释
- 遵循代码规范
- 编写单元测试
- 保持代码简洁

#### 用户体验
- 提供默认值
- 处理边界情况
- 添加加载状态
- 支持键盘操作
- 提供反馈信息
