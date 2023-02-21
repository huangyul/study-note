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

parseInt()和toString()

```js
const num = await readline()
console.log(num.toString(10))
```

## 质数因子

