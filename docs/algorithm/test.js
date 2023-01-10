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
//  输入：nums = [4,5,6,7,0,1,2], target = 0
//  输出：4
function func(nums, target) {
  // 时间复杂度：O(logn)
  // 空间复杂度：O(1)
  // [6,7,8,1,2,3,4,5]
  let start = 0
  let end = nums.length - 1

  while (start <= end) {
    const mid = start + ((end - start) >> 1)
    if (nums[mid] === target) return mid

    // [start, mid]有序

    // ️⚠️注意这里的等号
    if (nums[mid] >= nums[start]) {
      //target 在 [start, mid] 之间

      // 其实target不可能等于nums[mid]， 但是为了对称，我还是加上了等号
      if (target >= nums[start] && target <= nums[mid]) {
        end = mid - 1
      } else {
        //target 不在 [start, mid] 之间
        start = mid + 1
      }
    } else {
      // [mid, end]有序

      // target 在 [mid, end] 之间
      if (target >= nums[mid] && target <= nums[end]) {
        start = mid + 1
      } else {
        // target 不在 [mid, end] 之间
        end = mid - 1
      }
    }
  }

  return -1
}

const res = func([4, 5, 6, 7, 8, 9, 0, 1, 2], 0)
console.log(res)

//https://leetcode.cn/problems/search-in-rotated-sorted-array/solutions/221747/pythonjs-er-fen-fa-33-sou-suo-xuan-zhuan-pai-xu-sh/?orderBy=most_votes&languageTags=javascript
