# 快速发布指南

## 🚀 一键发布

### 1. 登录npm
```bash
npm login
```

### 2. 发布组件库
```bash
# 使用发布脚本（推荐）
node scripts/publish.js

# 或手动发布
npm run build && npm publish --access public
```

### 3. 创建Git标签
```bash
git tag v1.0.0
git push origin v1.0.0
```

## 📋 发布前检查

```bash
# 检查构建
npm run build

# 测试包结构
node test-package.js

# 检查Git状态
git status
```

## 🔍 发布后验证

```bash
# 测试安装
npm install @miles-wang/vue-components

# 检查包信息
npm view @miles-wang/vue-components
```

## 🎯 使用组件库

```bash
# 安装
npm install @miles-wang/vue-components

# 使用
import { TaskCard } from '@miles-wang/vue-components'
```

---

**就这么简单！你的组件库已经发布成功！** 🎉
