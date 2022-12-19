// var lengthOfLongestSubstring = function (s) {
//   let res = 0,
//     temp = []
//   for (let i = 0; i < s.length; i++) {
//     if (temp.indexOf(s[i]) == -1) {
//       temp.push(s[i])
//     } else {
//       temp.shift()
//       i--
//       continue
//     }
//     res = Math.max(res, temp.length)
//   }
//   return res
// }

const lengthOfLongestSubstring = function (str) {
  let res = 0,
    temp = []

  for (let i = 0; i < str.length; i++) {
    if (!temp.includes(str[i])) {
      temp.push(str[i])
    } else {
      temp.shift()
      i--
      continue
    }
    res = Math.max(res, temp.length)
  }
  return res
}

console.log(lengthOfLongestSubstring('pwwkew'))
