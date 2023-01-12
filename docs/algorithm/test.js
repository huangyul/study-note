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
//  输入：nums = [5,7,7,8,8,10], target = 8
//  输出：[3,4]
function func(nums, target) {
  if (nums.length === 0) return [-1, -1]
  let l = 0
  let r = nums.length - 1
  const res = []
  while (l <= r) {
    let mid = l + ((r - l) >> 1)
    if (nums[mid] === target) {
      let l1 = mid
      let l2 = mid
      while (l1 >= l && nums[l1] === nums[l1 - 1]) {
        l1--
      }
      while (l2 <= r && nums[l2] === nums[l2 + 1]) {
        l2++
      }
      return [l1, l2]
    } else if (nums[mid] > target) {
      r--
    } else {
      l++
    }
  }
  return [-1, -1]
}

const res = func([5,7,7,8,8,10], 6)
console.log(res)

//https://leetcode.cn/problems/search-in-rotated-sorted-array/solutions/221747/pythonjs-er-fen-fa-33-sou-suo-xuan-zhuan-pai-xu-sh/?orderBy=most_votes&languageTags=javascript
