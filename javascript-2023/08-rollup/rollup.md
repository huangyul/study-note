# rollup

利用ESM的特性的高效打包工具

## 基本使用

安装`pnpm add rollup -D`

打包`pnpx rollup ./src/index.js --format iife --file dits/bundle.js`

上面的命令分别指定了**入口文件**，**输出的格式**，**打包结果存放的位置**

## 配置文件

创建`rollup.config.js`

```js
export default {
  // 入口文件
  input: './src/index.js',
  output: {
    // 输出的文件
    file: 'dist/bundle.js',
    // 输出的格式
    format: 'iife'
  }
}
```

`rollup`并不会默认使用配置文件，需要使用`--config`指定   
例如：`rollup --config rollup.config.js`

## 使用插件

插件是rollup的唯一拓展方式

例如要处理json文件，安装插件`pnpm add rollup-plugin-json -D`

```js
// rollup.config.js
export default {
  plugins: [json()]
}
```

## 加载npm模块

rollup-plugin-node-resolve

## 加载CommonJS

rollup-plugin-commonjs

## 代码拆分

也是使用ESM中的import，不过要改一下配置文件：
- 因为分包了，所以不能指定`file`
- `format`类型也不能选`iife`和`udm`，浏览器环境选`amd`，`node`环境选cmd

```js
// index.js
import('./logger.js').then(module => {
  consle.log(module)
})
// rollup.config.js
export default {
  output: {
    dir: 'dist',
    format: 'amd'
  }
}
```

## 多入口打包

```js
// rollup.config.js
export default {
  input: ['./src/index.js', './src/album.js'],
  output: {
    format: 'amd',
    dir: 'dist'
  }
}
```
