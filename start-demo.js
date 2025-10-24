#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const path = require('path');

console.log('🚀 启动Vue组件库演示页面...\n');

// 检查playground目录是否存在
const playgroundPath = path.join(__dirname, 'playground');
const fs = require('fs');

if (!fs.existsSync(playgroundPath)) {
  console.error('❌ playground目录不存在！');
  process.exit(1);
}

// 检查playground是否已安装依赖
const packageJsonPath = path.join(playgroundPath, 'package.json');
const nodeModulesPath = path.join(playgroundPath, 'node_modules');

if (!fs.existsSync(nodeModulesPath)) {
  console.log('📦 安装playground依赖...');
  try {
    execSync('npm install', { cwd: playgroundPath, stdio: 'inherit' });
    console.log('✅ 依赖安装完成\n');
  } catch (error) {
    console.error('❌ 依赖安装失败:', error.message);
    process.exit(1);
  }
}

// 先构建组件库
console.log('🔨 构建组件库...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ 组件库构建完成');
} catch (error) {
  console.error('❌ 组件库构建失败:', error.message);
  process.exit(1);
}

// 复制图片文件到playground
console.log('📁 复制资源文件...');
try {
  execSync('mkdir -p playground/public/assets', { stdio: 'inherit' });
  execSync('cp src/assets/sample.png playground/public/assets/', { stdio: 'inherit' });
  console.log('✅ 资源文件复制完成\n');
} catch (error) {
  console.error('❌ 资源文件复制失败:', error.message);
  process.exit(1);
}

// 启动playground
console.log('🎯 启动演示页面...');
console.log('📱 演示页面将在浏览器中自动打开\n');

const child = spawn('npm', ['run', 'dev'], {
  cwd: playgroundPath,
  stdio: 'inherit',
  shell: true
});

// 监听进程退出
child.on('close', (code) => {
  console.log(`\n👋 演示页面已关闭 (退出码: ${code})`);
});

// 处理Ctrl+C
process.on('SIGINT', () => {
  console.log('\n🛑 正在关闭演示页面...');
  child.kill('SIGINT');
  process.exit(0);
});

// 等待一下再显示URL
setTimeout(() => {
  console.log('🌐 演示页面地址: http://localhost:3000');
  console.log('💡 提示: 按 Ctrl+C 停止演示页面');
}, 2000);
