# 组件库发布指南

## 📋 发布前准备

### 1. 检查项目状态

```bash
# 检查Git状态
git status

# 检查构建是否成功
npm run build

# 测试包结构
node test-package.js

# 检查类型定义
npm run type-check

# 代码检查
npm run lint
```

### 2. 更新版本号

```bash
# 查看当前版本
npm version

# 更新版本号（选择一种）
npm version patch    # 1.0.0 -> 1.0.1 (修复bug)
npm version minor    # 1.0.0 -> 1.1.0 (新功能)
npm version major    # 1.0.0 -> 2.0.0 (破坏性变更)
```

### 3. 提交代码

```bash
# 添加所有更改
git add .

# 提交更改
git commit -m "feat: 发布v1.0.0版本"

# 推送到远程仓库
git push origin main
```

## 🔐 登录npm

### 方法一：使用npm login（推荐）

```bash
# 登录npm
npm login

# 按提示输入：
# - Username: 你的npm用户名
# - Password: 你的npm密码
# - Email: 你的邮箱
# - 2FA Code: 如果启用了双因素认证
```

### 方法二：使用npm token

```bash
# 生成token（在npm网站上）
# 1. 访问 https://www.npmjs.com/settings/tokens
# 2. 点击 "Generate New Token"
# 3. 选择 "Automation" 类型
# 4. 复制生成的token

# 使用token登录
npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN_HERE
```

## 📦 发布到npm

### 方法一：使用发布脚本（推荐）

```bash
# 运行自动化发布脚本
node scripts/publish.js
```

发布脚本会自动执行以下步骤：
1. 检查Git状态
2. 检查构建文件
3. 检查版本号
4. 发布到npm
5. 创建Git标签

### 方法二：手动发布

```bash
# 1. 构建项目
npm run build

# 2. 测试包结构
node test-package.js

# 3. 发布到npm
npm publish --access public

# 4. 创建Git标签
git tag v1.0.0
git push origin v1.0.0
```

## 🔍 发布后验证

### 1. 检查npm包页面

访问：https://www.npmjs.com/package/@miles-wang/vue-components

确认以下信息：
- [ ] 包名正确
- [ ] 版本号正确
- [ ] 描述信息完整
- [ ] README显示正确
- [ ] 文件列表完整

### 2. 测试安装

```bash
# 创建测试目录
mkdir test-install
cd test-install

# 初始化项目
npm init -y

# 安装你的包
npm install @miles-wang/vue-components

# 检查安装结果
ls node_modules/@miles-wang/vue-components/
```

### 3. 测试使用

```vue
<!-- test.vue -->
<template>
  <div>
    <h1>测试组件库</h1>
    <TaskCard
      title="测试"
      tag="测试标签"
      :number="123"
      unit="个"
      icon-type="clipboard"
    />
  </div>
</template>

<script setup>
import { TaskCard } from '@miles-wang/vue-components'
</script>
```

## 🏷️ 版本管理

### 语义化版本控制

遵循 [Semantic Versioning](https://semver.org/) 规范：

- **MAJOR** (主版本号): 不兼容的API修改
- **MINOR** (次版本号): 向下兼容的功能性新增
- **PATCH** (修订号): 向下兼容的问题修正

### 版本更新命令

```bash
# 修复bug (1.0.0 -> 1.0.1)
npm version patch

# 新功能 (1.0.0 -> 1.1.0)
npm version minor

# 破坏性变更 (1.0.0 -> 2.0.0)
npm version major

# 预发布版本
npm version prerelease --preid=beta    # 1.0.0 -> 1.0.1-beta.0
npm version prerelease --preid=alpha    # 1.0.0 -> 1.0.1-alpha.0
```

### 发布预发布版本

```bash
# 发布beta版本
npm version prerelease --preid=beta
npm publish --tag beta

# 发布alpha版本
npm version prerelease --preid=alpha
npm publish --tag alpha

# 安装预发布版本
npm install @miles-wang/vue-components@beta
npm install @miles-wang/vue-components@alpha
```

## 🔄 回滚发布

### 撤销发布（24小时内）

```bash
# 撤销特定版本
npm unpublish @miles-wang/vue-components@1.0.0

# 撤销整个包（谨慎使用）
npm unpublish @miles-wang/vue-components --force
```

### 发布修复版本

```bash
# 发布修复版本
npm version patch
npm publish

# 或者发布新的小版本
npm version minor
npm publish
```

## 📝 发布清单

发布前请确认以下项目：

### 代码质量
- [ ] 所有代码已提交到Git
- [ ] 构建成功无错误
- [ ] 类型检查通过
- [ ] 代码检查通过
- [ ] 测试通过

### 版本管理
- [ ] 版本号已更新
- [ ] 版本号符合语义化版本控制
- [ ] CHANGELOG已更新（如果有）

### 文档
- [ ] README文档完整
- [ ] API文档更新
- [ ] 使用示例正确
- [ ] 组件文档完整

### 包结构
- [ ] package.json配置正确
- [ ] 构建文件完整
- [ ] 类型定义文件存在
- [ ] 样式文件包含

### 发布配置
- [ ] npm登录状态正常
- [ ] 包名可用
- [ ] 发布权限正确

## 🚨 常见问题

### 1. 发布失败

```bash
# 检查npm登录状态
npm whoami

# 检查包名是否可用
npm view @miles-wang/vue-components

# 检查包名冲突
npm search @miles-wang/vue-components
```

### 2. 权限问题

```bash
# 检查npm配置
npm config list

# 检查registry设置
npm config get registry

# 设置正确的registry
npm config set registry https://registry.npmjs.org/
```

### 3. 版本冲突

```bash
# 检查已发布的版本
npm view @miles-wang/vue-components versions --json

# 强制发布（谨慎使用）
npm publish --force
```

### 4. 构建问题

```bash
# 清理构建缓存
rm -rf dist/
rm -rf node_modules/.vite/

# 重新安装依赖
rm -rf node_modules/
npm install

# 重新构建
npm run build
```

## 📊 发布后监控

### 1. 下载统计

访问：https://www.npmjs.com/package/@miles-wang/vue-components

查看：
- 下载量统计
- 版本使用情况
- 依赖关系

### 2. 用户反馈

- 关注GitHub Issues
- 监控npm包页面评论
- 收集用户反馈

### 3. 版本使用情况

```bash
# 查看包信息
npm view @miles-wang/vue-components

# 查看依赖关系
npm view @miles-wang/vue-components dependencies
```

## 🎯 最佳实践

### 1. 发布频率

- **主版本**: 重大更新时发布
- **次版本**: 新功能时发布
- **修订版本**: 修复bug时发布

### 2. 版本兼容性

- 尽量保持API向后兼容
- 重大变更时提前通知
- 提供迁移指南

### 3. 文档维护

- 及时更新README
- 维护CHANGELOG
- 提供升级指南

### 4. 测试策略

- 发布前充分测试
- 使用预发布版本测试
- 收集用户反馈

## 📞 技术支持

如果发布过程中遇到问题：

1. **检查npm状态**: https://status.npmjs.org/
2. **查看npm日志**: `npm publish --dry-run`
3. **联系维护者**: miles.wang@example.com
4. **GitHub Issues**: 创建issue描述问题

## 🎉 发布成功

发布成功后，记得：

1. 更新GitHub Release
2. 通知用户新版本
3. 更新文档网站
4. 分享到社区

---

**恭喜！你的组件库已成功发布到npm！** 🚀
