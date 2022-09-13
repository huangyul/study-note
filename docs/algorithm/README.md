# 算法

`2022-9-13`

###### 两数求和

难度：**easy**

描述：给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

解体思路：不会重复的数组，可以使用map来记录

```javascript
function towSum(nums, target) {
  let map = new Map()
  for(let len = nums.length, i = 0; i < len; i ++) {
    if(map.has(target - nums[i])) {
      return [map.get(target - nums[i]), 1]
    } else {
      map.set(nums[i], i)
    }
  }
  // 如果没有返回空数组
  return []
}
```