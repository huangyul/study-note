function func(n) {
  if(n == 1) {
    return 1
  }
  if(n == 2) {
    return 2
  }
  let a = 1,b =2,temp=0
  for(let i = 3; i < n; i++) {
    temp = a + b
    a = b
    b = temp
  }
  return temp
}

console.log(func(10))