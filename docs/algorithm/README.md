# 算法笔记

## 两数之和

> 简单

#### 题目描述

给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出 和为目标值 `target` 的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

###### 实例

```md
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
```

#### 解法一：暴力破解法

观察每一步的比较

第一轮：
2 和 7
2 和 11
2 和 15

第二轮：
7 和 11
7 和 15

第三轮：
11 和 15

一共要进行 i-1 轮
每轮比较 n-1-i 次

```js
function towSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j]
      }
    }
  }
  return []
}
```

3 2 4 6
{3: 1}

{
{3: 1}
{2: 2}
}

#### 解法二：使用 Map 的唯一性

```js
function towSum(nums, target) {
  let map = new Map()
  for (let i = 0; i < nums.length; i++) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i]
    } else {
      map.set(nums[i], i)
    }
  }
  return []
}
```

要注意的点：`map` 将数组的实际内容作为 `key`，数组下标作为 `value`，就是为了使用 `has` 来判断

## 两数相加

> 难度中等

#### 题目描述

给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

###### 实例

输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807

#### js 中的链表解释

链表里面的每个值都是一个类对象的东西，其中 val 表示当前的值，next 表示指向下一个链表

#### 解法：

(2->4->3) + (5->6->4) = (7->0->8)

1. 取出加号两边的最低位
   注意：可能存在没有的情况，例如 99+9999，此时要补零

```js
let val1 = l1 !== null ? 0 : l1.val
let val2 = l2 !== null ? 0 : l2.val
```

2. 求出两个值的和，并算出是否要进 1，保留到下一次计算中

```js
let res = val1 + val2
addOne = res >= 10 ? 1 : 0
sum.next = new ListNode(res % 10) // 因为结果可能大于0
```

代码入下：

```js
function addTowSum(l1, l2) {
  let addOne = 0 // 进位
  let sum = new ListNode('0')
  let head = sum
  while (l1 || l2 || addOne) {
    let val1 = l1 !== null ? l1.val : 0
    let val2 = l2 !== null ? l2.val : 0
    let res = val1 + val2 + addOne
    addOne = res >= 10 ? 1 : 0
    sum.next = new ListNode(res % 10)
    sum = sum.next
    if (l1) l1 = l1.next
    if (l2) l2 = l2.next
  }
  return head.next
}
```
