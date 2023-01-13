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
function func(matrix) {
  let p1 = 0
  let p2 = matrix.length - 1

  while (p1 < p2) {
    let add = 0
    while (add < p2 - p1) {
      let temp = matrix[p1][p1 + add]
      matrix[p1][p1 + add] = matrix[p2 - add][p1]
      matrix[p2 - add][p1] = matrix[p2][p2 - add]
      matrix[p2][p2 - add] = matrix[p1 + add][p2]
      matrix[p1 + add][p2] = temp
      add += 1
    }
    p1++
    p2--
  }
}

const res1 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]
const res = func(res1)
console.log(res1)
