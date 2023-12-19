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
