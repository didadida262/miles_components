#!/usr/bin/env node

const { execSync } = require('child_process')
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

function checkGitStatus() {
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' })
    if (status.trim()) {
      log('❌ 有未提交的更改，请先提交所有更改', 'red')
      process.exit(1)
    }
    log('✅ Git状态检查通过', 'green')
  } catch (error) {
    log('❌ Git状态检查失败', 'red')
    process.exit(1)
  }
}

function checkBuild() {
  if (!fs.existsSync('dist')) {
    log('❌ 构建目录不存在，请先运行 npm run build', 'red')
    process.exit(1)
  }
  log('✅ 构建目录存在', 'green')
}

function checkVersion() {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  const currentVersion = packageJson.version
  
  try {
    const publishedVersion = execSync(`npm view ${packageJson.name} version`, { encoding: 'utf8' }).trim()
    if (currentVersion === publishedVersion) {
      log(`❌ 版本 ${currentVersion} 已经发布，请更新版本号`, 'red')
      process.exit(1)
    }
    log(`✅ 版本检查通过 (当前: ${currentVersion}, 已发布: ${publishedVersion})`, 'green')
  } catch (error) {
    log(`✅ 包未发布过，可以发布版本 ${packageJson.version}`, 'green')
  }
}

function publish() {
  try {
    log('🚀 开始发布到npm...', 'blue')
    execSync('npm publish --access public', { stdio: 'inherit' })
    log('✅ 发布成功！', 'green')
  } catch (error) {
    log('❌ 发布失败', 'red')
    console.error(error.message)
    process.exit(1)
  }
}

function main() {
  log('🔍 开始发布前检查...', 'blue')
  
  checkGitStatus()
  checkBuild()
  checkVersion()
  
  log('📦 所有检查通过，开始发布...', 'green')
  publish()
  
  log('🎉 发布完成！', 'green')
  log('📝 请记得创建Git标签: git tag v' + JSON.parse(fs.readFileSync('package.json', 'utf8')).version, 'yellow')
}

main()
