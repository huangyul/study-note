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
//  输入：nums = [1,2,3]
//  输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
function func(nums) {
  let res = []
  let used = {}

  const dfs = (temp) => {
    if (temp.length === nums.length) {
      res.push([...temp])
      return
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) {
        continue
      }
      temp.push(nums[i])
      used[i] = true
      dfs(temp)
      temp.pop()
      used[i] = false
    }
  }
  dfs([])
  return res
}

const res = func([1, 2, 3])
console.log(res)
