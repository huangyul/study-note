# Javascript

?> 基于**Javascript 高级教程第四版**的深入学习

## 变量、作用域与内存

### 一、原始值与引用值

**原始值**就是最简单的数据，**引用值**是由多个值构成的对象

原始值包括：`Undefined` `Null` `Boolean` `Number` `String` `Symbol`

#### 1、动态属性

**引用值**可以随意添加、修改和删除其属性和方法，而**原始值**则不行（不会报错，但没意义）

```javascript
let person = new Object()
person.name = 'xxx' // OK
let num = 12
num.name = 'xxx' // undefined
```

#### 2、复制值

**原始值**被复制时会到新的变量位置，与原变量无关，**引用值**只是复制指向同一个对象的指针，会相互影响

```javascript
let num1 = 1
let num2 = num1 // num2与num1互补干扰

let obj1 = { name: 'xxx' }
let obj2 = obj1 // 两个变量指向同一个对象
obj2.name = 'yyy' // 此时obj1的name也变成yyy
```

#### 3、传递参数

?> 所有函数的参数都是按值传递的，意味着函数外的值会被复制到函数内部的参数中，就像从一个变量复制到另一个变量一样。

引用值传参的特殊情况

```javascript
function setName(obj) {
  obj.name = 'xxx'
  obj = new Object() // 此时在函数内部被重写，变成指向本地对象的指针
  obj.name = 'yyy'
}
```

#### 4、确定类型

在判断*原始类型*时可以使用`typeof`

```javascript
console.log(typeof 1) // number
console.log(typeof '1') // string
console.log(typeof undefined) // undefined
console.log(typeof true) // boolean
```

在判断*引用类型*时，使用`instanceof`

```javascript
console.log({ name: 'xxx' } instanceof Object)
console.log([1, 2] instanceof Array)
```

### 二、执行上下文与作用域

1. **上下文**决定了变量或函数可以访问哪些数据，以及它们的行为；
2. 每个函数都有自己的**执行上下文**。当函数被调用时，函数的上下文被推到一个上下文栈，在执行完之后，再弹出该栈，ECMAScript 程序的执行流就是通过这个上下文进行控制的；
3. 上下文中的代码在执行的时候，会创建变量对象的一个**作用域链**

```javascript
let color = 'xxx'

function func1() {
  let color1 = 'xx'

  function func2() {
    let color2 = 'xx'
    // 这里可以访问color2、color1、color
  }
  // 这里可以访问color1、color
}
// 这里可以访问color

// 以上形成了各自的作用域链
```

#### 1、作用域链增强

有两种方式可以增强作用域链：

1. try/catch 语句的 catch
2. with 语句

#### 2、变量声明

`let`、`const`、`var（尽量不用）`

##### 1、var

1. 存在变量提升；
2. 在全局定义的变量会变成 window 的属性；

##### 2、let

块级作用域声明，作用域由最近的一堆`花括号{}`界定

与 var 的区别：

1. let 不能重复声明，var 重复声明会覆盖；

##### 3、const

定义了就不能改，但如果是对象或数组，可以修改内部的值

```javascript
const a = { name: 'xxx' }
a.name = 123
a.age = 123
```

### 三、垃圾回收

> javascript 通过自动内存管理实现内存分配和闲置资源回收。  
> 基本思路是：确定那个变量不再使用，就释放它占用的内存。

#### 标记清理

当变量进入上下文时，这个变量就被加上存在于上下文的标记，当变量离开上下文时，也会被加上离开上下文的标记。然后垃圾回收程序在做一次内存清理。

#### 引用计数

对每一个值记录它被引用的次数，被引用加一，取消引用加一，当等于 0 时，就可以删除回收内存；会造成一个严重的问题：**循环引用**。

## 基本引用类型

?> 引用值（或者对象）是某个特定**引用类型**的实例；引用类型就是把数据和功能组织到一起的结构。

### 一、Date

基本语法：`let now = new Date()`

#### 常用方法：

1. 获取当前时间戳（毫秒数）`Date.now()`
2. 格式化时间 `new Date().toLocaleDateString()/toLocaleTimeString()`
3. 获取时间 `getFullYear()`,`getMonth()`,`getDate()`,`getDay()`,`getHours()`,`getMinutes()`,`getSecends()`

### 二、RegExp（正则表格式）

语法：`let expression = /pattern/flags`

**pattern**：模式，**flags**：标记

**标记：**

1. g：全局
2. i：不区分大小写
3. m：多行
4. y：粘附
5. u：Unicode 模式
6. s：dotAll 模式，表示元字符

简单使用示例：

```javascript
// 匹配所有at
let p = /at/g

// 匹配第一个"bat"或"cat"，忽略大小写
let p = /[bc]at/i

// 匹配所有以at结尾的组合，忽略大小写
let p = /.at/gi

// 匹配所有以.at结尾的组合，忽略大小写
let p = /\.at/gi
```

### 三、原始值包装类型

为了方便操作原始值，ECMAScript 提供了三个特殊的引用类型：`Boolean`、`Number`和`String`

实现的原理：

```javascript
let s1 = 'xxx' // 创建一个新的String实例
let s2 = s1.substring(2) // 调用实例的特定方法
// 销毁实例
```

#### Number

继承的方法：

1. `valueOf()` 返回原始数值  
   `(10).valueOf() // 10`
2. `toLocaleString()` 返回字符串
3. `toString()` 返回字符串（可指定基数）  
   `(10).toString(16) // 返回十六进制`

数值格式化：

1. toFixed(): 返回包含指定小数点位数的数值字符串（四舍五入）  
   `(1.222).toFixed(2) // 1.22`
2. toExponential(): 返回以科学计数法表示的数值字符串  
   `(10).toExponential(1) // '1.0e+1'`

安全整数（是否会溢出）: `Number.isInterger()`

#### String

#### 字符串操作方法

1. concat()：用于将一个或多个字符串拼接成一个新字符

```javascript
let str = '123'
let str = str.concat('456') // 123456
```

2. slice()、substr()、substring()：截取字符串

`slice()`和`substring()`第一个参数是开始截取的位置，第二个结束的位置（不包含）；`substr()`第一个参数是开始位置，第二个是要截取的个数；

例如：

```javascript
let str = 'hello world'

console.log(str.slice(3)) // lo world
console.log(str.substring(3)) // lo world
console.log(str.substr(3)) // lo world

console.log(str.slice(3, 7)) // lo w
console.log(str.substring(3, 7)) // lo w
console.log(str.substr(3, 7)) // lo worl
```

!>`ECMAScript`没有对`substr()`方法进行标准化，因为尽量不要使用

3. 字符串位置：indexOf()和 lastIndexOf()

在字符串中查找子字符串，如果没有找到，就返回-1，如果找到，就返回字符位置

4. 字符串包含方法：`includes()`、`startsWith()`、`endsWith()`

检查是否包括子字符串，返回`boolean`值

5. trim(): 去掉前后空格 trimStart()：只去前空格 trimEnd(): 只去后空格

```javascript
let str = ' hello world '

console.log(str.trim())
console.log(str.trimStart())
console.log(str.trimEnd())
```

6. repeat(),repeatALl()：替代

```javascript
let str = 'hhhhh'

console.log(str.replace('h', 's')) // shhhh
console.log(str.replaceAll('h', 's')) // sssss
```

7. 解构

```javascript
let str = 'huang'

console.log([...str]) // [ 'h', 'u', 'a', 'n', 'g' ]
```

8. 大小写转换: `toUpperCase()`，`toLowerCase()`

```javascript
let str = 'huang'

console.log(str.toUpperCase()) // HUANG
console.log(str.toLowerCase()) //huang
```

### 四、单例内置对象

内置对象：由`ECMAScript`实现提供，并且在程序开始执行就存在的对象

#### Global

`Global`对象是一种兜底对象，也就是全局变量和方法挂载的对象（浏览器的为`window`对象）

1. URL 编码

encodeURI()和 encodeURIComponent()方法用于将 url 转换成浏览器可以理解的字符

```javascript
let url = 'http://www.wrox.com/illegal value.js#start'

console.log(encodeURI(url)) // http://www.wrox.com/illegal%20value.js#start
console.log(encodeURIComponent(url)) // http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.js%23start
```

?> encodeURIComponent()更彻底，所有一般使用这个

解码：`decodeURI` 对应 `encodeURI` ；`decodeURIComponent` 对应 `decodeURIComponent`

#### Math

提供一些辅助计算的属性和方法

1. `min()`和`max()`

```javascript
console.log(Math.min(1, 2, 3)) // 1
console.log(Math.max(1, 2, 3)) // 2
const arr = [1, 2, 3]
console.log(Math.max(...arr)) // 解构的使用方式
```

2. 数值取舍

`Math.ceil()` 向上取整  
`Math.floor()` 向下取整  
`Math.round()` 四舍五入  
`Math.fround()` 返回单精度（32）位显示

3. 随机数 `random`

返回 0-1 范围内的随机数，包含 0，不包含 1

```javascript
// 使用实例
console.log(Math.floor(Math.random() * 10 + 1)) // 1 - 10 的随机数
```

## 集合引用类型

- 对象
- 数组
- Map、WeakMap、Set 以及 WeakSet

### Object

创建 Object

```javascript
// 使用构造函数
let persion = new Object()
persion.name = 'xxx'

// 使用对象字面量(推荐使用)
let persion = { name: 'xxx' }
```

### Array

#### 创建数组

过去的创建方法都不太好，建议使用新增的`from()`和`of()`，`from()`将类数组结构转换为数组实例，`of()`将一组参数转换为数组实例

```javascript
// 所有可迭代的对象都可以使用from
console.log(Array.from('123')) // [ '1', '2', '3' ]
// 如果参数是数组，则原样返回
console.log(Array.from([1, 2, 3])) // [ 1, 2, 3 ]
// 使用第二个参数可以加工数据
console.log(Array.from('123', (x) => x * x)) // [ 1, 4, 9 ]

// 用于弥补new Array不好的创建方法
console.log(Array.of(1)) // [1]
```

#### 检测数组

`Array.isArray()`

```javascript
console.log(Array.isArray([])) // true
```

#### 迭代器

`keys()`返回数组索引  
`values()`返回数组元素
`entries()`返回索引/值对

#### 复制和填充

copyWithin() fill()

#### 操作数组方法

`push()`数组末端推入
`pop()`数组末端推出
`shift()`数组首部推出
`unshift()`数组首部推入

#### 排序方法

`reverse()`将数据反向排序  
`sort()`按字符串排序

```javascript
const arr = [1, 2, 10, 15, 3, 32]

console.log(arr.sort((a, b) => a - b))
```

#### 连接数组

`concat()`或`[...arr, ...arr2]`

#### 操作数据

`slice()`与字符串的很像，不改变数组

`splice()`会改变原来的数组

```javascript
const arr = [1, 2, 3]
// 替换
arr.splice(0, 1, 5) // [5, 2, 3]
console.log(arr)
// 删除
arr.splice(0, 1)
console.log(arr) // [2, 3]
// 插入
arr.splice(0, 0, 5) // [5, 2, 5]
console.log(arr)
```

#### 数组搜索

`indexOf()`找不到返回负 1，找到返回索引  
`lastIndexOf()`从末尾开始找  
`includes()` 返回 boolean

#### 数组断言

`find()`和`findIndex()`一个返回第一个元素（只会返回一个），一个返回元素的索引

```javascript
const arr = [1, 2, 3]

console.log(arr.find((item, index, arr) => item === 2)) // 2
```

#### 迭代方法

1. `every` 对数组的每一项都运行传入的函数，如果每一个函数都返回`true`，则这个方法返回`true`
2. `filter` 对数组的每一个项都运行传入的函数，返回函数返回`true`的项的数组
3. `forEach` 对数组每一项都运行传入的函数，没有返回值
4. `map` 对数组每一项都运行传入的函数，返回每次函数调用的结果的数组
5. `some` 对数组每一项都运行传入的函数，如果有一项返回`true`，则返回`true`

#### 归并方法

`reduce()`和`reduceRigth()`

```javascript
const arr = [1, 2, 3]

console.log(arr.reduce((p, c) => p + c)) // 6
```

### Map

键值对的数据结构

#### 定义

`const m = new Map([['key1', 'val1']])`

```javascript
const m = new Map([
  [1, 1],
  [2, 3],
  [4, 5],
])

console.log(m) // Map(3) { 1 => 1, 2 => 3, 4 => 5 }
```

#### 增删改查

?> 初始化后，只能通过方法增删改查

1. 增 set() `m.set('key','val1')`
2. 删 delete() `m.delete('key')` clear() 删除所有
3. 查 get() `m.get('key')`
4. 判断 has() `m.has()`

#### Map 可以用任何数据结构作为 key

```javascript
const m = new Map()
const funcKey = () => {}
m.set(funcKey, 'function')
console.log(m) // Map(1) { [Function: funcKey] => 'function' }
```

### Set

值的集合，不含重复的值

#### 初始化

`const m = new Set([v1, v2, v3])`

#### 基本操作

1. add() 新增
2. has() 查询
3. delete() 删除 clear() 清空

#### 常用方法：数组去重

```javascript
const arr = [1, 2, 2, 2]
console.log([...new Set(arr)]) // [ 1, 2 ]
const arr1 = [{ name: 1 }, { name: 1 }] // 对对象数组无效
console.log([...new Set(arr1)]) // [ { name: 1 }, { name: 1 } ]
```

## 迭代器与生产器

### 迭代

简单来说就是循环

```javascript
for (let i = 0; i < 10; i++) {
  console.log(i)
}
```

### 迭代器模式

简单来说就是统一所有可迭代的数据结构，通过实现 Iterable 接口，可以统一使用`for..of`进行迭代

#### 1. 可迭代协议

迭代器必须暴露一个属性，用`Symbol.iterator`作为键，这个默认迭代器属性必须引用一个迭代器工厂函数，调用这个工厂函数必须返回一个新的迭代器

检查时候存在默认迭代器属性的

```javascript
let arr = [],
  num = 1

console.log(arr[Symbol.iterator]) // [Function: values]
console.log(num[Symbol.iterator]) // undefined
```

#### 2. 迭代器协议

迭代器是一种一次性使用的对象，用于迭代与其关联的可迭代对象。迭代器 API 使用`next()`方法来遍历数据；每次成功调用`next()`，会返回一个`IteratorResult`对象，包含两个属性：`done`和`value`，`done：true`状态称为耗尽

```javascript
let arr = [1, 2, 3]

// 取出迭代器
const iterator = arr[Symbol.iterator]()

console.log(iterator.next()) // { value: 1, done: false }
console.log(iterator.next()) // { value: 2, done: false }
console.log(iterator.next()) // { value: 3, done: false }
console.log(iterator.next()) // { value: undefined, done: true }
// 迭代器是一次性的，后续继续调用，也会返回doen：true
console.log(iterator.next()) // { value: undefined, done: true }
```

#### 3. 自定义迭代器

```javascript
class Counter {
  constructor(limit) {
    this.limit = limit
  }

  [Symbol.iterator]() {
    // 这样返回，可以每个迭代器都是独立的
    let count = 1,
      limit = this.limit
    return {
      next() {
        if (count <= limit) {
          return { value: count++, done: false }
        } else {
          return { value: undefined, done: true }
        }
      },
    }
  }
}
```

### 生成器

#### 生成器基础

生成器的形式是一个函数，函数名前面加一个星号`*`表示它是一个生成器

```javascript
// 生成器函数声明
function* genratorFn() {}
```

调用生成器函数会产生一个生成器对象，一开始处于暂停，内部实现了`Iterator`接口，调用`next()`方法可以让生成器开始或恢复

```javascript
// 定义一个生成器函数
function* genratorFunc() {}

let g = genratorFunc()

console.log(g) // Object [Generator] {}
console.log(g.next()) // { value: undefined, done: true }
```

#### 通过`yield`中断执行

`yield`可以让生成器停止和开始执行，生成器函数在遇到`yeild`会暂停函数，并将`yeild`后面的值输出

```javascript
function* genratorFunc() {
  yield 123
  yield 3434
  return 999
}

let g = genratorFunc()

console.log(g.next()) // { value: 123, done: false }
console.log(g.next()) // { value: 3434, done: false }
console.log(g.next()) // { value: 999, done: true }
```

1. 生成器对象作为可迭代对象

```javascript
function* generatorFunc() {
  yield 1
  yield 2
  yield 3
}

for (let i of generatorFunc()) {
  console.log(i)
}
// 1 2 3
```
