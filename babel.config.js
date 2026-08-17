module.exports = {
  presets: [
    // corejs 3：匹配 @babel/preset-env 新版本注入的 polyfill 模块（es.iterator.* 等）
    ['@vue/app', { useBuiltIns: 'usage', corejs: 3 }]
  ]
}
