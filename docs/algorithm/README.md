# 算法笔记

## Two Sum

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

#### 使用 Map 的唯一性

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
