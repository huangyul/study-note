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