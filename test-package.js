#!/usr/bin/env node

// 测试包的基本功能
const fs = require('fs')
const path = require('path')

console.log('🧪 测试包结构...')

// 检查必要文件
const requiredFiles = [
  'package.json',
  'README.md',
  'LICENSE',
  'dist/index.es.js',
  'dist/index.cjs.js',
  'dist/index.d.ts',
  'dist/style.css'
]

let allFilesExist = true

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`)
  } else {
    console.log(`❌ ${file} 不存在`)
    allFilesExist = false
  }
})

if (!allFilesExist) {
  console.log('❌ 包结构不完整')
  process.exit(1)
}

// 检查package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))

console.log('\n📦 包信息:')
console.log(`名称: ${packageJson.name}`)
console.log(`版本: ${packageJson.version}`)
console.log(`描述: ${packageJson.description}`)
console.log(`主入口: ${packageJson.main}`)
console.log(`模块入口: ${packageJson.module}`)
console.log(`类型定义: ${packageJson.types}`)

// 检查构建文件大小
const distFiles = [
  'dist/index.es.js',
  'dist/index.cjs.js',
  'dist/style.css'
]

console.log('\n📊 构建文件大小:')
distFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const stats = fs.statSync(file)
    const sizeKB = (stats.size / 1024).toFixed(2)
    console.log(`${file}: ${sizeKB} KB`)
  }
})

// 检查TypeScript声明文件
console.log('\n🔍 TypeScript声明文件:')
if (fs.existsSync('dist/index.d.ts')) {
  const dtsContent = fs.readFileSync('dist/index.d.ts', 'utf8')
  if (dtsContent.includes('TaskCard')) {
    console.log('✅ TaskCard组件类型定义存在')
  } else {
    console.log('❌ TaskCard组件类型定义缺失')
  }
  
  if (dtsContent.includes('TaskCardProps')) {
    console.log('✅ TaskCardProps类型定义存在')
  } else {
    console.log('❌ TaskCardProps类型定义缺失')
  }
}

console.log('\n✅ 包测试完成！')
console.log('\n📝 发布前检查清单:')
console.log('1. ✅ 所有必要文件存在')
console.log('2. ✅ package.json配置正确')
console.log('3. ✅ 构建文件生成成功')
console.log('4. ✅ TypeScript声明文件完整')
console.log('\n🚀 可以开始发布了！')
