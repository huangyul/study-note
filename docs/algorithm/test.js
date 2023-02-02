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
  // 以每一个数为终点算出可能的最大值
  // 下一个数为终点的最大值就是上一个数的最大值加当前的数
  if(!nums.length) {
    return 0
  }
  let curMax = nums[0]
  let res = nums[0]
  for(let i = 1; i < nums.length; i++) {
    curMax = Math.max(curMax + nums[i], nums[i])
    res = Math.max(curMax, res)
  }
  return res
}

const res = func([])
console.log(res)
