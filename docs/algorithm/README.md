# 算法

## 简单

`2022-5-14`

###### 合并两个有序链表

链表与数组的区别：二者都是用来存储数据，区别在于，例如当数组删除一个下标为3的数据时，当这个数据删掉，后面的

**题目描述**  
合并两个有序链表，结构如下所示：  
```js
function list() {
  
}
```

###### 删除有序数组的重复项

注意的重点是**有序数组**，简单的思路是暴力破解，但是复杂度为O(n)，好的思路是：使用双指针，新建两个指针i，j，指针i指向数组第一个值，指针j指向第二个值，开始使用j遍历数组，如果数组i的值不等于j的值，则将i+1的值等于j，最后返回i+1

```js
/**
 * params {array} 有序数组
 * return {number}
 */
function func(nums) {
  if(nums.length == 0) return 0

  let i = 0, j = 1
  for(; j < nums.length; j ++) {
    if(nums[i] !== nums[j]) {
      i ++
      nums[i] = nums[j]
    }
  }
  return i + 1
}
```

`2022-5-16`

###### 搜索插入的位置

有一个有序数组和一个目标数字，寻找该目标数字在数组中的插入位置，例如[1,2,2,4]和3，返回3。

可是使用二分法，就是找出一个中间位置与目标进行对比，根据条件判断使用前面半部分还是后面半部分，以此类推，知道找出结果

```js
var searchInsert = function (nums, target) {
  let n = nums.length
  let l = 0,
    r = n - 1
  while (l <= r) {
    let mid = Math.floor((r + l) / 2)
    if (target <= nums[mid]) {
      r = mid - 1
    } else {
      l = mid + 1
    }
  }
  return l
}
```
