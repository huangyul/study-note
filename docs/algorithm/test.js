// 输入：nums = [-1,0,1,2,-1,-4]
// 输出：[[-1,-1,2],[-1,0,1]]

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

console.log(func([-1, 0, 1, 2, -1, -4]))
