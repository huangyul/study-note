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

## 闭包

在一个函数内部可以调用外部函数作用域的成员变量

```js
function funcA() {
  let a = 1
  return function() {
    console.log(a) // 这里就是调用了外部函数的成员变量
  }
}

```

## 纯函数

**相同的输入**永远只有**相同的输出**

```js
function add(a, b) {
  return a + b
}
```

#### 纯函数的好处

因为没有副作用，所以可以用来做缓存函数

```js
function memoize(fn) {
  const cache = new Map()
  return function () {
    let arg = JSON.stringify(arguments)
    cache[arg] = cache[arg] || fn.apply(fn, arguments)
    return cache[arg]
  }
}
```

## 柯里化

- 当一个函数有多个参数时，先传递一部分参数调用它
- 返回新的函数接收剩余的参数

```js
// 普通函数
function funcA(age) {
  let min = 18
  return age > 18
}

// 柯里化
function funcB(min) {
  return function(age) {
    return age > min
  }
}

const fc = funcB(18)
fc(20)

```
