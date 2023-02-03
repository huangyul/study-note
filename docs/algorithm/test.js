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

/**
 * 上面是ListNode链表类 generateListNode(arr)
 * 下面才是正式代码编写的开始
 */
//  输入：nums = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat']
//  输出：[["bat"],["nat","tan"],["ate","eat","tea"]]
function func(n) {
  let start = Date.now()
  // if (n <= 2) {
  //   return n
  // }
  // const pd = []
  // pd[0] = 1
  // pd[1] = 2
  // for (let i = 2; i < n; i++) {
  //   pd[i] = pd[i - 1] + pd[i - 2]
  // }
  // console.log(Date.now() - start)
  // return pd[n - 1]


  function func1(a, b, n) {
    if (n === 0) return b
    return func1(b, a + b, n - 1)
  }
  const res = func1(0, 1, n)
  console.log(Date.now() - start)
  return res

}

const res = func(45)
console.log(res)
