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
function func(s) {
  if (s.length == 1) return s
  let res = ''
  for (let i = 0; i < s.length; i++) {
    let l = i - 1
    let r = i + 1
    if (s[i] === s[l] && res.length < 2) res = s.slice(l, i + 1)
    if (s[i] === s[r] && res.length < 2) res = s.slice(i, r + 1)
    while (l >= 0 && r < s.length && s[l] == s[r]) {
      l--
      r++
      if (r - l - 1 > res.length) {
        res = s.slice(l + 1, r)
      }
    }
  }
  return res
}

const res = func('abad')
console.log(res)
