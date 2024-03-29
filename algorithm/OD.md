# OD 刷题

## 1. 字符串最后一个单词的长度

> 简单

### 描述

计算字符串最后一个单词的长度，单词以空格隔开，字符串长度小于 5000。（注：字符串末尾不以空格为结尾）

### 输入描述：

输入一行，代表要计算的字符串，非空，长度小于 5000。

### 示例

输入：
hello nowcoder
输出：
8
说明：
最后一个单词为 nowcoder，长度为 8

### 输出描述：

输出一个整数，表示输入字符串最后一个单词的长度。

### 解题思路

将数组拆开，然后去数组最后一位字符串的长度

```js
void (async function () {
  while ((line = await readline())) {
    const str = line.split(' ')
    console.log(arr[arr.length - 1].length)
  }
})()
```

## 计算某字符出现的次数

> 简单

### 描述

写出一个程序，接受一个由字母、数字和空格组成的字符串，和一个字符，然后输出输入字符串中该字符的出现次数。（不区分大小写字母）

### 输入描述：

第一行输入一个由字母、数字和空格组成的字符串，第二行输入一个字符（保证该字符不为空格）。

### 输出描述：

输出输入字符串中含有该字符的个数。（不区分大小写字母）

### 示例

输入：
ABCabc
A
输出：
2

### 解题思路

将字符串和字符都转成全小写（或全大写），然后记录出现的次数

```js
void async funtion() {
  const arr = []
  while(line = await readline()) {
    arr.push(line)
  }
  let str = arr[0].toLowerCase()
  let target = arr[1].toLowerCase()
  let count = 0
  for(let i = 0; i < str.length; i++) {
    if(target == str[i]) {
      count++
    }
  }
  console.log(count)
}()
```

## 明明随机数

> 较难

### 题目描述

明明生成了 N 个 1 到 500 之间的随机整数。请你删去其中重复的数字，即相同的数字只保留一个，把其余相同的数去掉，然后再把这些数从小到大排序，按照排好的顺序输出。

### 输入描述：

第一行先输入随机整数的个数 N 。 接下来的 N 行每行输入一个整数，代表明明生成的随机数。 具体格式可以参考下面的"示例"。

### 输出描述：

输出多行，表示输入数据处理后的结果

### 示例

输入：
3
2
2
1
输出：
1
2
说明：
输入解释：
第一个数字是 3，也即这个小样例的 N=3，说明用计算机生成了 3 个 1 到 500 之间的随机整数，接下来每行一个随机数字，共 3 行，也即这 3 个随机数字为：
2
2
1
所以样例的输出为：
1
2

### 解题思路

先将数组排序，然后使用 Set 去重

```js
void async function () {
  let arr = []
  while ((line = await readline())) {
    arr.push(line)
  }
  arr.splice(0, 1)
  arr.sort((a, b) => a - b)
  arr.forEach((i) => {
    console.log(i)
  })
}
```

### 解题思路二

使用 indexOf 判断元素是否是第一个出现的

```js
function uniqueAndSort(arr) {
  const uniqueArr = arr.filter(
    (item, index, array) => array.indexOf(item) === index
  )
  return uniqueArr.sort((a, b) => a - b)
}
```

## 字符串分隔

### 描述

•输入一个字符串，请按长度为 8 拆分每个输入字符串并进行输出；

•长度不是 8 整数倍的字符串请在后面补数字 0，空字符串不处理。

### 输入描述：

连续输入字符串(每个字符串长度小于等于 100)

### 输出描述：

依次输出所有分割后的长度为 8 的新字符串

### 示例

输入：
abc
输出：
abc00000

### 解题思路

先对字符串进行补零操作

```js
void async function () {
  while ((line = await readline())) {
    line += '0000000'
    for (let i = 8; i < line.length; i += 8) {
      console.log(line.slice(i - 8, i))
    }
  }
}
```

## 进制转换

### 描述

写出一个程序，接受一个十六进制的数，输出该数值的十进制表示。

### 输入描述：

输入一个十六进制的数值字符串。

### 输出描述：

输出该数值的十进制字符串。不同组的测试用例用\n 隔开。

### 示例

输入：
0xAA
输出：
170

### 解题思路

parseInt()和 toString()

```js
const num = await readline()
console.log(num.toString(10))
```

## 质数因子

### 描述

功能:输入一个正整数，按照从小到大的顺序输出它的所有质因子（重复的也要列举）（如 180 的质因子为 2 2 3 3 5 ）

### 输入描述：

输入一个整数

### 输出描述：

按照从小到大的顺序输出它的所有质数的因子，以空格隔开。

### 示例

输入：
180
输出：
2 2 3 3 5

### 解题思路

```js
let n = await readline()
let i,
  res = []
for (i = 2; i * i <= n; i++) {
  while (n % i === 0) {
    res.push(i)
    n /= i
  }
}
if (n > 1) res.push(n)
console.log(res.join(' '))
```

## 取近似值

### 描述

写出一个程序，接受一个正浮点数值，输出该数值的近似整数值。如果小数点后数值大于等于 0.5 ,向上取整；小于 0.5 ，则向下取整。

### 数据范围：保证输入的数字在 32 位浮点数范围内

输入描述：
输入一个正浮点数值

### 输出描述：

输出该数值的近似整数值

### 示例 1

输入：
5.5
输出：
6
说明：
0.5>=0.5，所以 5.5 需要向上取整为 6

### 示例 2

输入：
2.499
输出：
2
说明：
0.499<0.5，2.499 向下取整为 2

### 解题思路

round: 四舍五入
ceil：向上取整
floor：向下取整
toFixed：四舍五入保留小数位
parseInt：数值取整

```js
const num = await readline()
console.log(Math.round(num))
```

## 合并表记录

### 描述

数据表记录包含表索引 index 和数值 value（int 范围的正整数），请对表索引相同的记录进行合并，即将相同索引的数值进行求和运算，输出按照 index 值升序进行输出。

### 输入描述

先输入键值对的个数 n（1 <= n <= 500）
接下来 n 行每行输入成对的 index 和 value 值，以空格隔开

### 输出描述

输出合并后的键值对（多行）

### 示例 1

输入：
4
0 1
0 2
1 2
3 4
输出：
0 3
1 2
3 4
复制

### 示例 2

输入：
3
0 1
0 2
8 9
输出：
0 3
8 9

### 解题

使用一个对象存储，判断有相同的 key 就将 value 相加，最后排序后输出

```js
let obj = {}
while ((line = await readline())) {
  let obj = {}
  while ((line = await readline())) {
    let [key, value] = line.split(' ')
    key = parseInt(key)
    value = parseInt(value)
    if (value) {
      if (obj.hasOwnProperty(key)) {
        obj[key] += value
      } else {
        obj[key] = value
      }
    }
  }
  Object.keys(obj)
    .sort((a, b) => a - b)
    .forEach((key) => {
      console.log(`${key} ${obj[key]}`)
    })
}
```

## 提取不重复的整数

### 描述

输入一个 int 型整数，按照从右向左的阅读顺序，返回一个不含重复数字的新的整数。
保证输入的整数最后一位不是 0 。

### 输入描述：

输入一个 int 型整数

### 输出描述：

按照从右向左的阅读顺序，返回一个不含重复数字的新的整数

### 示例 1

输入：
9876673
输出：
37689

### 解法

可以先将整数转换为字符串，然后再将字符串转换为数组，倒序遍历数组，将每个元素加入一个 Set 中，由于 Set 不允许有重复元素，因此最终得到的就是不含重复数字的新整数。

```js
let arr = line.toString().split('').reverse()
console.log(parseInt([...new Set(arr)].join('')))
```

## 字符个数统计

### 描述

编写一个函数，计算字符串中含有的不同字符的个数。字符在 ASCII 码范围内( 0~127 ，包括 0 和 127 )，换行表示结束符，不算在字符里。不在范围内的不作统计。多个相同的字符只计算一次
例如，对于字符串 abaca 而言，有 a、b、c 三种不同的字符，因此输出 3 。

### 输入描述：

输入一行没有空格的字符串。

### 输出描述：

输出 输入字符串 中范围在(0~127，包括 0 和 127)字符的种数。

### 示例 1

输入：
abc
输出：
3

### 示例 2

输入：
aaa
输出：
1

### 解法 1

使用 map

```js
let map = new Map()
while ((line = await readline())) {
  line.split('').forEach((str) => {
    if (!map.has(str)) {
      map.set(str, true)
    }
  })
  console.log(map.size)
}
```

### 解法二

使用 set

```js
let set = new Set()
while ((line = await readline())) {
  for (let i = 0; i < line.length; i++) {
    let code = line.charCodeAt(i)
    if (code >= 0 && code <= 127 && line[i] != '/n') {
      set.add(line[i])
    }
  }
  return set.size
}
```

## 数字颠倒

### 描述

输入一个整数，将这个整数以字符串的形式逆序输出
程序不考虑负数的情况，若数字含有 0，则逆序形式也含有 0，如输入为 100，则输出为 001

### 输入描述：

输入一个 int 整数

### 输出描述：

将这个整数以字符串的形式逆序输出

### 示例 1

输入：
1516000
输出：
0006151

### 示例 2

输入：
0
输出：
0

### 解法

```js
console.log(String(line).split('').reverse().join(''))
```

## 字符串反转

### 描述

接受一个只包含小写字母的字符串，然后输出该字符串反转后的字符串。（字符串长度不超过 1000）

### 解法

```js
console.log(line.split('').reverse().join(''))
```

## 句子逆序

### 描述

将一个英文语句以单词为单位逆序排放。例如“I am a boy”，逆序排放后为“boy a am I”

所有单词之间用一个空格隔开，语句中除了英文字母外，不再包含其他字符

### 解法

```js
console.log(line.split(' ').reverse().join(' '))
```

## 字符串排序

### 描述

给定 n 个字符串，请对 n 个字符串按照字典序排列。

### 输入描述：

输入第一行为一个正整数 n(1≤n≤1000),下面 n 行为 n 个字符串(字符串长度 ≤100),字符串中只含有大小写字母。

### 输出描述：

数据输出 n 行，输出结果为按照字典序排列的字符串。

### 示例 1

输入：
9
cap
to
cat
card
two
too
up
boat
boot
输出：
boat
boot
cap
card
cat
to
too
two
up

### 解法

使用 localeCompare()

```js
let arr = []
while ((line = await readline())) {
  arr.push(line)
}
arr.splice(0, 1)
arr.sort()
console.log(arr.join('\n'))
```

## 求 int 型正整数在内存中存储时 1 的个数

### 描述

输入一个 int 型的正整数，计算出该 int 型数据在内存中存储时 1 的个数。

### 输入描述：

输入一个整数（int 类型）

### 输出描述：

这个数转换成 2 进制后，输出 1 的个数

### 示例 1

输入：
5
输出：
2
复制

### 示例 2

输入：
0
输出：
0

### 解法

可以使用位运算的方式来实现。首先我们定义一个计数器 count，然后对于一个数 n，每次取出最低位的数（可以使用 n & 1），如果该数为 1，则 count 加 1，然后将 n 右移一位（可以使用 n >>= 1），直到 n 为 0。最后 count 的值即为 1 的个数。

```js
let n = await readline()
let res = 0
while (n) {
  res += n & 1
  n >>= 1
}
console.log(res)
```

## 字符串最后一个单词的长度

### 描述

计算字符串最后一个单词的长度，单词以空格隔开，字符串长度小于 5000。（注：字符串末尾不以空格为结尾）
输入描述：

### 输出描述：

输出一个整数，表示输入字符串最后一个单词的长度。

### 示例 1

输入：
hello nowcoder
输出：
8
说明：
最后一个单词为 nowcoder，长度为 8

### 解法

一种方法是使用 split 函数将字符串拆分成单词数组，然后取出数组中最后一个单词并计算其长度。
另一种方法是从字符串末尾向前遍历，跳过空格，直到遇到第一个空格或者字符串开头为止，这样就可以得到最后一个单词的起始位置和长度。

```js
let str = await readline()
str = str.split(' ')
console.log(str[str.length - 1].length)
```

## 标移动

### 开发一个坐标计算工具， A 表示向左移动，D 表示向右移动，W 表示向上移动，S 表示向下移动。从（0,0）点开始移动，从输入字符串里面读取一些坐标，并将最终输入结果输出到输出文件里面。

### 输入：

合法坐标为 A(或者 D 或者 W 或者 S) + 数字（两位以内）
坐标之间以;分隔。
非法坐标点需要进行丢弃。如 AA10; A1A; $%$; YAD; 等。

### 示例 1

输入：
A10;S20;W10;D30;X;A1A;B10A11;;A10;
输出：
10,-10

### 示例 2

输入：
ABC;AKL;DA1;
输出：
0,0

### 解法

```js
let arr = await readline()
arr = arr.split(';')
arr = arr.filter((i) => /^[AWDS][0-9]{1,2}$/.test(i))
let x, y
for (let i = 0; i < arr.length; i++) {
  const cur = arr[i]
  const distance = cur.slice(1)
  const direction = cur[0]
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
      y += distance
      break
    }
    case 'S': {
      y -= distance
      break
    }
  }
  console.log(`${x},${y}`)
}
```

## 识别有效的 IP 地址和掩码并进行分类

### 描述

请解析 IP 地址和对应的掩码，进行分类识别。要求按照 A/B/C/D/E 类地址归类，不合法的地址和掩码单独归类。

所有的 IP 地址划分为 A,B,C,D,E 五类

A 类地址从 1.0.0.0 到 126.255.255.255;

B 类地址从 128.0.0.0 到 191.255.255.255;

C 类地址从 192.0.0.0 到 223.255.255.255;

D 类地址从 224.0.0.0 到 239.255.255.255；

E 类地址从 240.0.0.0 到 255.255.255.255

私网 IP 范围是：

从 10.0.0.0 到 10.255.255.255

从 172.16.0.0 到 172.31.255.255

从 192.168.0.0 到 192.168.255.255

子网掩码为二进制下前面是连续的 1，然后全是 0。（例如：255.255.255.32 就是一个非法的掩码）
（注意二进制下全是 1 或者全是 0 均为非法子网掩码）

注意：

1. 类似于【0._._._】和【127._._._】的 IP 地址不属于上述输入的任意一类，也不属于不合法 ip 地址，计数时请忽略
2. 私有 IP 地址和 A,B,C,D,E 类地址是不冲突的

### 输入描述：

多行字符串。每行一个 IP 地址和掩码，用~隔开。

请参考帖子https://www.nowcoder.com/discuss/276处理循环输入的问题。

### 输出描述：

统计 A、B、C、D、E、错误 IP 地址或错误掩码、私有 IP 的个数，之间以空格隔开。

### 示例 1

输入：
10.70.44.68~255.254.255.0
1.0.0.1~255.0.0.0
192.168.0.2~255.255.255.0
19..0.~255.255.255.0
输出：
1 0 1 0 0 2 1
复制
说明：
10.70.44.68~255.254.255.0 的子网掩码非法，19..0.~255.255.255.0 的 IP 地址非法，所以错误 IP 地址或错误掩码的计数为 2；
1.0.0.1~255.0.0.0 是无误的 A 类地址；
192.168.0.2~255.255.255.0 是无误的 C 类地址且是私有 IP；
所以最终的结果为 1 0 1 0 0 2 1

## 简单密码

### 描述

现在有一种密码变换算法。
九键手机键盘上的数字与字母的对应： 1--1， abc--2, def--3, ghi--4, jkl--5, mno--6, pqrs--7, tuv--8 wxyz--9, 0--0，把密码中出现的小写字母都变成九键键盘对应的数字，如：a 变成 2，x 变成 9.
而密码中出现的大写字母则变成小写之后往后移一位，如：X ，先变成小写，再往后移一位，变成了 y ，例外：Z 往后移是 a 。
数字和其它的符号都不做变换。

### 输入描述：

输入一组密码，长度不超过 100 个字符。

### 输出描述：

输出密码变换后的字符串

### 示例 1

输入：
YUANzhi1987
输出：
zvbo9441987

### 解法

```js
function func(str) {
  const map = {
    2: /[abc]/g,
    3: /[def]/g,
    4: /[ghi]/g,
    5: /[jkl]/g,
    6: /[mno]/g,
    7: /[pqrs]/g,
    8: /[tuv]/g,
    9: /[wxyz]/g,
    0: /0/g,
    1: /1/g,
  }

  let transform = str.replace(/[\W_]gi/, '')

  for (let key in map) {
    transform = transform.replace(map[key], key)
  }

  transform = transform.toLowerCase().replace(/[a-z]/g, function (char) {
    if (char === 'z') {
      return 'a'
    } else {
      return String.fromCharCode(char.charCodeAt(0) + 1)
    }
  })
  console.log(transform)
}

func('YUANzhi1987')
```

## 汽水瓶

### 描述

某商店规定：三个空汽水瓶可以换一瓶汽水，允许向老板借空汽水瓶（但是必须要归还）。
小张手上有 n 个空汽水瓶，她想知道自己最多可以喝到多少瓶汽水。

### 输入描述：

输入文件最多包含 10 组测试数据，每个数据占一行，仅包含一个正整数 n（ 1<=n<=100 ），表示小张手上的空汽水瓶数。n=0 表示输入结束，你的程序不应当处理这一行。

### 输出描述：

对于每组测试数据，输出一行，表示最多可以喝的汽水瓶数。如果一瓶也喝不到，输出 0。

### 示例 1

输入：
3
10
81
0
输出：
1
5
40
说明：
样例 1 解释：用三个空瓶换一瓶汽水，剩一个空瓶无法继续交换
样例 2 解释：用九个空瓶换三瓶汽水，剩四个空瓶再用三个空瓶换一瓶汽水，剩两个空瓶，向老板借一个空瓶再用三个空瓶换一瓶汽水喝完得一个空瓶还给老板

```js
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
```

## 前序遍历

```js
function preorderTravelsal() {
  // 前序遍历：中->左->右
  if (!root) {
    return [];
  }

  var stack = [root];
  var result = [];

  while (stack.length > 0) {
    var node = stack.pop();
    result.push(node.val);

    // 因为栈先进后出的特点，所以要先推入右节点
    if (node.right) {
      stack.push(node.right);
    }
    if (node.left) {
      stack.push(node.left);
    }
  }

  return result;
}
```
