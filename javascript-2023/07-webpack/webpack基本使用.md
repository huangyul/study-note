# webpack

## 为什么需要模块化

- 将es 6的代码打包成es5的，解决兼容性的问题
- 将多个模块打包成一个bundle文件，减少请求
- 还需要打包其他资源文件

## 基本使用

```bash
# 安装
pnpm add webpack webpack-cli -D
# 使用
npx webpack
```

## webpack配置文件

在根目录下新建webpack.config.js，可以对webpack进行配置

```js
module.exports = {
  // 配置入口文件
  entry: './src/main.js',
  // 输出
  output: {
    // 输出文件名
    filename: 'bundle.js',
    // 输出路径
    path: path.join(__dirname, 'output')
  }
}
```

## 工作模式

针对不同环境的预设

第一种方式：在配置文件中指定

```js
module.exports = {
  mode: 'development'
}
```

第二种方式：在cli中指定

```bash
npx webpack --mode development
```

## 资源模块加载

`webpack` 是前端模块打包工具，不仅仅是只针对 `js` 的，所以可以打包其他资源；但是只是内置了针对 `js` 文件的 `loader` ，在处理其他资源的时候，需要安装相应的 `loader`

例如要处理css文件，需要安装css-loader和style-loader

```js
{
  module: {
    rules: [
      {
        test: /.css$/,
        use: ['style-loader', 'css-loader'] // 按倒叙调用的
      }
    ]
  }
}
```

## 导入资源模块

使用`import`去导入其他资源模块

```js
// main.js
import './main.css'
```

## 文件资源加载器

在处理图片，字体等资源文件时，无法被转`js`，需要使用`file-loader`

```js
{
    module: {
    rules: [
      {
        test: /.png$/,
        use: 'file-loader'
      }
    ]
  }
}
```

也可以使用url-loader，将文件资源转为base64编码使用

```js
{
  module: {
    rules: [
      {
        test: /.png$/,
        use: 'url-loader'
      }
    ]
  }
}
```

对比：
- file-loader：就是将文件copy出来，并变换文件夹，在打包后的js文件中以相对路径导出
- url-loader：将文件通过base64编码，打包后没有实际的文件

使用总结：
- 小文件使用url-loader，减少请求次数
- 大文件单独放，提高加载速度
```js
{
  test: /.png$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 10 * 1024 // 10kb
    }
  }
  
}
```
这里只是配置了使用url-loader，当大小超出10kb时，就自动调用file-loader

## 处理es 2015

安装依赖

```bash
pnpm add babel-loader @babel/core @babel/preset-env -D
```

webpack配置

```js
{
  test: /.js$/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
    }
  }
}

## 处理html

使用`html-loader`

```js
{
  test: /.html$/,
  use: {
    loader: 'html-loader',
    options: {
      attrs: ['img:src', 'a:href'] // 定义处理那些属性
    }
  }
}
```

## 自定义loader

- loader机制规范要暴露一个函数
- 输入为上一个loader处理的结果
- 输出为该loader处理完的结果

```js
// markdown-loader
const marked = require('marked')

module.exports = source => {
  const html = marked(source)

  // 第一种方式
  // return `export defualt ${json.stringify(html)}`

  // 第二种方式，直接返回html，然后交给html-loader处理
  return html
  // webpack配置
  {
    test: /.md$/,
    use: [
      'html-loader',
      './markdown-loader.js'
    ]
  }
}
```

## 插件 plugin

### 自动清除输出目录

`clean-webpack-plugin`

```js
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

{
  plugins: [new CleanWebpackPlugin()]
}
```

### 自动生成html

`html-webpack-plugin`

```js
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // 指定使用的模板
      title: '333' // 定义变量可用于替换模板文件中的<%= xxx %>的变量
    })
  ]
```

### 复制资源文件

copy-webpack-plugin

```js
new CopyWebpackPlugin({
  patterns: [
    {from: 'public', to: 'public'}
  ]
})
```

### 开发一个插件

原理：使用**钩子机制**，往节点中挂载任务即可

必须是一个函数或者是包含一个apply方法的对象

```js
class MyPlugin {
  apply(compiler) {
    // 在emit钩子中注册一个方法，名字是myplugin
    compiler.hooks.emit.tap('MyPlugin', compilation => {
      // 遍历所有要输出的文件
      for (const name in compilation.assets) {
        if(name.endsWith('js')) {
          const content = compilation.assets[name].source()
          const withoutComments = content.replace(/\/\*\**\*\//g, '')
          compilation.assets[name] = {
            source: () => withoutComments,
            size: () => withoutComments.length
          }
        }
      }
    })
  }
}
```

## 本地dev

### 自动编译

监听文件变化，自动运行打包任务

```bash
webpack --watch
```

### dev server

安装 webpack-dev-server

#### dev server静态资源访问

使用contentBase
```js
devServer: {
  static: path.join(__dirname, 'public')
},
```

### 代理API

```js
devServer: {
  proxy: {
    '/api': {
      target: 'https://api.github.com',
      pathRewrite: {
        '^/api': ''
      },
      // 不使用localhost
      changeOrgin: true,
    }
  }
}
```
### 配置source map

```js
{
  devtool: 'source-map'
}
```

### HMR

模块热替换

开启：
```js
devServer: {
  hot: true
}
```

`HMR`可以自动处理样式，但是无法自动处理`js`，要通过`HMR`的`api`去处理

例如：
在`main`中引用的`moduleA`，可以去处理`moduleA`发生改变时的情形
```js
// 模块的路径；处理函数
module.hot.accpet('./module', () => {
  // 保留上次的状态
  const value = moduleA.innerHTML
  document.removeChild(moduleA)
  const newElement = moduleACreate()
  document.appendChild(newElement)
})
```

其实`webpack`没有通用的方法是处理`js`的热更新问题

## 生产环境优化

### 不同环境

在不同环境用不同的配置

#### 方法一

```js
module.exports = (env, args) => {
  // 这里写共同的配置
  const config = {}

  // 如果是生产环境
  if(env.production) {
    config.mode = 'production'
  }

  return config
}
```

#### 方法二

做不同的环境配置，然后通过`webpack-merge`来合并配置

例如在`webpack.common.js`中写好基础的配置

在`webpack.prod.js`写生产环境的配置

```js
const merge = require('webpack-merge')
const common = require('webpack.common.js')
const config = merge(common, {
  mode: 'production'
})
```

## webpack拓展

### definePlugin

可以使用webpack注释一些常用

```js
// webpack.config.js
const webpack = require('webpack')
{
  plugins: [
    new webpack.DefinePlugin({
      API_BASE_URL: JSON.stringify('http://api.example.com')
    }),
  ]
}
// 其他的js文件中可以直接使用
console.log(API_BASE_URL)
```

### Tree Shaking

> 生产环境会自动开启

将没有引用到的代码去掉

手动开启

```js
{
  optimization: {
    usedExports: true,
    minimize: true,
  } 
}
```

### 合并模块

> 生产环境默认打开

将所有模块尽可能的合并到一个方法中，减少代码体制并提高运行效率

```js
{
  optimization: {
    concatenateModules: ture,
  }
}
```
