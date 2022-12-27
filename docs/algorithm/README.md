# 算法笔记

## 两数之和

> 简单

### 题目描述

给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出 和为目标值 `target` 的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

#### 输入例子

```md
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
```

### 解法一：暴力破解法

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
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length - 1 - i; j++) {
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

### 解法二：使用 Map 的唯一性

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

### 题目描述

给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

#### 输入例子

输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807

### js 中的链表解释

链表里面的每个值都是一个类对象的东西，其中 val 表示当前的值，next 表示指向下一个链表

### 解法：

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

## 无重复字符的最长字串

> 难度中等

### 题目描述

给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。

#### 输入例子

输入: s = "abcabcbb"
输出: 3
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

### 解决思路一滑块

(abc)abcbb
a(bc)abcbb
ab(cab)cbb
abc(abc)bb
abca(bc)bb
abcab(cb)b
abcabc(b)b
abcabcb(b)

- 使用 for 循环，定义每种可能性
- 使用 slice 方法，将最大的长度切下来并保存

```js
function fun(s) {
  if (str.length <= 1) {
    return str.length
  }
  let left = 0
  let right = 1
  let max = 0
  let temp
  while (right < str.length) {
    temp = str.slice(left, right)
    if (temp.indexOf(str.charAt(right)) > -1) {
      left++
      continue
    } else {
      right++
    }
    if (right - left > max) {
      max = right - left
    }
  }
  return max
}
```

### 解决思路二

通过一个变量来存暂时的数据

```js
var lengthOfLongestSubstring = function (s) {
  let res = 0,
    temp = []
  for (let i = 0; i < s.length; i++) {
    if (temp.indexOf(s[i]) == -1) {
      temp.push(s[i])
    } else {
      temp.shift()
      i--
      continue
    }
    res = Math.max(res, temp.length)
  }
  return res
}
```

## 寻找两个正序数组的中位数

### 题目描述

给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。

算法的时间复杂度应该为 O(log (m+n)) 。

#### 输出

```md
输入：nums1 = [1,3], nums2 = [2]
输出：2.00000
解释：合并数组 = [1,2,3] ，中位数 2

输入：nums1 = [1,2], nums2 = [3,4]
输出：2.50000
解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
```

### 解法一：暴力破解法

分别遍历两个数组内的项，重新组合成一个新的数组，然后再求出新数组的中间项的值

**注意：此方法的时间复杂度为O(m+n)，并不符合题目要求**

```js
function func(nums1, nums2) {
  let merge = []
  let i = 0
  let j = 0

  // 先合并两个数组
  while(i < nums1.length && j < nums2.length) {
    if(nums1[i] < nums2[j]) {
      merge.push(nums1[i++])
    } else {
      merge.push(nums2[j++])
    }
  }

  // 将剩余的推到合并数组里
  while(i < nums1.length) {
    merge.push(nums1[i++])
  }
  while(j < nums2.length) {
    merge.push(nums2[j++])
  }

  const {length} = merge
  return length % 2 === 1 ? merge[Math.floor(length / 2)] : (merge[Math.floor(length / 2) - 1]) / 2
}
```