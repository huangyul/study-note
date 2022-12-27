function func(nums1, nums2) {
  let merge = []
  let i = 0
  let j = 0

  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] > nums2[j]) {
      merge.push(nums2[j++])
    } else {
      merge.push(nums1[i++])
    }
  }

  while (i < nums1.length) {
    merge.push(nums1[i++])
  }

  while (j < nums2.length) {
    merge.push(nums2[j++])
  }

  const { length } = merge
  console.log(merge)
  return length % 2 === 1
    ? merge[Math.floor(length / 2)]
    : (merge[length / 2] + merge[length / 2 - 1]) / 2
}

console.log(func([1, 3], [2]))
