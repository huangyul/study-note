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
  const res = []

  const dfs = (index, list) => {
    res.push(list.slice()) // 调用子递归前，加入解集
    for (let i = index; i < nums.length; i++) {
      // 枚举出所有可选的数
      list.push(nums[i]) // 选这个数
      dfs(i + 1, list) // 基于选这个数，继续递归，传入的是i+1，不是index+1
      list.pop() // 撤销选这个数
    }
  }
  dfs(0, [])
  return res
}

const res = func([1, 2, 3])
console.log(res)
