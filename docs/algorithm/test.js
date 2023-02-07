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

/**
 * 1. 先构建矩阵
 * 2.
 */

function func(board, word) {
  let m = board.length
  let n = board[0].length
  let db = Array(m)
    .fill(false)
    .map(() => Array(n).fill(false))

  const canFind = (row, col, i) => {
    if (i === word.length) {
      // 已经找到了
      return true
    }
    if (row < 0 || row >= m || col < 0 || col >= n) {
      // 如果已经到了边缘，也返回false
      return false
    }
    if (db[row][col] || board[row][col] != word[i]) {
      // 如果已经走过或者要走的字符等于要匹配的字符
      return false
    }
    db[row][col] = true // 标注一下已经走过了
    const canFindRes =
      canFind(row + 1, col, i + 1) ||
      canFind(row - 1, col, i + 1) ||
      canFind(row, col - 1, i + 1) ||
      canFind(row, col + 1, i + 1)
    if (canFindRes) {
      return true
    }
    // 如果找不到，就回退，说明这一步不通了
    db[row][col] = false
    return false
  }

  // 找到第一个符合的开始执行上面的搜索
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === word[0] && canFind(i, j, 0)) {
        return true
      }
    }
  }
  return false
}

const res = func(
  [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ],
  'ABCCED'
)
console.log(res)
