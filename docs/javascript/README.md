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
