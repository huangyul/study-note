function calculateSodas(n) {
  if (n <= 1) {
    return 0 // 只有一个空瓶的情况特殊处理
  }
  let totalSodas = 0
  while (n >= 3) {
    const exchangedBottles = Math.floor(n / 3) * 3 // 可以兑换的空瓶子数
    totalSodas += exchangedBottles / 3 // 增加兑换的汽水瓶数
    n = exchangedBottles / 3 + (n % 3) // 更新当前剩余的空瓶数
  }
  if (n === 2) {
    totalSodas += 1 // 最后剩下两个空瓶可以向老板借一个再兑换一瓶汽水
  }
  return totalSodas
}

console.log(calculateSodas(10))
