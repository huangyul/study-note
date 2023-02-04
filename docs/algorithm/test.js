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
  let start = -1
  let end = nums.length
  let cur = 0
  while (cur < end) {
    if (nums[cur] === 0) {
      ;[nums[cur], nums[start + 1]] = [nums[start + 1], nums[cur]]
      cur++
      start++
    } else if (nums[cur] === 2) {
      ;[nums[cur], nums[end - 1]] = [nums[end - 1], nums[cur]]
      end--
    } else {
      cur++
    }
  }
  return nums
}

const res = func([2, 0, 1])
console.log(res)
