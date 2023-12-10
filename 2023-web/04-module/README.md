# JS 模块化

## 模块化演变

### 无模块化

```html
<script src="main.js"></script>
<script src="jquery.js"></script>
<script src="tools.js"></script>
```

将文件分离，按模块加载

#### script 的两个参数 async & defer

```html
<script src="main.js"></script>
```

js文件加载的三种方式
- 普通：解析到标签，立即pending，执行下载，执行后再走后面的
- defer：解析到标签开始异步下载，继续解析完后立即执行，不会阻塞主线程
- async：解析到标签会异步下载，下载完后立即执行，会阻塞主线程

#### 问题

- 污染全局作用域

### IIFE（语法侧的优化）

利用函数块级作用域

```js
(function() {
  let count = 1;
  // ...
})()
```

例子：

```js
const moduleA = (() => {
  let count = 0;
  return {
    increase: () => ++count
  }
})()

moduleA.increase()
```

**如果有依赖其他模块时，通过传参引用其他模块**

```js
const iifeModule = ((d1, d2) => {
  // ...
})(d1, d2)
```

### CJS和AMD

#### CJS - commonjs

> nodejs指定的标准

使用方式：
- 通过 module 和 export 去对外暴露接口
- 通过 require 去调用其他模块

例子：
```js
// 引入
const depM1 = require('./depM1')

// 核心逻辑
let count = 0
const increase = () => ++count

// 暴露接口
export.increase = increase

// 或者
module.export = {
  increase
}
```

**面试问题**

以下代码，为什么需要这三个传参
```js
(function(window, $, undefined) {
  // 核心代码
})(window, jQuery)

// window： 1. 将全局变量改成局部变量，执行时不需要全局调用，提成效率；2. 编译时优化压缩，打包后的文件不会引入window
// jQuery： 1. 独立进行改动，防止全局污染
// undefined： 防止重写s
```

##### 优缺点

- 优点：在服务侧解决了全局变量的问题
- 缺点：只针对服务端，并且没有异步加载的解决办法

#### AMD

通过异步加载 + 使用回调函数

```js
define(id, [depends], callback)
```

#### 兼容AMD&CJS
