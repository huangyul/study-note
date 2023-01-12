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
//  输入：candidates = [2,3,6,7], target = 7
//  输出：[[2,2,3],[7]]
function func(candidates, target) {
  const res = []
  const dfs = (start, temp, sum) => {
    // start是当前选择的起点索引 temp是当前的集合 sum是当前求和
    if (sum >= target) {
      if (sum == target) {
        res.push(temp.slice()) // temp的拷贝 加入解集
      }
      return // 结束当前递归
    }
    for (let i = start; i < candidates.length; i++) {
      // 枚举当前可选的数，从start开始
      temp.push(candidates[i]) // 选这个数
      dfs(i, temp, sum + candidates[i]) // 基于此继续选择，传i，下一次就不会选到i左边的数
      temp.pop() // 撤销选择，回到选择candidates[i]之前的状态，继续尝试选同层右边的数
    }
  }
  dfs(0, [], 0) // 最开始可选的数是从第0项开始的，传入一个空集合，sum也为0
  return res
}

const res = func([2, 3, 6, 7], 7)
console.log(res)

//https://leetcode.cn/problems/search-in-rotated-sorted-array/solutions/221747/pythonjs-er-fen-fa-33-sou-suo-xuan-zhuan-pai-xu-sh/?orderBy=most_votes&languageTags=javascript
