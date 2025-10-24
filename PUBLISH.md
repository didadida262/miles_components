# 发布指南

## 📦 发布到npm

### 1. 准备工作

确保你已经完成了以下步骤：

- [ ] 所有代码已提交到Git
- [ ] 版本号已更新
- [ ] 构建测试通过
- [ ] 文档完整

### 2. 发布步骤

#### 方法一：使用发布脚本（推荐）

```bash
# 运行发布脚本
node scripts/publish.js
```

#### 方法二：手动发布

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

### 3. 版本管理

#### 更新版本号

```bash
# 补丁版本 (1.0.0 -> 1.0.1)
npm version patch

# 小版本 (1.0.0 -> 1.1.0)
npm version minor

# 大版本 (1.0.0 -> 2.0.0)
npm version major
```

#### 发布预发布版本

```bash
# 发布beta版本
npm version prerelease --preid=beta
npm publish --tag beta

# 发布alpha版本
npm version prerelease --preid=alpha
npm publish --tag alpha
```

### 4. 发布后检查

发布完成后，请检查：

- [ ] npm包页面显示正确
- [ ] 安装测试：`npm install @miles-wang/task-card`
- [ ] 在测试项目中验证功能
- [ ] 更新GitHub Release（如果有）

### 5. 回滚发布

如果发布有问题，可以回滚：

```bash
# 撤销发布（24小时内）
npm unpublish @miles-wang/task-card@1.0.0

# 或者发布修复版本
npm version patch
npm publish
```

## 🔧 开发工作流

### 日常开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build

# 类型检查
npm run type-check

# 代码检查
npm run lint
```

### 测试

```bash
# 测试包结构
node test-package.js

# 在本地测试包
npm pack
npm install ./miles-wang-task-card-1.0.0.tgz
```

## 📝 发布清单

发布前请确认：

- [ ] 所有文件已提交到Git
- [ ] 版本号已更新
- [ ] CHANGELOG已更新
- [ ] README文档完整
- [ ] 构建成功无错误
- [ ] 包测试通过
- [ ] 类型定义完整
- [ ] 样式文件包含

## 🚨 注意事项

1. **版本号**: 遵循语义化版本控制
2. **Git标签**: 发布后记得创建Git标签
3. **文档更新**: 重大更新时更新README
4. **向后兼容**: 尽量保持API向后兼容
5. **测试**: 发布前充分测试

## 📞 支持

如果发布过程中遇到问题：

1. 检查npm登录状态：`npm whoami`
2. 检查包名是否可用：`npm view @miles-wang/task-card`
3. 查看npm日志：`npm publish --dry-run`
4. 联系维护者：miles.wang@example.com
