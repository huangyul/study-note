# Webpack

[中文文档](https://webpack.docschina.org/)

## 概念

webpack 是一个用于现代 Javascript 应用程序的*静态模块打包工具*，用白话讲就是处理前端的各种类型的文件；在项目内部从一个或多个入口，将项目所需的模块打包成*bundles*，用于展示内容。

**核心概念**

- 入口（entry）
- 输出（output）
- loader
- 插件（plugin）
- 模式（mode）
- 环境（environment）

## 入口（entry）

### 语法

> **入口**指定 webpack 使用那些模块和库

```javascript
module.exports = {
  // 单入口（默认）
  entry: './src/main.js'

  // 多入口
  entry: {
    main: './src/main.js',
    another: './src/another.js'
  }
}
```

### 常用场景

#### 分离 app（应用程序）和 vender（第三方库）入口

在开发环境不适用*hash*，这样一些第三方库就不需要重复打包，可以使用缓存，提高打包速度

**webpack.common.js**

```javascript
module.exports = {
  entry: {
    main: './src/app.js',
    vender: './src/vender.js',
  },
}
```

**webpack.prod.js**

```javascript
module.exports = {
  output: {
    filename: '[name].[contenthash].bundle.js',
  },
}
```

**webpack.dev.js**

```javascript
module.exports = {
  output: {
    filename: '[name].bundle.js',
  },
}
```

## 输出

> 指定*webpack*输出的一些配置，例如目录，文件名等

### 用法

```javascript
module.exports = {
  entry: {...},

  output: {
    filename: '[name].[contenthase].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // 清空前打包输出目录
  }
}
```

## loader

> loader 用于对模块的源代码进行转换，简单意思就是解析 webpack 本身不能解析的文件

loader 可以使你在*import*模块时预处理文件，可以将文件从不同语言（如 typescript）转为 javascript 等等

### 实例用法

```javascript
module.exports = {
  module: {
    rules: [{ test: /.\css$/, use: 'css-loader' }],
  },
}
```

### 常用的 loader 使用

#### css

`npm i -d style-loader css-loader postcss-loader sass-loader sass`

**postcss**

1. 为 css 添加特定厂商的前缀
2. 将最新的 css 语法转换成大多数浏览器支持的语法

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /.\css$/i,
        use: [
          'style-loader', // 要比css-loader在前面
          'css-loader',
          'sass-loader', // 解析scss
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']],
              },
            },
          },
        ],
      },
    ],
  },
}
```

#### js

`npm install -D babel-loader @babel/core @babel/preset-env webpack`

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        // 排除以下文件，以防止很慢
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          // babel的配置，也可使用单独的配置文件 bable.config.js，loader会自动寻找
          persets: ['@babel/perset-env'],
        },
      },
    ],
  },
}
```

### 图片、字体

使用内置的`asset module`

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
}
```

## plugin

> 解决 webpack 无法实现的其他事

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin') // 通过 npm 安装
const webpack = require('webpack') // 访问内置的插件
const path = require('path')

module.exports = {
  entry: 'xxx.js',
  output: {
    filename: 'xxx.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }), // 默认使用public目录下的index.html
  ],
}
```

## 环境

### 环境合并

`npm i -d webpack-merge`

```javascript
const { merge } = require('webpack-merge')
const common = require('./webapck.common.js')

module.exports = merge(common, {
  ......
})
```

### 开发环境

`mode: 'development'`

#### source map

> 使用 source map 可以将编译后的代码映射回原始源代码

!> 不要在生产环境中使用

```javascript
module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
}
```

#### 开发工具 webpack-dev-server

`npm i -d webpack-dev-server`

配置

```javascript
module.exports = {
  devServer: {
    // 从什么位置开始
    static: path.resolve(__dirname, 'public'),
    // 是否自动打开文件
    open: true,
    // 端口号
    port: 8888,
    // 热更新，默认打开
    hot: true,
    // 对服务器资源采用gzip压缩，提升web性能
    compress: true,
    // 启动代理
    proxy: {
      '/xxx-api': {
        // 目标
        target: 'http://localhost:3000',
        // 是否改变域名
        changeOrigin: true,
        pathRewrite: {
          '/xxx-api': '',
        },
      },
    },
  },
}
```

### 生产环境

`mode: 'production'`

#### 源码映射

`devtool: 'source-map'`

#### 压缩 css

为了压缩输出文件，要使用`mini-css-extract-plugin`,`css-minimizer-webpack-plugin`插件

```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
}
```

## 最佳使用方式

因为根据不同环境`webpack`的配置有所不同，所以可以建三个`webapck配置`文件，分别是`webpack.common.js`,`webpack.prod.js`,`webpack.dev.js`，分别代表*通用*、_生产环境_、_开发环境的配置_，具体配置如下

#### webpack.common.js

主要是入口文件配置，以及通用插件

```javascript
// 将单个文件或整个目录复制到构建目录
const CopyWebpackPlugin = require('copy-webpack-plugin')
// html模板
const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = require('./paths')

module.exports = {
  // 入口
  entry: [path.resolve(__dirname, 'src') + '/index.js'],

  // 出口
  output: {
    path: path.resolve(__filename, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  plugins: [
    // 将单个文件或整个目录复制到构建目录
    new CopyWebpackPlugin({
      patterns: [
        {
          // 从什么文件夹复制到什么文件夹
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),

    // 生产html模板
    new HtmlWebpackPlugin({
      title: 'webpack html template',
      template: paths.src + '/template.html', // 模板文件地址
      filename: 'index.html', // 输出文件名
    }),
  ],

  module: {
    rules: [
      // 处理js文件
      { test: /\.js$/, use: ['babel-loader'] },

      // 图片
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

      // 字体
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
    ],
  },

  resolve: {
    // 那些模块需要打包
    modules: [paths.src, 'node_modules'],
    // 拓展后缀
    extensions: ['.js', '.jsx', '.json'],
    // 路径简写
    alias: {
      '@': paths.src,
      assets: paths.public,
    },
  },
}
```

#### webpack.prod.js

配置生产环境，例如优化打包

```javascript
// 优化css文件打包
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { merge } = require('webpack-merge')

const paths = require('./paths')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    path: paths.build,
    publicPath: '/',
    filename: 'js/[name].[contenthash].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
              modules: false,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    // 压缩css文件
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
  ],

  // 优化
  // https://webpack.docschina.org/configuration/optimization/
  optimization: {
    minimize: true, // 使用插件压缩bundle
    minimizer: [new CssMinimizerPlugin(), '...'], // 使用什么插件
    runtimeChunk: {
      name: 'runtime',
    },
  },
  // webpack性能提示，例如文件大于多少就输出警告通知你
  // https://webpack.docschina.org/configuration/performance/#root
  performance: {
    hints: false, // 不提示：false，警告：warning，错误：error
    maxEntrypointSize: 512000, //入口文件最大体积
    maxAssetSize: 512000, // 单个文件最大体积，超出就提示
  },
})
```

#### webpack.dev.js

```javascript
const webpack = require('webpack')
const { merge } = require('webpack-merge')

const common = require('./webpack.common.js')
const paths = require('./paths')

module.exports = merge(common, {
  mode: 'development',
  // 开启source-map
  devtool: 'inline-source-map',

  // devserver
  devServer: {
    static: paths.public,
    open: true,
    compress: true, // 对服务器资源采用gzip压缩，提升web性能
    hot: true,
    port: 8080,
  },

  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1, modules: false },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
})
```

## 拓展：vue 中 webpack 的使用

> vue 使用 vue-cli 脚手架，里面有基于 webpack 的基本配置，下面进行简单的自定义配置

### 简单配置

在**vue.config.js**中的**configureWebpack**选项提供一个对象

```javascript
module.exports = {
  configureWebpack: {
    ......
  }
}
```
