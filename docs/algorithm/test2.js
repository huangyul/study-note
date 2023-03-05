function fun(str) {
  let arr = str
  arr = arr.split(';')
  arr = arr.filter((i) => /^[ADWS][0-9]{1,2}$/.test(i))
  let x = 0,
    y = 0
  for (let i = 0; i < arr.length; i++) {
    const cur = arr[i]
    const direction = cur[0]
    const distance = parseInt(cur.slice(1))
    switch (direction) {
      case 'A': {
        x -= distance
        break
      }
      case 'D': {
        x += distance
        break
      }
      case 'W': {
        y -= distance
        break
      }
      case 'S': {
        y += distance
        break
      }
    }
  }
  console.log(`${x},${y}`)
}

fun("A10;S20;W10;D30;X;A1A;B10A11;;A10;")

