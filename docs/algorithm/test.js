class ListNode {
  constructor(val, next) {
    this.val = val ? val : 0
    this.next = next ? next : null
  }
}

function generateListNode(arr) {
  let res = new ListNode()
  let head = res
  for (let i = 0; i < arr.length; i++) {
    head.val = arr[i]
    if (i === arr.length - 1) {
      break
    }
    head.next = new ListNode()
    head = head.next
  }
  return res
}

// const res = []

// func1(n, 0, 0, '')
// return res

// function func1(n, lc, rc, str) {
//   if (lc === n && rc === n) {
//     res.push(str)
//   } else {
//     if (lc < n) func1(n, lc + 1, rc, str + '(')
//     if (rc < n && lc > rc) func1(n, lc, rc + 1, str + ')')
//   }
// }

/**
 * 上面是ListNode链表类 generateListNode(arr)
 * 下面才是正式代码编写的开始
 */

function func(n) {
  // 使用一个变量存储结果
  const res = []
  func1(n, 0, 0, '')
  return res

  /**
   *
   * @param {*} n 传入的对数
   * @param {*} lc 左括号的数量
   * @param {*} rc 右括号的数量
   * @param {*} str 已经组合的字符
   */
  function func1(n, lc, rc, str) {
    if (lc === n && rc === n) {
      res.push(str)
      return
    } else {
      // 如果还有左括号的剩余数，先加入左括号
      if (lc < n) func1(n, lc + 1, rc, str + '(')
      // 如果还有右括号，并且右括号小于左括号
      if (rc < n && rc < lc) func1(n, lc, rc + 1, str + ')')
    }
  }
}

const res = func(3)

console.log(res)
