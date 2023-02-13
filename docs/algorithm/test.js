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
  let res = []
  let queue = [] // 队列
  if (root === null) {
    return res
  }
  // 将整个二叉树推进队列，以后每次遍历队列的长度，就只会遍历同一层的值
  queue.push(root)
  while (queue.length !== 0) {
    let curLevel = [] // 用来存储同一层的值
    let len = queue.length // 因为后面会新推入值，所以要先将长度（同一层的长度）存起来
    for (let i = 0; i < len; i++) {
      let node = queue.shift() // 从头取出第一个
      curLevel.push(node.val)
      // 如果取出的值有左子树或右子树，推入队列中，用于下一轮遍历，注意先进先出
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
    res.push(curLevel)
  }
  return res
}

const res = func(createTree([3, 9, 20, null, null, 15, 7]))
console.log(res)
