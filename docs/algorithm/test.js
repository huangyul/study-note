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
function func(nums) {
  let n = nums.length - 1
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] >= n - 1) {
      n = i
    }
  }
  return n === 0
}

const res = func([2, 0, 0, 1, 4])
console.log(res)
