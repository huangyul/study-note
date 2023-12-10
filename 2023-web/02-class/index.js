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
