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

function func(root) {
  let res = 0
  let queue = []
  if (root === null) return 0
  queue.push(root)
  while (queue.length != 0) {
    let len = queue.length
    for (let i = 0; i < len; i++) {
      let node = queue.shift()
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
    if (memo[n]) {
      return memo[n]
    }
    let count = 0
    for (let i = 0; i <= n - 1; i++) {
      count += recur(i) * recur(n - 1 - i)
    }
    memo[n] = count
    return count
  }

  const res1 = func(createTree([3, 9, 20, null, null, 15, 7]))
  console.log(res1)
}

// no.144
function preorderTraversal() {
  const root = createTree([1, 2, 4, 1])
  console.log('root')
  console.log(root)

  if (!root) return []

  const stack = [root]
  const res = []

  while (stack.length > 0) {
    const node = stack.pop()
    res.push(node.val)

    if (node.right) {
      stack.push(node.right)
    }

    if (node.left) {
      stack.push(node.left)
    }
  }
  console.log(res)
}

preorderTraversal()

