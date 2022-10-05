# 算法

`2022-9-13`

###### 两数求和（数组）

难度：**容易**

描述：给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target 的那 两个 整数，并返回它们的数组下标。

解体思路：不会重复的数组，可以使用 map 来记录

```javascript
function towSum(nums, target) {
  let map = new Map()
  for (let len = nums.length, i = 0; i < len; i++) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), 1]
    } else {
      map.set(nums[i], i)
    }
  }
  // 如果没有返回空数组
  return []
}
```

`2022-10-5`

###### 两数相加（链表）

难度：**中等**

描述：给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。请你将两个数相加，并以相同形式返回一个表示和的链表。

例子：

```
l1 = [2, 3, 4]
l2 = [3, 4, 5]

sum = [5, 7, 9]
```

前置知识：

```javascript
// 链表
// js没有链表，但可以模拟结构如下，next指向下一个数据，最后一个指向null

const listnode = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: null,
    },
  },
}
```

解题思路：

1. 观察可以得知，是将两链表从左开始按位相加
2. 如果有进 1，如果保留到下一位相加
3. 如果 l1 比 l2 的位数多，则默认补零相加

```javascript
var towNumberAdd = (l1, l2) => {
  let addOne = 0
  let sum = new ListNode('0')
  let head = sum
  if (addOne || l1 || l2) {
    let val1 = l1 !== null ? l1.val : 0
    let val2 = l2 !== null ? l2.val : 0
    let r = val1 + val2 + addOne
    addOne = r >= 10 ? 1 : 0
    sum.next = new ListNode(r % 10)
    sum = sum.next
    if (l1) l1 = l1.next
    if (l2) l2 = l2.next
  }
  return head.next
}
```
