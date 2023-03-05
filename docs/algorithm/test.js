/**
 * 链表
 */
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
 * 二叉树
 */
class Node {
  // 定义节点
  constructor(data) {
    this.val = data
    this.left = null
    this.right = null
  }
}

const createTree = (arr) => {
  if (arr.length === 0) {
    return null
  }
  // 创建二叉树
  let tree = new Node(arr[0])
  let Nodes = [tree]
  let i = 1
  if (i == arr.length) {
    return tree
  }
  for (let node of Nodes) {
    Nodes.push((node.left = new Node(arr[i])))
    i += 1
    if (i == arr.length) return tree
    Nodes.push((node.right = new Node(arr[i])))
    i += 1
    if (i == arr.length) return tree
  }
}

/**
 * 上面是ListNode链表类 generateListNode(arr)
 * 下面才是正式代码编写的开始
 */

function func(prices) {
  let minPrice = Infinity
  let maxPrice = 0
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i]
    } else if (prices[i] - minPrice > maxPrice) {
      maxPrice = prices[i] - minPrice
    }
  }
  return maxPrice
}

function countOne(n) {
  let count = 0;
  while (n !== 0) {
      count += n & 1;
      n >>= 1;
  }
  return count;
}

// const res = func([7, 1, 5, 3, 6, 4])
// console.log(res)

console.log(countOne(5))
