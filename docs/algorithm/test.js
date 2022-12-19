function towSum(nums, target) {
  let map = new Map()
  for (let i = 0; i < nums.length; i++) {
    if (map.has(target - nums[i])) {
      return [map.get(nums[i]), i]
    } else {
      map.set(nums[i], i)
    }
  }
  return []
}

towSum([2,7,11,15], 9)