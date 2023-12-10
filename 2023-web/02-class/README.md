# 类与继承

## JS 对象创建

### 创建一个对象有几种方法

#### Object.create()

相当于创建了一个对象，`proto`指向里面的对象

`let p = Object.create(q);` -> `p.__proto__=q`

例如：
```js
const foo = Object.create({})
const bar = {}

foo.__proto__.__proto__ === Object.prototype
bar.__proto__ === Object.prototype
```

#### new 关键字

```js
function Person(name) {
  this.name = name
}
Person.prototype.sayName = function() {
  console.log(this.name)
}
const p = new Person('huang')
```

这里面有三层关系:
- p.__ptoro__ === Person.prototype
- Persion.prototype.constructor === Person
- p.constructor === Person

什么是原型（prototype）：
本质上是一个对象，挂载了属性和方法；**其中有个`constructor`属性，指向构造函数本身**

##### new 关键字，实际上做了什么

- 创建了一个对象
- 对象的原型指向 `Function` 的 `prototype`
- 该对象实现了这个构造函数的方法
- 根据一些特定情况，返回对象
     - 如果构造函数没有返回值，就返回创建的对象
     - 如果有返回值，但是返回值是对象，则返回该对象
     - 如果有返回值，但返回不是一个对象，则返回创建的对象
```js
function newFunc(Father) {
  // 1. 判断是否为一个function
  if (typeof Father != 'function') {
    throw new Error('new operator fucntion the first param must be function')
  }
  // 2. 创建一个对象，其 __proto__ 要指向构造函数的原型
  const obj = Object.create(Father)
  // 3. 执行传入的函数，获取返回值
  const res = Father.apply(obj, Array.prototype.slice.call(arguments, 1))
  // 4. 判断执行结果并输出
  return res && typeof res != 'object' && res !== null ? res : obj
}

function Person(name) {
  this.n = name
}

const p = newFunc(Person, 'huang')

console.log(p.n) // huang
```
