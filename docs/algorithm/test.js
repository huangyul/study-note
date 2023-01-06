function func(s) {
  if (s.length === 0) {
    return false
  }
  if (s.length % 2 === 1) {
    return false
  }

  let map = {
    ')': '(',
    ']': '[',
    '}': '{',
  }
  const res = []
  for (let i = 0; i < s.length; i++) {
    if (res.length === 0) {
      res.push(s[i])
    } else if (res[res.length - 1] === map[s[i]]) {
      res.pop()
    } else {
      res.push(s[i])
    }
  }
  return res.length === 0
}

console.log(func('()()'))
