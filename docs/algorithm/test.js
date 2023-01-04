function func(str) {
  const phone = [
    '',
    '*',
    'abc',
    'def',
    'ghi',
    'jkl',
    'mno',
    'pqrs',
    'tuv',
    'wxyz',
  ]
  // 如果输入的为空，直接返回空数组
  if (!str) {
    return []
  }

  // 定义一个要返回的值
  const res = []

  // 定义一个用于遍历的方法
  // 接收两个参数，第一个是上一次遍历拿到的值，第二个是还需要遍历的值
  function backtrach(letter, strs) {
    // 如果没有要遍历的值，则推入结果并返回
    if(strs.length === 0) {
      res.push(letter)
      return 
    }
    // 取出第一个值和剩余的值
    const [curStr, ...resStr] = strs
    for (let value of phone[curStr]) {
      backtrach(letter + value, resStr)
    }
  }
  backtrach('', str)
  return res
}

console.log(func('23'))
