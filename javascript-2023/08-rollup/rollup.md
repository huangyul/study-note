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
