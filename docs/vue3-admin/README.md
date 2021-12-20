# VUE3-Admin

**技术栈**

- vue3
- typescript
- element-plus
- webpack

## 项目初始化

使用`@vue/cli`初始化一个`typescript`项目

```bash
vue create app-name
# 下面的选项中选择vue3和typescript
```

## vue 配置文件

```js
// vue.config.js
// vue 项目配置文件
// 详细请查看 https://cli.vuejs.org/zh/config/

module.exports = {
  // 部署应用包时的基本url
  // 比如要该应用要部署到 www.xxx.com/my-app/ 上，则publicPath需要设置为 /my-app
  // 这里先不设置
  // publicPath: ''

  // 输出的文件目录，也就是打包好后的文件目录，默认值 'dist'
  outputDir: 'dist',

  // 放置生成静态资源（js，img，css，font）的目录（在outputDir指定目录里面的），默认值 ''
  assetsDir: 'static',

  // 生产环境的source map ，默认值 true
  productionSourceMap: false,

  // 是否将组件中的css提取到一个独立的css文件中
  css: {
    extract: false,
  },

  // 开发服务器
  // 更多参数可参考 webpack-dev-server https://webpack.docschina.org/configuration/dev-server/
  devServer: {
    // 指定使用的host
    port: 8888,
    // 是否自动使用浏览器打开
    open: false,
    // 代理（解决跨域问题）
    proxy: {
      '/dev-api': {
        target: '', // 目标服务器
        pathRewrite: { '^/api': '' }, // 接口重写
        changeOrigin: true, // 发送请求头中的host会设置成target
        // ws: true, // 是否要代理websockets
      },
    },
  },
}
```

## 安装 element-plus

需要同时安装`icon`库，[参考文档](https://element-plus.gitee.io/zh-CN/)

```javascript
// 安装包
npm i element-plus @element-plus/icon-vue

// main.ts
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElemntPlus)

// 如果要全局使用`element-icon`，需要全局注册
// help.ts
import type { App } from 'vue'
import * as icons from '@element-plus/icon-vue'
export function registerComponent(app: App) {
  const elIcons = icons as any
  for(const i in elIcons) {
    app.component(`element${elIcons[i].name}`, elIcons[i])
  }
}
```

###### vue3 小提示

?> 如何在`setup`中获取组件

```html
<!--要使用<script setup></script>-->
<template><div ref="divRef"></div></template>
<script setup>
  const divRef = ref(null) // 这样就能获取到自组件
</script>
```
