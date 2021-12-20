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

[官方文档](https://element-plus.gitee.io/zh-CN/guide/quickstart.html#%E5%AE%8C%E6%95%B4%E5%BC%95%E5%85%A5)

```bash
npm i element-plus @element-plus/icons-vue -s
```

在`main.ts`中加入`element-plus`

```js
// element
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
```

###### 配置路径别名

在`vue.config.js`中可使用配置

```js
module.exports = {
  // webpack的配置，会通过webpack-merge合并到最终的配置中
  configureWebpack: {
    // 模块解析规则
    resolve: {
      // 配置路径别名
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@views': path.resolve(__dirname, './src/views'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@components': path.resolve(__dirname, './src/components'),
      },
    },
  },
}
```

###### 通过改变 element 主题色来设置主题

首先使用`el-color-picker`组件来获取选择的颜色，然后通过 css 变量来改变

```js
// 改变主题色
const el = document.getElementsByTagName('body')[0]
el.style.setProperty('--el-button-bg-primary', val)
```

###### 使用 scss 变量

我们可以在基础的`scss`文件中定好常用的变量，然后通过`var`来使用

```css
/* index.scss */
/* :root 表示文档树的根元素 */
:root {
  --main-bg: red;
}

/* 某个vue文件 */
.tagName {
  background: var(--main-bg);
}
```

###### 一键全灰模式

主要通过动态设置 `filter: grayscale`的值来实现

```js
documentElement.setAttribute('style', `filter:grayscale(0)`)
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
