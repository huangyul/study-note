# 基础复习

## 一、Javascript 基础

### DOM 常用 API

```javascript
// 获取元素
const oDiv = document.getElementById('idName')

// 新建元素
const oDiv2 = document.createElement('div') // 标签名
oDiv2.innnerHTML = 'div2'

// 插入元素
oDiv.appendChild(oDiv2)

// 删除元素
oDiv.removeChild(oDiv2)
```

### null 和 undefined 的区别

`null`:

1. `Number(null)`得到 0
2. 作为函数的参数，表示该函数的参数不是对象
3. 作为对象原型链的重点

`undefined`:

1. `Number(undefined)`得到`NaN`
2. 变量被声明但没有赋值就等于`undefined`
3. 调用函数时，对应的参数没有提供，也是`undefined`
4. 对象没有赋值，这个属性的值为`undefined`
5. 函数没有返回值，默认返回`undefined`

### 事件流

事件流分为三个阶段：1、事件捕获，2、目标，3、事件冒泡

###### addEventListener

语法: `target.addEventListener(type, handler, options/useCapture)`

1. `type`: 表示监听事件类型的字符串
2. `handler`: 处理的事件

?> addEventListener 的第三个参数涉及到冒泡和捕获，为 true 时是捕获，为 false（默认值）时是冒泡

?> 第三个参数是一个对象{passive:true}，针对的是 Safari 浏览器，禁止/开启使用滚动的时候要用到

###### 阻止冒泡 event.stopPropagation()

```javascript
document.querySelector('#li').addEventListener('click', () => {
  console.log('li')
})
const btn = document.querySelector('#btn')
btn.addEventListener('click', () => {
  console.log('button')
  event.stopPropagation() // li就不会显示
})
```

###### onmouseover 和 onmouseenter 区别

前者发生移动就会触发，例如在节点的子节点发生移动也会触发；而后者只有在第一次进入会触发

### 实现 sleep

```javascript
async function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

async function foo() {
  await sleep(2000)
  console.log(123)
}

foo()
```

### 函数式编程

函数式编程是一种编程范式，把计算看作是对数学函数的评估，避免了状态的变化和数据的可变

1. 纯函数

如果给定相同的参数，则返回相同的结果（不依赖外部的状态）；它不会引起任何副作用（不修改全部变量和传参）。

例如：

```javascript
// 计算圆面积
const calculateArea = (r) => r * r * PI
const calculateArea2 = (r, pi) => r * r * pi
```

第一个不是纯函数，因为会依赖外部的变量 PI，而第二个是

```javascript
const add(value) {
  return value + 1
}
```

以上函数也是纯函数

**纯函数的好处**  
容易测试，不依赖任何外部变量，同时也不污染外部的变量

```javascript
const values = [1, 2, 3, 4, 5]

let sumOfValues = 0

// 会修改sumOfValues和i的值
function sum1() {
  for (let i = 0; i < values.length; i++) {
    sumOfValues += values[i]
  }
}

// 使用递归
function sum(list, accumulator) {
  if (list.length == 0) {
    return accumulator
  }

  return sum(list.slice(1), accumulator + list[0])
}

console.log(sum(values, sumOfValues))
```

### PWA

PWA(Progressive Web Apps，渐进式 Web 应用)，将 Web 网页服务打包提供类似原生安装应用对的使用体验；跟微信小程序很像，但与微信小程序的区别是，微信小程序的使用前提是安装微信，而 PWA 不需要，大部分浏览器已经可以支持 PWA 应用

### 数组去重

```javascript
const oldArr = [1, 1, 2, 2, 3, 3]
// 第一种方法
const newArr = []
for (let i = 0; i < oldArr.length; i++) {
  if (!newArr.includes(oldArr[i])) {
    newArr.push(oldArr[i])
  }
}

// set
const newArr = [...new Set(oldArr)]

// filter
const newArr = oldArr.filter(
  (item, index) => oldArr.lastIndexOf(item) === index
)
```

### 数字化金额

```javascript
// 方法一
console.log(Number(num).toLocaleString('en-us'))
```

### 遍历数组空值

1. `forEach()`、`filter()`、`reduce()`、`every()` 和 `some()` 都会跳过空位。
2. `map()` 会跳过空位，但会保留这个值
3. `join()` 和 `toString()` 会将空位视为 `undefined`，而 `undefined` 和 `null` 会被处理成空字符串

### let 与 var

```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i)
  }, 1000)
} // 55555

for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i)
  }, 1000)
} // 01234
```

以上区别在于 var 会造成全局污染，而 setTimeout 又说宏任务，等到 script 执行完后，收集到 i 是 5；而使用 let，会再 for{}形成作用域

### 暂时性死区

```javascript
let a = 1
let test = function () {
  console.log(a)
  a++
}

test()

let b = 1
let test2 = function () {
  console.log(b)
  let b = 2
  b++
}

test2() // Error
```

第二个方法报错的原因是 `let` 没有变量提升，所以在{}中出现了暂时性死区

```javascript
console.log(a)

var a = 1 // var 有变量提升，但提前使用会是 undefined
```
