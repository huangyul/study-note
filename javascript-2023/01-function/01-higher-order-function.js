// // 高级函数-函数作为参数
// function forEach(array, fn) {
//   for (let i = 0; i < array.length; i++) {
//     fn(array[i])
//   }
// }


// // filter
// function filter(array, fn) {
//   const res = []
//   for (let i = 0; i < array.length; i++) {
//     if (fn(array[i])) {
//       res.push(array[i])
//     }
//   }
//   return res
// }

// // 测试
// const arr = [1, 2, 3, 4]
// console.log('foreach')
// forEach(arr, function (item) {
//   console.log(item)
// })
// console.log('filter')
// const res = filter(arr, function (item) {
//   return item > 2
// })
// console.log(res)

// // 函数作为返回值
// console.log('函数作为返回值')
// function once(fn) {
//   let done = false
//   return function () {
//     if (!done) {
//       done = true
//       return fn.apply(this, arguments)
//     }
//   }
// }

// const pay = once(function (money) {
//   console.log(`支付了${money}`)
// })
// pay(5)
// pay(5)
// pay(5)

function memoize(fn) {
  const cache = new Map()
  return function () {
    let arg = JSON.stringify(arguments)
    cache[arg] = cache[arg] || fn.apply(fn, arguments)
    return cache[arg]
  }
}

function getArea(n) {
  console.log(n)
  return n + 2
}

const fn = memoize(getArea)
console.log(fn(3))
console.log(fn(3))
console.log(fn(3))
