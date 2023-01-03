// 输入：[1,8,6,2,5,4,8,3,7]
// 输出：49
//

function func(height) {
  let max = 0
  for (let i = 0, j = height.length - 1; i < j; ) {
    const minHeight = height[i] < height[j] ? height[i++] : height[j--]
    const area = (j - i + 1) * minHeight
    max = Math.max(max, area)
  }
  return max
}

let testHeight = []
for(let i = 0; i < 4000000; i++) {
  testHeight.push(Math.floor(Math.random() * 1000 + 1))
}


console.log(func([1, 8, 6, 2, 5, 4, 8, 3, 7]))
