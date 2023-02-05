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

  function dfs(index, list) {
    res.push([...list])

    for (let i = index; i < nums.length; i++) {
      list.push(nums[i])
      dfs(i + 1, list)
      list.pop() // 回溯
    }
  }

  dfs(0, [])

  return res
}

const res = func([1, 2, 3])
console.log(res)
