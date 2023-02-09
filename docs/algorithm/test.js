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
class node {
  constructor(val) {
    this.key = val
    this.left = null
    this.right = null
  }
}
class binaryTree {
  constructor() {
    this.root = null
  }

  insert(val) {
    let newNode = new node(val)
    if (this.root === null) {
      this.root = newNode
    } else {
      this.insertNode(this.root, newNode)
    }
  }

  insertNode(root, curNode) {
    if (root.key > curNode.key) {
      if (root.left === null) {
        root.left = curNode
      } else {
        this.insertNode(root.left, curNode)
      }
    } else {
      if (root.right === null) {
        root.right = curNode
      } else {
        this.insertNode(root.right, curNode)
      }
    }
  }
}

/**
 * 上面是ListNode链表类 generateListNode(arr)
 * 下面才是正式代码编写的开始
 */

function func(n) {
  let dp = new Array(n + 1).fill(0)
  dp[0] = 1
  dp[1] = 1
  for (let i = 2; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      dp[i] += dp[j - 1] * dp[i - j]
    }
  }
  return dp[n]
}

const res = func(3)
console.log(res)
