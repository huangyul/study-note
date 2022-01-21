# KOA

## 手撸 koa 源码

###### node http 基础

使用 node 搭建 http 服务基础代码如下

```js
// 引用http模块
const http = require('http')

// 创建server
const server = http.createServer((req, res) => {
  // 响应头
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  // 响应数据
  res.end('hello world')
})

// 监听端口，启动服务
server.listen(5555, function () {
  console.log('server is running')
})
```
