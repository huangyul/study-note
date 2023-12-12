# 函数式编程

## 函数是一等公民

- 函数可以存储到变量中
- 函数可以作为参数
- 函数可以作为返回值

### 函数可以存储到变量中

```js
let fn = function() {
  console.log('xxx')
}
fn()
```

### 高阶函数

- 可以把函数作为参数传递给另外一个函数

> 例子：01-heigher-order-function.js

- 函数作为返回值 

```js
console.log('函数作为返回值')
function once(fn) {
  let done = false
  return function () {
    if (!done) {
      done = true
      return fn.apply(this, arguments)
    }
  }
}

const pay = once(function (money) {
  console.log(`支付了${money}`)
})
pay(5)
pay(5)
pay(5)

```

**高阶函数使我们可以只关心输入输出，不用关心内部的细节**

