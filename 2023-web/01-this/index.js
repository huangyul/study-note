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

console.log(o1.fn())
console.log(o2.fn())
console.log(o3.fn())
