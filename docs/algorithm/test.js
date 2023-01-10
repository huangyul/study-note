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

function func(nums) {
  let i = nums.length - 2 // 向左遍历，i从倒数第二开始是为了nums[i+1]要存在
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    // 寻找第一个小于右邻居的数
    i--
  }
  if (i >= 0) {
    // 这个数在数组中存在，从它身后挑一个数，和它换
    let j = nums.length - 1 // 从最后一项，向左遍历
    while (j >= 0 && nums[j] <= nums[i]) {
      // 寻找第一个大于 nums[i] 的数
      j--
    }
    ;[nums[i], nums[j]] = [nums[j], nums[i]] // 两数交换，实现变大
  }
  // 如果 i = -1，说明是递减排列，如 3 2 1，没有下一排列，直接翻转为最小排列：1 2 3
  let l = i + 1
  let r = nums.length - 1
  while (l < r) {
    // i 右边的数进行翻转，使得变大的幅度小一些
    ;[nums[l], nums[r]] = [nums[r], nums[l]]
    l++
    r--
  }
  return nums
}

function func1(nums) {
  if (nums.length <= 1) {
    return nums
  }

  // 从倒数第二位开始找，保证有i+1的存在
  let i = nums.length - 2
  // 从右到左找出比后一位小的数
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i--
  }
  // i>0表示这个数存在
  if (i > 0) {
    // 从右到左开始找，找出第一个比nums[i]大的数
    let j = nums.length - 1
    while (i < j && nums[i] >= nums[j]) {
      j--
    }
    // 交换值
    ;[nums[i], nums[j]] = [nums[j], nums[i]]
  }
  // 最后只需处理i后面的数，将它们升序排好，就获得下一个排列数
  let l = i + 1
  let r = nums.length - 1
  while (l < r) {
    ;[nums[l], nums[r]] = [nums[r], nums[l]]
    l++
    r--
  }
}

const nums = [1, 5, 2, 4, 3, 2]
const res = func1(nums)
console.log(nums)
// console.log(res)
