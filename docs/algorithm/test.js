// 输入：nums = [-1,0,1,2,-1,-4]
// 输出：[[-1,-1,2],[-1,0,1]]

function func(nums) {
  const res = []
  if (nums === null || nums.length < 3) {
    return res
  }

  const arr = nums.sort((a, b) => a - b)

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 0) {
      return res
    }
    if (arr[i] == arr[i - 1]) {
      continue
    }

    let L = i + 1,
      R = arr.length - 1
    while (L < R) {
      if (arr[i] + arr[L] + arr[R] === 0) {
        res.push([arr[i], arr[L], arr[R]])
        while (arr[L] === arr[L + 1]) {
          L++
        }
        while (arr[R] === arr[R - 1]) {
          R--
        }
        L++
        R--
      }
      if (arr[i] + arr[L] + arr[R] > 0) {
        R--
      }
      if (arr[i] + arr[L] + arr[R] < 0) {
        L++
      }
    }
  }
  return res
}

console.log(func([-1, 0, 1, 2, -1, -4]))
