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
    return
  }
  // 在每一个扫描点计算以该点数值为结束点的子数列的最大和（正数和）。
  let max_ending_here = nums[0]
  let max_so_far = nums[0]

  for (let i = 1; i < nums.length; i++) {
    // 以每个位置为终点的最大子数列 都是基于其前一位置的最大子数列计算得出,

    max_ending_here = Math.max(nums[i], max_ending_here + nums[i])
    max_so_far = Math.max(max_so_far, max_ending_here)
  }

  return max_so_far
}

const res = func([-2, 1, -3, 4, -1, 2, 1, -5, 4])
console.log(res)
