# Javascript

?> 基于**Javascript 高级教程第四版**的学习笔记

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

## 对象、类与面向对象编程

### 1、理解对象

对象是一组属性的无序集合。

#### 1.1、属性的类型

ECMAScript 使用一些内部特性来描述属性的特性；开发者不能在 Javascript 中直接访问这些特性；为了将某个特性标识为内部特性，规范会用两个中括号把特性的名称括起来

###### 数据属性

数据属性包含一个保存数据值的位置，大白话就是用来描述该属性的一些特性

1. `[[Configurable]]`:表示属性是否可以通过`delete`删除并重新定义，是否可以修改它的特性，以及是否可以把它改为访问器属性，默认情况下都为`true`
2. `[[Enumerable]]`:表示属性是否可以通过`for-in`循环返回，默认情况都是`true`
3. `[[Writable]]`:表示属性的值是否可修改，默认都是`true`
4. `[[Value]]`:包含属性实际的值，默认是`undefined`

要修改属性的默认特性，必须使用`Object.defineProperty()`，该方法接受三个参数：要操作的对象，属性的名称，描述符对象

```javascript
// 定义一个空对象
let person = {}

// 添加一个name属性的值，并修改默认特性不能修改该值
Object.defineProperty(person, 'name', {
  value: 'hhh',
  writable: false,
})

console.log(person.name) // hhh
person.name = '123'
console.log(person.name) // hhh
```

!> 正常情况下，很少使用`Object.defineProperty()`来修改这些特性

###### 访问属性

访问器属性不包含数据，它包含一个获取函数（`getter`）和设置函数（`setter`）；在读取访问器属性时，会调用获取函数，函数要返回一个有效的值；在写入访问器属性时，会调用设置函数并传入新值  
访问器属性也是必须通过`Object.definedProperty()`来使用

```javascript
// 定义一个对象，有一个私有属性
let obj = {
  status: '大于零',
  name: 'book1',
}

Object.defineProperty(obj, 'num', {
  get() {
    return this.status
  },
  set(value) {
    if (value > 10) {
      this.status = '大于零'
    } else {
      this.status = '小于零'
    }
  },
})

obj.num = 90
console.log(obj.num)
```

#### 1.2、读取属性的特性

使用`Object.getOwnPropertyDescriptor()`可以获取指定属性的属性描述符

```javascript
// 定义一个对象，有一个私有属性
let obj = {}

Object.defineProperty(obj, 'name', {
  value: 'huang',
  configurable: false,
})

console.log(Object.getOwnPropertyDescriptor(obj, 'name'))
// {
//   value: 'huang',
//   writable: false,
//   enumerable: false,
//   configurable: false
// }
```

#### 1.3、合并对象

`Object.assign()`:接受一个目标对象和一个或多个源对象作为参数 **属于浅拷贝**

```javascript
let obj1 = { name: 123 }
let obj2 = { name2: 123 }
let obj3 = Object.assign(obj1, obj2)
console.log(obj3) // {name: 123, name2: 123}
```

#### 1.4、相等判定

`Object.is()`

```javascript
console.log(Object.is(true, 1)) // false
console.log(Object.is({}, {})) // false
console.log(Object.is('2', 2)) // false
// 正确的 0、-0、+0 相等/不等判定
console.log(Object.is(+0, -0)) // false
console.log(Object.is(+0, 0)) // true
console.log(Object.is(-0, 0)) // false
// 正确的 NaN 相等判定
console.log(Object.is(NaN, NaN)) // true
```

#### 1.5、增强的对象语法

1. 属性值简写：当属性名和变量名一样时，可简写

```javascript
let name = 'xx'
let person = { name } // 等于 {name: name}
```

2. 可计算属性

```javascript
let nameKey = 'name'
let obj = {}
obj[namekey] = 'xxx'
```

3. 简写方法名

```javascript
let person = {
  say() {
    // do something
  },
}
```

#### 1.6、对象解构

```javascript
let obj = {
  myName: 'xxx',
  age: 12,
}
// 变量名不一样时
let { myName: newName, age: newAge } = obj
console.log(newAge, newName)
// 变量名一样时
let { myName, age } = obj
console.log(myName, age)
```

### 2、创建对象

#### 工厂模式

```javascript
function createPerson(name, age) {
  let o = new Object()
  o.name = name
  o.age = age
  o.sayName = function () {
    console.log('Hello,' + o.name)
  }
  return o
}

let p1 = createPerson('xxx', 12)
console.log(p1)
```

虽然可以多次调用函数创建对象，但无法知道创建的是什么对象

#### 构造函数

```javascript
function Person(name, age) {
  this.name = name
  this.age = age
  this.sayName = function ()
}

let p1 = new Person('name', 12)
console.log(p1) // Person { name: 'name', age: 12 }
```

**构造函数的特点：**

1. 没有显式创建对象
2. 属性和方法直接赋值给了`this`
3. 没有`return`
4. 函数名大写，是为了区分普通函数和构造函数

**使用`new`创建对象的过程：**

1. 在内存中创建一个新的对象
2. 这个新的对象内部的`[[Prototype]]`特性被赋值为构造函数的`prototype`属性
3. 构造函数内部的`this`被赋值为这个新对象（即 this 指向新对象）
4. 执行构造函数内部的代码（为新对象添加属性）
5. 如果构造函数返回非空对象，则返回该对象；否则返回刚创建的新对象

###### 构造函数的问题

构造函数内部定义的方法，都是新的函数实例

```javascript
function Person() {
  this.sayName = function () {
    console.log(123)
  }
}

let p1 = new Person()
let p2 = new Person()
console.log(p1.sayName === p2.sayName) // false
```

#### 原型模式

```javascript
function Person(name, age) {
  Person.prototype.name = name
  Person.prototype.age = age
  Person.prototype.sayName = function () {
    console.log('Hello,' + this.name)
  }
}

let p = new Person('hh', 12)
p.sayName()
```

###### 对于原型的理解

在构造函数定义时，构造函数就会有 prototype 属性，该属性也是一个对象，成为原型对象；原型对象有一个 constructor 属性，该属性指回构造函数

```javascript
function Person() {}
// 就有prototype属性
console.log(Person.prototype)
// prototype的constructor指回Person构造函数
console.log(Person.prototype.constructor == Person)
```

实例中的 prototype 指向构造函数的原型，所有将属性和方法定义在构造函数的原型上，就可以共享属性

![](./images/prototype-1.png)

###### 原型层级

在通过对象访问属性时，首先会找对象实例本身，如果本身有，则返回，如果没有，则进入原型对象上找

###### 对象的迭代

`Object.keys()`和`Object.values()`

### 3、继承

`ECMAScript`的继承主要是通过原型链实现的

#### 3.1、原型链

一个原型对象指向另外一个类型的实例

```javascript
function SuperType() {
  this.prototype = true
}

SuperType.prototype.getType = function () {
  return this.prototype
}

function SubType() {
  this.subprototype = false
}

// 继承
SubType.prototype = new SuperType()

SubType.prototype.getSubType = function () {
  return this.subprototype
}

let ins = new SubType()
console.log(ins.getSubType())
console.log(ins.getType())
```

### 4、类

#### 4.1、类的定义

`class Person {}`

###### 类的构成

类可以包含**构造函数方法**、**实例方法**、**获取函数**、**设置函数**和**静态类方法**

#### 4.2、类构造函数

通过`new`关键字定义类时，会主动调用`constructor`构造方法

```javascript
class Person {
  constructor() {
    console.log(123)
  }
}

let p = new Person() // 123
```

#### 4.3、实例、原型和类成员

###### 实例

1. 生成实例要使用`new`
2. 实例的属性要显示定义到 this 上，否则都是定义到原型上

```javascript
class Poins {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  toString() {
    return this.x + this.y
  }
}

const p = new Poins(1, 2)
console.log(p.hasOwnProperty('x')) // true
console.log(p.hasOwnProperty('toString')) // false,在原型对象上
```

3. 所有实例共享一个原型对象

#### 取值函数和存值函数

```javascript
class Person {
  constructor() {}

  get age() {
    return 'getter'
  }

  set age(value) {
    console.log('setter' + value)
  }
}

let p = new Person()
p.age = 12 // setter12
console.log(p.age) // getter
```

#### 静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承，如果在一个方法前加上`static`，则该方法不会被实例继承，直接通过类来调用

```javascript
class Foo {
  static func() {
    console.log(123123)
  }
}

Foo.func() // 123123
```

静态方法中有`this`，则指向类而不是实例

父类的静态方法可以被子类继承

```javascript
class Foo {
  static func() {
    console.log(123)
  }
}

class Bar extends Foo {}

Bar.func()
```

#### 4.4、类的继承

```javascript
class Foo {
  constructor() {
    console.log('父类的构造函数')
  }
}

class Bar extends Foo {
  constructor() {
    // 必须先调用super方法，才能使用this，相当于调用父类的构造函数
    super()
    this.name = 'xxx'
  }
}
const bar = new Bar() // 父类的构造函数
```

###### super

`super`可以作为函数和对象，作为函数时指向父类的构造函数，作为对象时指向父类的原型对象

1. 作为函数时，必须在子类的构造函数中先调用
2. 作为对象时，在普通函数指向父类的原型对象；在静态函数指向父类。

```javascript
class A {
  constructor() {
    this.p = 2
  }
  p() {
    return 2
  }
}
// 父类的原型属性
A.prototype.name = 123
class B extends A {
  constructor() {
    super()
    console.log(super.p) // 访问不到实例方法
    console.log(super.name) // 可以访问原型对象方法，因为普通函数的super指向父类的原型对象
  }
}
let b = new B()
```

##### 混入

```javascript
const a = {}
const b = {}
{...a, ...b}
```

## 代理与反射

### 1、代理基础

代理是目标对象的抽象，它可以用作目标对象的替身，又完全独立于目标对象

###### 创建空代理

代理使用`Proxy`构造函数创建，主要接收两个参数：目标对象和处理程序对象（缺一不可）

```javascript
const target = {
  id: 'target',
}

const handle = {}

const proxy = new Proxy(target, handle)

// 拥有一样的属性
console.log(target.id)
console.log(proxy.id)

// 原对象添加属性，代理也会具备
target.name = 'xxx'
console.log(proxy.name)

// 代理添加属性，原对象也具备
proxy.name2 = 'eee'
console.log(target.name2)
```

###### 捕获器

```javascript
const target = {
  id: 'target',
}

const handle = {
  get() {
    console.log('捕获')
  },
}

const proxy = new Proxy(target, handle)

console.log(target.id) // target
console.log(proxy.id) // 捕获，但没有实际返回 id 的值
```

###### 捕获器参数和反射 API

捕获器接收到的三个参数：目标对象、要查询的属性和代理对象

```javascript
const target = {
  id: 12,
}

const handle = {
  get(target, propKey, receiver) {
    return target[propKey]
  },
}

const proxy = new Proxy(target, handle)

console.log(proxy.id)
```

Reflect：反射，处理程序对象中所有可以捕获的方法都有对象的反射 API 方法，这些方法与捕获器拦截的方法具有相同的名称和函数签名，而且具有与被拦截方法相同的行为  
简单来说就是方便处理捕获的数据

```javascript
const target = {
  id: 12,
}

const handle = {
  get(target, propKey, receiver) {
    return Reflect.get(...arguments)
  },
  // 简写版
  get: Reflect.get,
}

const proxy = new Proxy(target, handle)

console.log(proxy.id)
```

```javascript
const target = {
  num: 123,
  num2: 456,
}

const handle = {
  get(target, propKey, receiver) {
    let desc = ''
    // 通过特殊情况处理
    if (propKey === 'num2') {
      desc = '999'
    }
    return Reflect.get(...arguments) + desc
  },
}

const proxy = new Proxy(target, handle)

console.log(proxy.num) // 123
console.log(proxy.num2) // 456999
```

###### 可撤销代理

```javascript
const target = {
  id: 123,
}

const handle = {
  get() {
    return 999
  },
}

// 定义可撤销代理
const { proxy, revoke } = Proxy.revocable(target, handle)

console.log(proxy.id)
console.log(target.id)

// 撤销代理
revoke()

console.log(proxy.id) // 会报错
```

###### 代理另一个代理

```javascript
const target = {
  id: 1,
}

const proxyFirst = new Proxy(target, {
  get() {
    console.log('第一次代理')
    return Reflect.get(...arguments)
  },
})

// 代理一个代理
const proxySecond = new Proxy(proxyFirst, {
  get() {
    console.log('第二次代理')
    return Reflect.get(...arguments)
  },
})

console.log(proxySecond.id)
// 第二次代理
// 第一次代理
// 1
```

### 2、代理捕获器与反射方法

#### 2.1 get()

在获取属性值的操作中被调用，返回值无限制

```javascript
const target = {
  id: 1,
}

const proxy = new Proxy(target, {
  get(target, propKey, receiver) {
    console.log('get')
    return Reflect.get(...arguments)
  },
})

console.log(proxy.id) // get 1
```

#### set()

在设置值的操作中被调用，返回 true 表示成功，返回 false 表示失败

```javascript
const target = {
  id: 1,
}

const proxy = new Proxy(target, {
  set() {
    console.log('set')
    return Reflect.set(...arguments)
  },
})

proxy.id = 2 // set
```

#### has()

在`in`操作符中被调用

```javascript
const target = {
  id: 1,
}

const proxy = new Proxy(target, {
  has() {
    console.log('has')
    return Reflect.has(...arguments)
  },
})

console.log('id' in proxy) // has true
```

#### defineProperty()

在`Object.defineProperty()`中被调用

```javascript
const target = {
  id: 1,
}

const proxy = new Proxy(target, {
  defineProperty() {
    console.log('defineProperty')
    return Reflect.defineProperty(...arguments)
  },
  get() {
    console.log('get')
    return Reflect.get(...arguments)
  },
})

Object.defineProperty(proxy, 'name', { value: 'xxx' }) // defineProperty
```

## 函数

- 函数表达式、函数声明及箭头函数
- 默认参数及扩展操作符
- 使用函数实现递归
- 使用闭包实现私有变量

函数实际上是对象，也有属性和方法，函数名是指向函数对象的指针

```javascript
// 函数声明式
function func() {}
// 函数表达式
const func2 = function () {}
// 箭头函数
const func3 = function () {}
```

#### 箭头函数

不能使用`arguments`、`super`、`new.target`，也不能作为构造函数

### 函数名

函数名就是指向函数的指针

```javascript
function func() {
  console.log('13')
}

// 不使用括号，只是简单调用函数的指针
const func2 = func
// 使用括号，就是调用函数
func() // 13
```

### 函数参数

- 函数参数在内部是一个数组的形式接收，所以多传，少传都可以
- 使用`arguments`对象可以获取全部传入的参数

```javascript
function func(name) {
  console.log(name)
  console.log(...arguments)
}

func(1, 2, 2, 3, 3) // 1           1 2 2 3 3
```

- 可以使用`arguments[n]`获取第 n 个参数

### 没有重载

当函数名被重写，就等于覆盖

```javascript
function func() {
  console.log(1)
}
func = () => {
  console.log(2)
}
func() // 2
```

### 默认参数值

`function func(name = 'xx') {}`

### 参数扩展与收集

#### 扩展参数

```javascript
let arr = [1, 2]
function sum() {
  let sum = 0
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i]
  }
  return sum
}

// 扩展参数
console.log(sum(...arr))
```

#### 收集参数

```javascript
function sum(...value) {
  // do something
}
```

### 函数声明与函数表达式

- 函数声明有函数声明提升，韩式表达没有

```javascript
sum()

function sum() {
  console.log('sum')
}

sum2()

const sum2 = () => {
  // 报错
  console.log('sum2')
}
```

### 函数作为值

因为函数名是指向函数的变量，所以函数也可以作为另一个函数的参数

```javascript
function sum(a) {
  return a + 10
}

function sum2(func, n) {
  return func(n)
}

console.log(sum2(sum, 3)) // 13
```

### 函数内部

函数内部存在三个特殊的对象：`arguments`、`this`、`new.target`

#### this

在标准函数中，this 引用调用方法的上下文对象；在箭头函数中，this 引用定义时的上下文对象

```javascript
// 要在浏览器环境下
color = 'color'

let o = {
  // color: 'hhh',
}

function func() {
  console.log(this.color)
}

func() // color 全局环境中调用
o.func = func
o.func() // hhh 在对象内调用，上下文是对象

let func2 = () => {
  console.log(this.color)
}

func2() // hhh
o.func2 = func2
o.func2() // hhh
```

#### new.target

检测函数是否用`new`调用

```javascript
function func() {
  if (new.target) {
    console.log('使用new调用')
  } else {
    console.log('没有使用new调用')
  }
}

new func() // 使用new调用
func() // 没有使用new调用
```

### 函数的属性和方法

- 因为函数也是对象，所有也有属性和方法
- 每个函数都有两个属性：`length`和`prototype`
- 函数有三个方法：`apply`、`call`、`bind`，都是用来指定`this`的

### 递归

函数通过函数名调用自己

```javascript
function fac(n) {
  if (n == 1) {
    return 1
  }
  return n * fac(n - 1)
}

console.log(fac(10))

// 优化
function fac2(n) {
  if (n == 1) {
    return 1
  }
  return n * arguments.callee(n - 1)
}
```

### 闭包

闭包指那些引用了另一个**函数作用域中变量**的函数

###### this 对象
