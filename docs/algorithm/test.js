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
// function func(strs) {
//   var h = new Map(),
//     k
//   for (var i = 0; i < strs.length; i++) {
//     k = strs[i].split('').sort().join('')
//     h.has(k) ? h.get(k).push(strs[i]) : h.set(k, [strs[i]])
//   }

//   return Array.from(h.values())
// }

function func(strs) {
  let k,
    h = new Map()
  for (let i = 0; i < strs.length; i++) {
    k = strs[i].split('').sort().join('')
    h.has(k) ? h.get(k).push(strs[i]) : h.set(k, [strs[i]])
  }
  console.log(h.values())
  return Array.from(h.values())
}

const res = func(['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])
console.log(res)
