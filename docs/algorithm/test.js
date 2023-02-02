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
function func(intervals) {
  let res = []
  intervals = intervals.sort((a, b) => a[0] - b[0])
  let prev = intervals[0]
  for(let i = 1; i < intervals.length;i++) {
    let cur = intervals[i]
    if(prev[1] >= cur[0]) {
      prev[1] = Math.max(prev[1], cur[1])
    } else {
      res.push(prev)
      prev = cur
    }
  }
  res.push(prev)
  return res
}

const res = func([
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18],
])
console.log(res)
