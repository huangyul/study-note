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

> 中等

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

> 中等

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

> 困难

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

**注意：此方法的时间复杂度为 O(m+n)，并不符合题目要求**

```js
function func(nums1, nums2) {
  let merge = []
  let i = 0
  let j = 0

  // 先合并两个数组
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] < nums2[j]) {
      merge.push(nums1[i++])
    } else {
      merge.push(nums2[j++])
    }
  }

  // 将剩余的推到合并数组里
  while (i < nums1.length) {
    merge.push(nums1[i++])
  }
  while (j < nums2.length) {
    merge.push(nums2[j++])
  }

  const { length } = merge
  return length % 2 === 1
    ? merge[Math.floor(length / 2)]
    : merge[Math.floor(length / 2) - 1] / 2
}
```

### 解法二：二分查找

// TODO

## 最长回文字串

> 中等

### 题目描述

给你一个字符串 s，找到 s 中最长的回文子串。

如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。

#### 输出实例

示例 1：

输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。
示例 2：

输入：s = "cbbd"
输出："bb"

### 解法一：中心扩散法

从头开始遍历每一个字符串，以这个字符串为中心一个个扩散，直到不满足回文的特点为止。

```js
function func(s) {
  if (s.length == 1) {
    return s
  }
  let res = ''

  for (let i = 0; i < s.length; i++) {
    func(i, i)
    func(i, i + 1)
  }

  function func(m, n) {
    while (m >= 0 && n < s.length && s[m] == s[n]) {
      m--
      n++
    }
    // 注意，此时得到的m和n是刚好不满足的情况
    // 所以满足的长度是n-1-(m+1)+1
    if (n - m - 1 > res.length) {
      res = s.slice(m + 1, n)
    }
  }
  return res
}
```

## 正则表达式匹配

// TODO

> 困难

[动态规划基础介绍](https://zhuanlan.zhihu.com/p/365698607)

## 盛最多水的容器

> 中等

### 题目描述

给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
返回容器可以储存的最大水量。
说明：你不能倾斜容器。

#### 输出实例

输入：[1,8,6,2,5,4,8,3,7]  
输出：49  
最大的容器为 8-6-2-5-4-8-7 7\*7

### 双指针法

分别使用两个指针，一个在数组的头，一个在数组的末端

- 指针短的靠里移动
- 算出每次的面积，保留最大值

```js
function func(height) {
  let max = 0
  for (let i = 0, j = height.length - 1; i < j; ) {
    const minHeight = height[i] < height[j] ? height[i++] : height[j--]
    const area = (j - i + 1) * minHeight
    max = Math.max(max, area)
  }
  return max
}
```

## 三数之和

> 中等

### 题目描述

给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请
你返回所有和为 0 且不重复的三元组。
注意：答案中不可以包含重复的三元组。

#### 输出示例

输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]

### 解法：排序+双指针

1. 先处理特殊情况，传入的为 null 或数组长度小于三的情况
2. 将数组从小到大排序
3. 遍历数组
   1. 如果第 i 个大于 0，因为已经排好序，后面的都大于 i，所以不会有其他结果，直接返回
   2. 在遍历中，使用两个指针分别指向 i 的下一位和最后一位，比较并移动指针

```js
function func(nums) {
  const res = []
  // 如果为null或者长度小于三，返回空数组
  if (nums === null || nums.length < 3) {
    return res
  }
  // 将数组排序
  const arr = nums.sort((a, b) => a - b)
  // 遍历排好序的数组
  for (let i = 0; i < arr.length; i++) {
    // 如果第i个大于0，因为i后面的数都比第i个大，所以后面不会再有结果
    if (arr[i] > 0) {
      return res
    }
    // 如果第i位跟上一位相同，则跳过
    if (i > 0 && arr[i] === arr[i - 1]) {
      continue
    }
    // 定义两个指针，分别指向i的下一位和最后一位，并且开始使用双指针法
    let L = i + 1,
      R = arr.length - 1
    while (L < R) {
      let sum = arr[i] + arr[L] + arr[R]
      // 如果符合条件，则推进去并且两个指针都往里移动一位
      if (sum === 0) {
        res.push([arr[i], arr[L], arr[R]])
        // 处理相同的值
        while (L < R && arr[L] === arr[L + 1]) {
          L++
        }
        while (L < R && arr[R] === arr[R - 1]) {
          R--
        }
        L++
        R--
      }
      // 如果结果大于0，要让右指针往里移动一位，以减小和
      else if (sum > 0) {
        R--
      }
      // 同理
      else if (sum < 0) {
        L++
      }
    }
  }
  return res
}
```

## 电话号码的字母组合

> 中等

### 题目描述

给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

#### 输出实例

输入：digits = "23"
输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]

输入：digits = ""
输出：[]

输入：digits = "2"
输出：["a","b","c"]

### 解法-回溯法

看到组合，基本要想到回溯

回溯法（back tracking）（探索与回溯法）是一种选优搜索法，又称为试探法，按选优条件向前搜索，以达到目标。

```js
function func(str) {
  const phone = [
    '',
    '*',
    'abc',
    'def',
    'ghi',
    'jkl',
    'mno',
    'pqrs',
    'tuv',
    'wxyz',
  ]
  // 如果输入的为空，直接返回空数组
  if (!str) {
    return []
  }

  // 定义一个要返回的值
  const res = []

  // 定义一个用于遍历的方法
  // 接收两个参数，第一个是上一次遍历拿到的值，第二个是还需要遍历的值
  function backtrach(letter, strs) {
    // 如果没有要遍历的值，则推入结果并返回
    if (strs.length === 0) {
      res.push(letter)
      return
    }
    // 取出第一个值和剩余的值
    const [curStr, ...resStr] = strs
    for (let value of phone[curStr]) {
      backtrach(letter + value, resStr)
    }
  }
  backtrach('', str)
  return res
}
```

## 删除链表倒数第 n 个结点

> 中等

### 题目描述

给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

#### 输出示例

输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]

### 解法--双指针法

1. 使用两个指针，slow 和 fast，一开始 slow 从 0 开始，fast 从 0 移动 n 位
2. 两个指针同时移动，直到 fast 指针移出链表
3. 这时候删掉 slow 的下一个 next，指向 next 的 next

```js
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}
function generateList(arr) {
  let list = new ListNode(0)
  let head = list
  for (let i = 0; i < arr.length; i++) {
    list.next = new ListNode(arr[i])
    list = list.next
  }
  return head.next
}

function func(head, n) {
  head = generateList(head)
  let ret = new ListNode(0, head)
  let slow = ret
  let fast = ret

  while (n--) {
    fast = fast.next
  }
  if (!fast) return ret.next

  while (fast.next) {
    fast = fast.next
    slow = slow.next
  }
  slow.next = slow.next.next
  return ret.next
}

console.log(func([1, 2, 3, 4, 5], 4))
```

## 有效括号

> 简单

### 题目描述

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
每个右括号都有一个对应的相同类型的左括号。

#### 输出示例

###### 示例 1

输入：s = "()"
输出：true

###### 示例 2

输入：s = "()[]{}"
输出：true

###### 示例 3

输入：s = "(]"
输出：false

### 解法-利用栈的后进先出

重点是观察可以得出，至少有一个是相邻的有效括号

```js
function func(s) {
  // 如果长度为0或为奇数，则肯定不是
  if (s.length === 0 || s.length % 2 === 1) {
    return false
  }
  // 定好匹配规则，注意是后匹配前
  const map = {
    ')': '(',
    ']': '[',
    '}': '{',
  }
  const res = []
  for (let i = 0; i < s.length; i++) {
    if (res.length === 0) {
      res.push(s[i])
    } else if (res[res.length - 1] === map[s[i]]) {
      res.pop()
    } else {
      res.push(s[i])
    }
  }
  return res.length === 1
}
```

## 合并两个有序链表

> 简单

### 题目描述

将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的

#### 输出示例

###### 示例 1

输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]

###### 示例 2

输入：l1 = [], l2 = []
输出：[]

###### 示例 3

输入：l1 = [], l2 = [0]
输出：[0]

### 解法-递归

```js
function func(list1, list2) {
  // 递归的终止条件
  if (!list1) return list2
  if (!list2) return list1

  if (list1.val < list2.val) {
    // 比较大小，取小的，然后将next指向下一个比较小的结果（递归）
    list1.next = func(list1.next, list2)
    return list1
  } else {
    list2.next = func(list1, list2.next)
    return list2
  }
}
```

## 括号生成

> 中等

### 题目描述

数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

#### 输出示例

###### 示例 1

输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]

###### 示例 2

输入：n = 1
输出：["()"]

### 解法-深度优先搜索法

个人对于深度优先搜索的理解：

递归遍历所有情况，以深度为首要因素，先往一个方向去找出结果，如果搜索出来的值符合条件，则保留

在本题中，定义一个递归函数来遍历所有结果，函数终止的条件：

- 当左括号用完，既等于 n；如果在这种条件下右括号也用完，则该结果是符合的

```js
function func1(n) {
  // 使用一个变量存储结果
  const res = []
  func1(n, 0, 0, '')
  return res

  /**
   *
   * @param {*} n 传入的对数
   * @param {*} lc 左括号的数量
   * @param {*} rc 右括号的数量
   * @param {*} str 已经组合的字符
   */
  function func1(n, lc, rc, str) {
    if (lc === n && rc === n) {
      res.push(str)
      return
    } else {
      // 因为是深度优先，所以先把所有左括号的情况考虑了
      // 如果还有左括号的剩余数，先加入左括号
      if (lc < n) func1(n, lc + 1, rc, str + '(')
      // 如果还有右括号，并且右括号小于左括号
      if (rc < n && rc < lc) func1(n, lc, rc + 1, str + ')')
    }
  }
}
```

## 下一个排列

> 中等

### 题目描述

整数数组的一个 排列 就是将其所有成员以序列或线性顺序排列。

例如，arr = [1,2,3] ，以下这些都可以视作 arr 的排列：[1,2,3]、[1,3,2]、[3,1,2]、[2,3,1] 。
整数数组的 下一个排列 是指其整数的下一个字典序更大的排列。更正式地，如果数组的所有排列根据其字典顺序从小到大排列在一个容器中，那么数组的 下一个排列 就是在这个有序容器中排在它后面的那个排列。如果不存在下一个更大的排列，那么这个数组必须重排为字典序最小的排列（即，其元素按升序排列）。

例如，arr = [1,2,3] 的下一个排列是 [1,3,2] 。
类似地，arr = [2,3,1] 的下一个排列是 [3,1,2] 。
而 arr = [3,2,1] 的下一个排列是 [1,2,3] ，因为 [3,2,1] 不存在一个字典序更大的排列。
给你一个整数数组 nums ，找出 nums 的下一个排列。

必须 原地 修改，只允许使用额外常数空间

#### 输出示例

输入：nums = [1,2,3]
输出：[1,3,2]

输入：nums = [3,2,1]
输出：[1,2,3]

输入：nums = [1,1,5]
输出：[1,5,1]

### 解法

要求得下一个排列数，算法步骤如下：

1. 从右到左找，找到 i 满足 nums[i] < nums[i+1]
2. 找出 i 后，再从右开始找，找到第一个比 i 大的数 j，并交换
3. 此时 i 后面的数是降序排好的，将 i 后面的数升序排好，既得到下一个排列数

```js
function func(nums) {
  if (nums.length <= 1) {
    return nums
  }

  // 从倒数第二位开始找，保证有i+1的存在
  let i = nums.length - 2
  // 从右到左找出比后一位小的数
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i--
  }
  // i>0表示这个数存在
  if (i > 0) {
    // 从右到左开始找，找出第一个比nums[i]大的数
    let j = nums.length - 1
    while (i < j && nums[i] >= nums[j]) {
      j--
    }
    // 交换值
    ;[nums[i], nums[j]] = [nums[j], nums[i]]
  }
  // 最后只需处理i后面的数，将它们升序排好，就获得下一个排列数
  let l = i + 1
  let r = nums.length - 1
  while (l < r) {
    ;[nums[l], nums[r]] = [nums[r], nums[l]]
    l++
    r--
  }
}
```

## 搜索旋转排序数组

> 中等

### 题目描述

整数数组 nums 按升序排列，数组中的值 互不相同 。

在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。

给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。

你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。

#### 输出示例

输入：nums = [4,5,6,7,0,1,2], target = 0
输出：4

输入：nums = [4,5,6,7,0,1,2], target = 3
输出：-1

输入：nums = [1], target = 0
输出：-1

### 解法-二分法

1. 因为原本是一个排好序的数组，然后在某一位上旋转了，所以通过中间的数去比较，如果中间的数大于第一位，则前半段肯定是按顺序排好的；否则后半段是按顺序排好的；
2. 如何找出 target？找出按顺序排好的那一半段，通过比较判断 target 是否在里面，然后做相应的操作继续二分

```js
function func(nums, target) {
  let start = 0
  let end = nums.length - 1

  while (start <= end) {
    // 找出中间位
    let mid = start + ((end - start) >> 1)
    // 如果中间位刚好等于
    if (nums[mid] === target) return mid
    // 判断左半段是不是按顺序的
    if (nums[start] <= nums[mid]) {
      // 判断target是否在里面
      if (nums[start] <= target && target <= nums[mid]) {
        // 如果在里面，则进一步缩小范围
        end = mid - 1
      } else {
        start = mid + 1
      }
    } else {
      if (nums[mid] <= target && target <= nums[end]) {
        start = mid + 1
      } else {
        end = mid - 1
      }
    }
  }

  // 都不符合，返回-1
  return -1
}
```

## 在排序数组中查找元素的第一个和最后一个位置

> 中等

### 题目描述

给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。

如果数组中不存在目标值 target，返回 [-1, -1]。

你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。

#### 输出示例

输入：nums = [5,7,7,8,8,10], target = 8
输出：[3,4]

输入：nums = [5,7,7,8,8,10], target = 6
输出：[-1,-1]

输入：nums = [], target = 0
输出：[-1,-1]

### 解法-二分法

看到要求 O(log n)且排好序的数组，基本是二分法

```js
function func(nums, target) {
  if (nums.length === 0) return [-1, -1]
  let l = 0
  let r = nums.length - 1
  const res = []
  while (l <= r) {
    let mid = l + ((r - l) >> 1)
    if (nums[mid] === target) {
      let l1 = mid
      let l2 = mid
      while (l1 >= l && nums[l1] === nums[l1 - 1]) {
        l1--
      }
      while (l2 <= r && nums[l2] === nums[l2 + 1]) {
        l2++
      }
      return [l1, l2]
    } else if (nums[mid] > target) {
      r--
    } else {
      l++
    }
  }
  return [-1, -1]
}
```

## 组合总和

> 中等

### 题目描述

给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。

candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。

对于给定的输入，保证和为 target 的不同组合数少于 150 个。

#### 输出示例

输入：candidates = [2,3,6,7], target = 7
输出：[[2,2,3],[7]]
解释：
2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
7 也是一个候选， 7 = 7 。
仅有这两种组合。

输入: candidates = [2,3,5], target = 8
输出: [[2,2,2,2],[2,3,3],[3,5]]

输入: candidates = [2], target = 1
输出: []

### 解法-回溯法

使用深度优先搜索，将可能的组合一个个试出来；要注意的点：

1. 数组内的数字可重复，比如[2,3]中的 2 可重复使用，这时需要每次遍历的时候，都从头开始
2. 按照上面 1 的做法，又会遇到新的问题，比如[2,3]，target 为 5，会得出[[2,3],[3,2]]这种重复的结果，这时的解决方法是记录 start，排除掉已经用过的数

```js
function func(candidates, target) {
  // 用来存储结果
  let res = []
  // 定义一个深度搜索的函数
  // 参数： 开始位置   中间变量  总和
  const dfs = (start, temp, sum) {
    // 如果总和大于等于目标值，则跳出递归
    if(sum >= target) {
      if(sum === target) {
        // 注意，中间变量是数组，引用类型
        res.push([...temp])
      }
      return
    }

    // 这里可以避免最后结果重复
   for (let i = start; i < candidates.length; i++) {

      temp.push(candidates[i])
      dfs(i, temp, sum + candidates[i])
      temp.pop()

   }
  }
  dfs(0,[],0)
  return res
}
```

## 全排列

> 中等

### 题目描述

给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。

#### 输出示例

输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

输入：nums = [0,1]
输出：[[0,1],[1,0]]

输入：nums = [1]
输出：[[1]]

### 解法-回溯法

使用深度优先搜索，把所有结果一一找出来

```js
function func(nums) {
  let res = []
  let used = {}

  const dfs = (temp) => {
    if (temp.length === nums.length) {
      res.push([...temp])
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) {
        continue
      }
      temp.push(nums[i])
      used[i] = true
      dfs(temp)
      // 回溯的关键，退回上一步，继续遍历
      temp.pop()
      used[i] = false
    }
  }
  dfs([])
  return res
}
```

## 旋转图像

> 中等

### 题目描述

给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。

你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。

#### 输出示例

输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[[7,4,1],[8,5,2],[9,6,3]]

输入：matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
输出：[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

### 解法-逐层逐个转移法

具体解法：[详细解析链接](https://leetcode.cn/problems/rotate-image/solutions/274724/li-kou-48xiao-bai-du-neng-kan-dong-de-fang-fa-zhu-/?orderBy=most_votes)

```js
function func(matrix) {
  // 因为是二维数组，所以选了两个位置
  let p1 = 0
  let p2 = matrix.length - 1
  // 开始逐层遍历
  while (p1 < p2) {
    // 每层里的移动数
    let add = 0
    while (add < p2 - p1) {
      // 先获取左上角的值并保存，注意加入移动数
      let temp = matrix[p1][p1 + add]
      // 将左下角的值赋值给左上角
      matrix[p1][p1 + add] = matrix[p2 - add][p1]
      // 将右下角的值赋值给左下角
      matrix[p2 - add][p1] = matrix[p2][p2 - add]
      // 将右上角的值赋值给右下角
      matrix[p2][p2 - add] = matrix[p1 + add][p2]
      // 将左上角的值赋值给右上角
      matrix[p1 + add][p2] = temp
      // 移动一位
      add += 1
    }
    // 移动一层
    p1++
    p2--
  }
}
```

## 字母异位词分组

> 中等

### 题目描述

给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。

字母异位词 是由重新排列源单词的字母得到的一个新单词，所有源单词中的字母通常恰好只用一次。

#### 示例输出

输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
输出: [["bat"],["nat","tan"],["ate","eat","tea"]]

输入: strs = [""]
输出: [[""]]

输入: strs = ["a"]
输出: [["a"]]

### 解法-排序

- 按题目的要求是字母异位词是排序不同的任意组合，那就说明排序后的结果是一样的；
- 可以使用 Map，存储数据

```js
function func(strs) {
  let h = new Map(),
    k
  for (let i = 0; i < strs.length; i++) {
    // 先求出排好序的组合
    k = strs[i].split('').sort().join('')
    // 这里注意数据结构
    h.has(k) ? h.get(k).push(strs[i]) : h.set(k, [strs[i]])
  }
  return Array.from(h.values())
}
```

## 最大子数组和

> 中等

### 题目描述

给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

子数组 是数组中的一个连续部分。

#### 输出示例

输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。

输入：nums = [1]
输出：1

输入：nums = [5,4,-1,7,8]
输出：23

### 解法-动态规划

使用动态规划（不知道算不算动态规划）。遍历数组，以每个数字为终结点计算出以该数字为节点的最大值

```js
function func(nums) {
  if (!nums.length) {
    return 0
  }
  // 先把第一个当作是最大的值
  let curMax = nums[0]
  let res = nums[0]

  for (let i = 1; i < nums.length; i++) {
    // curMax是以上一个数为终点的最大值，秩序将curMax加上当前的数，就能获取以当前的数为终点的最大值
    curMax = Math.max(nums[i], curMax + numx[i])
    res = res > curMax ? res : curMax
  }
  return res
}
```

## 跳跃游戏

> 中等

### 题目描述

给定一个非负整数数组 nums ，你最初位于数组的 第一个下标 。

数组中的每个元素代表你在该位置可以跳跃的最大长度。

判断你是否能够到达最后一个下标。

#### 输出示例

输入：nums = [2,3,1,1,4]
输出：true
解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。

### 解法

可以逆向思维，先从最后一位开始，判断倒数第二位能不能到达最后一位，以此类推到第一位

```js
function func(nums) {
  // 先找出最后一位
  let end = nums.length - 1
  // 开始遍历，从倒数第二位开始，判断能不能通过当前未到达最后一位
  for (let i = nums.length - 2; i <= 0; i--) {
    // 如果能达到，则将最后一位前移
    if (end - i <= nums[i]) {
      end = i
    }
  }
  return end === i
}
```

## 合并区间

> 中等

### 题目描述

以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。

#### 输出示例

输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].

输入：intervals = [[1,4],[4,5]]
输出：[[1,5]]
解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。

### 解法

先将内部的数组排序，然后遍历比较，当前数组的第一位与上一个数组的第二位大小，如果发现当前数组包含上一个数组，则合并两个数组，取交集

```js
function func(nums) {
  // 先将数组排序，这样只需遍历一轮即可
  nums.sort((a, b) => a[0] - b[0])
  let res = []
  let prev = nums[0]
  for (let i = 1; i < nums.length; i++) {
    let cur = nums[i]
    if (prev[1] >= cur[0]) {
      prev[1] = Math.max(prev[1], cur[1])
    } else {
      res.push(prev)
      prev = cur
    }
  }
  res.push(prev)
  return res
}
```

## 不同路径

> 中等

### 题目描述

一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。(m 是垂直方向，n 是水平方向)

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。

问总共有多少条不同的路径？

#### 输出示例

输入：m = 3, n = 7
输出：28

输入：m = 3, n = 2
输出：3
解释：
从左上角开始，总共有 3 条路径可以到达右下角。

1. 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右
3. 向下 -> 向右 -> 向下

### 解法

假如是 3\*7 的格子，实际要走的步数如下

1 1 1 1 1 1 1
1 2 3 4 5 6 7
1 3 6 10 15 21 28

总结有两点：

1. 边界都为 1
2. 因为只能向右或向下走一步，所以每一格都是左一和上一的和

```js
function func(m, n) {
  // 先做出一个m * n的二维数组
  const dp = Array(m)
    .fill()
    .map(() => Array(n))

  // 将所有边界填1
  for (let i = 0; i < m; i++) {
    db[i][0] = 1
  }
  for (let i = 0; i < n; i++) {
    dp[0][i] = 1
  }

  // 计算除了边界外的每一格
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][k] = dp[i - 1][j] + dp[i][j - 1]
    }
  }

  // 返回最后一格
  return dp[m - 1][n - 2]
}
```

## 最小路径

> 中等

### 题目描述

给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

说明：每次只能向下或者向右移动一步。

#### 输出示例

输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
输出：7
解释：因为路径 1→3→1→1→1 的总和最小。

输入：grid = [[1,2,3],[4,5,6]]
输出：12

### 解法-动态规划

对于每一格来说，等走到当前格的方式只有*左*或*上*，所以可以使用动态规划的思想，考虑每一格的最优解（来到当前格的最小步数）

```js
function func(grid) {
  // 获取m n
  const m = grid.length
  const n = grid[0].length

  const dp = Array(m)
    .fill()
    .map((i) => Array(n))
  dp[0][0] = grid[0][0]
  // 处理边界问题
  for (let i = 1; i < m; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0]
  }
  for (let i = 1; i < n; i++) {
    dp[0][i] = dp[0][i - 1] + grid[0][i]
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
    }
  }
  return dp[m - 1][n - 1]
}
```

## 爬楼梯

> 简单

### 题目描述

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

#### 输出示例

输入：n = 2
输出：2
解释：有两种方法可以爬到楼顶。

1. 1 阶 + 1 阶
2. 2 阶

输入：n = 3
输出：3
解释：有三种方法可以爬到楼顶。

1. 1 阶 + 1 阶 + 1 阶
2. 1 阶 + 2 阶
3. 2 阶 + 1 阶

### 解法 1-尾递归

```js
function func(n) {
  function func1(a, b, n) {
    if (n === 0) return b
    return func1(b, a + b, n - 1)
  }
  return func1(0, 1, b)
}
```

### 动态规划

```js
function func(n) {
  // 处理特殊情况
  if (n <= 2) return n

  const dp = Array.of(1, 2)
  for (let i = 2; i < n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n - 1]
}
```

## 颜色分类

### 题目描述

给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

必须在不使用库内置的 sort 函数的情况下解决这个问题。

#### 输出示例

输入：nums = [2,0,2,1,1,0]
输出：[0,0,1,1,2,2]

输入：nums = [2,0,1]
输出：[0,1,2]

### 解法-双指针（三指针）

定义三个指针，活动指针 cur，头指针 start，尾指针 end

遍历处理

1. 当前的数为 0 时，直接推到头指针的下一位，头指针和活动指针都+1
2. 当前的数等于 2 时，直接推到尾指针的下一位，尾指针-1
3. 当前的数为 1 时不处理，活动指针+1

```js
function func(nums) {
  let start = -1
  let end = nums.length
  let cur = 0
  while (cur < end) {
    if (nums[cur] === 0) {
      ;[nums[cur], nums[start + 1]] = [nums[start + 1], nums[cur]]
      cur++
      start++
    } else if (nums[cur] === 2) {
      ;[nums[cur], nums[end - 1]] = [nums[end - 1], nums[cur]]
      end--
    } else {
      cur++
    }
  }
  return nums
}
```

## 子集

> 中等

### 题目描述

给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。

#### 输出示例

输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

输入：nums = [0]
输出：[[],[0]]

### 解法-DFS 回溯法

1. 每次递归都至少要传入结果，当前递归的值
2. 每次递归都要先判是否为合适的值，如果是，则需要处理
3. 每次推入结果，注意引用类型，要进行浅拷贝

```js
function func(nums) {
  const res = []

  const dfs = (index, list) => {
    res.push(list.slice()) // 调用子递归前，加入解集
    for (let i = index; i < nums.length; i++) {
      // 枚举出所有可选的数
      list.push(nums[i]) // 选这个数
      dfs(i + 1, list) // 基于选这个数，继续递归，传入的是i+1，不是index+1
      list.pop() // 撤销选这个数
    }
  }
  dfs(0, [])
  return res
}
```

## 单词搜索

> 中等

### 问题描述

给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

#### 输出示例

输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
输出：true

输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
输出：false

### 解法-回溯法

思路：

1. 先构造一个跟矩阵一样的二维数组，用来记录
2. 找到第一个符合 word 的位置，从该位置出发，分别从上下左右去判断是否符合的
3. 构建一个方法，判断当前位置的上下左右是否继续满足条件，注意，当不满足条件的时候，要回溯，回退到上一步

```js
function func(board, word) {
  const m = board.length
  const n = board[0].length
  const used = new Array(m) // 二维矩阵used，存放bool值
  for (let i = 0; i < m; i++) {
    used[i] = new Array(n)
  }
  // canFind 判断当前点是否是目标路径上的点
  const canFind = (row, col, i) => {
    // row col 当前点的坐标，i当前考察的word字符索引
    if (i == word.length) {
      // 递归的出口 i越界了就返回true
      return true
    }
    if (row < 0 || row >= m || col < 0 || col >= n) {
      // 当前点越界 返回false
      return false
    }
    if (used[row][col] || board[row][col] != word[i]) {
      // 当前点已经访问过，或，非目标点
      return false
    }
    // 排除掉所有false的情况，当前点暂时没毛病，可以继续递归考察
    used[row][col] = true // 记录一下当前点被访问了
    // canFindRest：基于当前选择的点[row,col]，能否找到剩余字符的路径。
    const canFindRest =
      canFind(row + 1, col, i + 1) ||
      canFind(row - 1, col, i + 1) ||
      canFind(row, col + 1, i + 1) ||
      canFind(row, col - 1, i + 1)

    if (canFindRest) {
      // 基于当前点[row,col]，可以为剩下的字符找到路径
      return true
    }
    used[row][col] = false // 不能为剩下字符找到路径，返回false，撤销当前点的访问状态
    return false
  }

  for (let i = 0; i < m; i++) {
    // 遍历找起点，作为递归入口
    for (let j = 0; j < n; j++) {
      if (board[i][j] == word[0] && canFind(i, j, 0)) {
        // 找到起点且递归结果为真，找到目标路径
        return true
      }
    }
  }
  return false // 怎么样都没有返回true，则返回false
}
```

## 二叉树的中序遍历

> 简单

### 题目描述

给定一个二叉树的根节点 root ，返回 它的 中序 遍历 。

#### 输出示例

输入：root = [1,null,2,3]
输出：[1,3,2]

### 解法

#### 递归

记住三个关键

- 前序遍历：打印 - 左 - 右
- 中序遍历：左 - 打印 - 右
- 后序遍历：左 - 右 - 打印

```js
function func(root) {
  let res = []
  function func2(root) {
    if (!root) {
      return
    }
    func2(root.left)
    res.push(root.data) // .val
    func2(root.right)
  }
  func2(root)
  return res
}
```

### 迭代的方法

自定义一个栈，不断的从左子树开始找，直到找到尽头，再把栈里的取出来

```js
function func(root) {
  let res = []
  let stack = []
  while (stack.length > 0 || root != null) {
    // 如果当前节点不为null，则一直往左找下去，并使用栈存放
    if (root != null) {
      stach.push(root)
      root = root.left
    } else {
      // 当走到尽头，就将栈的按顺序去除，并尝试去找右节点
      let temp = stack.pop()
      res.push(temp.val)
      root = temp.right
    }
  }
}
```

## 不同的二叉搜索数

> 中等

### 题目描述

给你一个整数 n ，求恰由 n 个节点组成且节点值从 1 到 n 互不相同的 二叉搜索树 有多少种？返回满足题意的二叉搜索树的种数。

#### 输出示例

输入：n = 3
输出：5

输入：n = 1
输出：1

### 解法-动态规划

dp[i] = i 个不同的数组成的二叉搜索数的个数
假设 i = 5
当根节点等于 1 时 ，其余数字都比 1 大，只能在右边 dp[i] += dp[4]
当根节点等于 2 时，左边有一个 1 比 2 小，右边有三个比 2 大的数字 dp[i] += dp[1] _ dp[3]
当根节点等于 3 时，左边有两个数比 3 小，右边有两个数比 3 大的数字 dp[i] += dp[2] _ dp[2]
...
知道根节点等于 5，左边有 4 个数字比 5 小，只能放在 5 的左边,dp[i] += dp[4]

```js
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
```

## 验证二叉搜索树

> 中等

### 题目描述

给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。

有效 二叉搜索树定义如下：

- 节点的左子树只包含 小于 当前节点的数。
- 节点的右子树只包含 大于 当前节点的数。
- 所有左子树和右子树自身必须也是二叉搜索树。

#### 输出实例

输入：root = [2,1,3]
输出：true

输入：root = [5,1,4,null,null,3,6]
输出：false
解释：根节点的值是 5 ，但是右子节点的值是 4 。

### 解法

使用中序遍历，可以将二叉搜索树转换为数组，再判断数组是否递增

```js
function func(root) {
  // 定义一个数组用来辅助用
  let arr = []
  // 使用中序遍历二叉树，生成数组
  const buildArr = (root) => {
    if (root) {
      buildArr(root.left)
      arr.push(root.val)
      buildArr(root.right)
    }
  }
  buildArr(root)
  // 看看生成的数组是否每一项都小于后一项
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] <= arr[i - 1]) {
      return false
    }
  }
  return true
}
```

## 101.对称二叉树

> 简单

### 题目描述

给你一个二叉树的根节点 root ， 检查它是否轴对称。

#### 输出实例

输入：root = [1,2,2,3,4,4,3]
输出：true

输入：root = [1,2,2,null,3,null,3]
输出：false

### 解法-递归

```js
function func(root) {
  //使用递归遍历左右子树 递归三部曲
  // 1. 确定递归的参数 root.left root.right和返回值true false
  const compareNode = function (left, right) {
    //2. 确定终止条件 空的情况
    if (
      (left === null && right !== null) ||
      (left !== null && right === null)
    ) {
      return false
    } else if (left === null && right === null) {
      return true
    } else if (left.val !== right.val) {
      return false
    }
    //3. 确定单层递归逻辑
    let outSide = compareNode(left.left, right.right)
    let inSide = compareNode(left.right, right.left)
    return outSide && inSide
  }
  if (root === null) {
    return true
  }
  return compareNode(root.left, root.right)
}
```

## 102.二叉树的层序遍历

> 中等

### 题目描述

给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。

#### 输出示例

输入：root = [3,9,20,null,null,15,7]
输出：[[3],[9,20],[15,7]]

输入：root = [1]
输出：[[1]]

### 解法-层序遍历

主要的思路是使用广度优先搜索，并且使用队列的性质，先进先出，将同一层的数据放到同一组中

```js
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
```

## 104.二叉树的最大深度

> 简单

### 题目描述

给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

说明: 叶子节点是指没有子节点的节点。

#### 输出示例

给定二叉树 [3,9,20,null,null,15,7]，
返回它的最大深度 3 。

### 解法-层序遍历

同上

```js
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
    res++
  }
  return res
}
```

### 解法-递归

```js
function func(root) {
  if (root === null) {
    return 0
  } else {
    let left = func(root.left)
    let right = func(root.right)
    // 加1是因为根也属于1层
    return Math.max(left, right) + 1
  }
}
```

## 买卖股票的最佳时机

> 简单

### 题目描述

给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。

你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。

返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。

#### 输出实例

输入：[7,1,5,3,6,4]
输出：5
解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。

输入：prices = [7,6,4,3,1]
输出：0
解释：在这种情况下, 没有交易完成, 所以最大利润为 0。

### 解法-贪心算法

```js
function maxProfit(prices) {
  // 定义一个最大利润
  let maxProfit = 0
  // 定义一个最小价格
  let minPrice = Infinity
  for (let i = 0; i < prices.length; i++) {
    if (minPrice > prices[i]) {
      minPrice = prices[i]
    } else if (maxProfit < prices[i] - minPrice) {
      maxProfit = prices[i] = minPrice
    }
  }
  return maxProfit
}
```
