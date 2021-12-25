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

###### element icons 图标的使用

为了方便使用 element 图标，我们可以将图标注册为组件

```js
export function func(app) {
  // 获取element icons
  const icons = elementIcons
  for (let i in icons) {
    app.component(`element${icons[i].name}`, icons[i])
  }
}
```

## Layout 布局

整体布局思路参考[vue-element-admin](https://gitee.com/panjiachen/vue-element-admin?_from=gitee_search)的布局，先构建`layout` 组件，里面主要包括**侧边菜单**，**顶部导航栏**，其中顶部导航栏又包括**侧边菜单的展开按钮**，**头像**等，页面主题内容放到 `layout` 里面的 `router-view` 通过路由实现切换

###### 路由页面切换的动画实现

主要使用 `vue` 的 `transition` 组件，详细使用：[transition](https://v3.cn.vuejs.org/guide/transitions-enterleave.html)，在`view-router`中使用需要注意：因为切换的实际上是在`router-view`中渲染出路由的组件，所以造成`router-view`只有进入动画，没有离开动画，解决办法是绑定`key`为**当前的路由**

基础知识：

```vue
<template>
  <!-- 使用name属性，然后通过相关的name定义css样式，就能自动实现动画 -->
  <transition name="fade">
    <!-- 里面的组件在发生切换时，会自动实现 -->
  </transition>
</template>

<style>
  .fade-leave-active,
  .fade-enter-active {
    transition: all 0.5s ease;
  }
  .fade-enter-from {
    opacity: 0;
  }
  .fade-leave-to {
    opacity: 0;
  }
</style>
```

```vue
<script setup>
  // 在router-view中，需要绑定key，可以使用当前的路由
  const route = useRoute()
  const key = computed(() => route.path)
</script>
```

###### 根据路由动态生成侧边菜单

主要使用 `elment` 的 `menu` 组件，组件链接：[Element menu](https://element-plus.gitee.io/zh-CN/component/menu.html)

**思路：**

1. 先在组件中获取当前 `router` 对象的 `route` 配置表

```vue
<script setup>
  const router = useRouter()
  const routeList = router.options.routes
</script>
```

2. 使用 `el-menu` 组件，遍历刚刚获取的路由配置表，分别判断三种情况，第一：如果当前路由的子路由长度`大于 1`，则当前路由作为 `el-sub-menu`，子路由继续遍历，第二：如果当前路由的子路由`等于 1`，则当前路由的子路由作为 `el-menu-item`，第三：如果没有子路由，直接渲染成 `el-menu-item`

```vue
<el-menu
  active-text-color="#ffd04b"
  background-color="#545c64"
  class="el-menu-vertical-demo"
  mode="vertical"
  :collapse="!store.state.system.menuCollapse"
  :default-active="`${routeList[0].path}`"
  text-color="#fff"
  router
>
      <template v-for="route in routeList" :key="route.path">
        <!-- 不隐藏的才显示 -->
        <div v-if="!route.meta.isHide">
          <el-sub-menu
            :index="route.path"
            v-if="route.children && route.children.length > 1"
          >
            <template #title>
              <el-icon><elementMenu /></el-icon>
              <span>{{ route.meta.title }}</span>
            </template>
            <SiderItem :routes="route.children"></SiderItem>
          </el-sub-menu>
          <el-menu-item
            v-else-if="route.children && route.children.length == 1"
            :index="route.children[0].path"
          >
            <el-icon><elementMenu /></el-icon>
            <span>{{ route.children[0].meta.title }}</span>
          </el-menu-item>
          <el-menu-item v-else :index="`${route.path}`">
            <el-icon><elementMenu /></el-icon>
            <span>{{ route.meta.title }}</span>
          </el-menu-item>
        </div>
      </template>
    </el-menu>
```

###### 隐藏路由

通过在路由中的 meta 对象里配置 isHide:true，实现路由在侧边菜单栏的隐藏

#### SvgIcon 组件

需求：

1. 统一打包好 svg 文件，方便使用；
2. 封装一个 SvgIcon 组件，全局注册，加上上面的统一调用，可直接使用该组件

###### 1、统一打包

`webpack`会默认使用`url-loader`处理项目中的`svg`文件，不符合我们的需求，所以我们需要去掉`webpack`的默认规则，添加自己的新规则；新规则可以使用`svg-sprite-loader`，它可以把所有`svg`文件打包成一个文件，然后通过类似定位的方式，通过`name`找到该`svg`图标

```js
// vue.config.js

module.exports = {
  chainWebpack(confing) {
    // 1. 修改当前项目默认的svg配置，排除我们刚设的icons目录
    config.module.rule('svg').exclude.add(resolve('./src/icons'))

    // 2. 新增一个rule, 使用svg-sprite-loader来添加icon里面的svg
    config.module
      .rule('icons') // icons是自定义的名称
      .test(/\.svg$/)
      .include.add(resolve('./src/icons'))
      .end() // end()用来退到上层链式，即回到和include平级那层
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader') // 这里不是笔误，就是use和loader都要写
      .options({
        symbolId: 'icon-[name]', // 要制定下图标id，[name]就是读到的svg文件名
      })
  },
}
```

然后在我们存放 `svg` 文件的目录下，新建 `index.js`，用来统一引用 `svg`

```js
const req = require.context('./svg', false, /\.svg$/')
req.keys().map(req)
```

###### 封装 SvgIcon 组件并全局注册

```vue
<template>
  <svg>
    <use :xlink:href="svgName"></use>
  </svg>
</template>

<script setup>
  const props = defineProps({
    iconName: {
      type: String,
      require: true,
    },
    iconClass: {
      type: String,
      default: '',
    },
  })
  const svgName = `#icon-${props.iconName}`
  const svgClass = props.iconClass ? `svg-icon ${props.iconClass}` : 'svg-icon'
</script>

<style>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currenColor;
    overflow: hidder;
  }
</style>
```

```js
// 全局注册
import SvgIcon from '...'

Vue.component('SvgIcon', SvgIcon)
```
