# this 指针 & 闭包 & 作用域

## 变量提升

`var`会变量提升

```js
console.log(a)
var a = 1
```

相当于

```js
var a
console.log(a)
a = 1
```

所有会输出`undefined`

## JS，变量赋值和使用

`var a = 2`

`var a`:
编译器会先找当前作用域：
- 如果找到，会忽略
- 没找到，会新生成一个

`a = 2`:
编译器会从当前作用域开始找：
- 如果找到，就赋值为2
- 如果找不到，就往上级作用域找

## 作用域

> 就是根据名称查找变量的规则

### 词法作用域

定义在词法阶段的作用域，就是写了代码，但是还没执行的时候。   
因此，当词法分析器处理代码时，会保持作用域不变。

### 函数作用域

在函数中可以使用的变量的范围

## 上下文

- 词法作用域：定义时确定的
- 动态作用域：运行时确定的

### 练习题
```js
foo(10)

function foo (num) {
  var foo 
  console.log(foo)
  foo = num
  console.log(foo)
}
console.log(foo)
foo = 1
console.log(foo)
```

输出 `undefined, 10, Function, 1`   
注意执行函数时的变量就好

## 闭包

函数嵌套函数，内层函数引用了外层函数作用域下的变量，并且内层函数在外部被调用了

```js
func newGenerator() {
  let num = 1
  return function() {
    console.log(num)
  }
}

var getNum = newGenerator()

getNum()
```

## this

this 的指向，根据上下文，动态决定的：
- 在简单调用，`this`默认指向window / global / undefined
- 在对象调用时，绑定在对象上
- 使用call，bind，apply时，绑定在指定的参数上
- 使用new关键字时，绑定在新创建的对象上（new > apply > 对象）
- 使用箭头函数，根据外层规则决定

例一：
```js
const foo = {
  bar: 1
  fn: function() {
    console.log(this)
    console.log(this.bar)
  }
}

var fn1 = foo.fn

fn1() // 简单调用，输出window，undefined
foo.fn()  // 对象调用，输出 foo，1
```

例二：
```js
const foo = {
  name: 'foo',
  bar: {
    name: 'bar',
    fn: function() {
      console.log(this.name)
    }
  }
}

foo.bar.fn() // 输出 bar，谁调用就是输出谁的
```

例三：
```js
const o1 = {
  text: 'o1',
  fn: function () {
    return this.text
  }
}

const o2 = {
  text: 'o2',
  fn: function () {
    return o1.fn()
  }
}

const o3 = {
  text: 'o3',
  fn: function () {
    var fn = o1.fn
    fn()
  }
}

console.log(o1.fn()) // o1
console.log(o2.fn()) // o1 因为这里是o1调用自己的fn
console.log(o3.fn()) // undefined 这里是直接调用fn函数，this指向window

```
