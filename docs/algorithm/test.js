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
function func(nums) {
  if (!nums.length) {
    return 0
  }
  let curMax = nums[0]
  let res = nums[0]

  for (let i = 1; i < nums.length; i++) {
    curMax = Math.max(nums[i], curMax + nums[i])
    res = Math.max(curMax, res)
  }
  return res
}

const res = func([-2, 1, -3, 4, -1, 2, 1, -5, 4])
console.log(res)
