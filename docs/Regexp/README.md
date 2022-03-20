# 正则表达式

基本用法

```javascript
// 判断字符串是否符合
const regexp = /hello/
console.log(regexp.test('hello')) // true

// 找出所以符合的情况，并已数组的情况返回
const regex = /a/g
console.log('abca'.match(regex)) // ['a','a']
```

## 正则表达式字符串匹配攻略

### 两种模糊匹配

#### 横向模糊匹配

指一个正则可匹配的字符串的长度不是固定的，使用方式：`{2, 5}` 匹配 2 到 5 个

```javascript
// 匹配第一个字符串是a，接下来2到5个字符串b，最后是c，并且全局匹配
const regex = /ab{2, 5}c/g

const string = 'abc abbbc abbbbbbc'

console.log(string.match(regex)) // [ 'abbbbc' ]
```

#### 纵向模糊匹配

指匹配到某一个字符时，可以有多种可能，使用方式：`[abc]`，指可以是 a、b、c 中的任意一个

```javascript
// 匹配a1b a2b a3b
const regex = /a[123]b/g
const string = 'a1b a2b a4b'
console.log(string.match(regex)) // [ 'a1b', 'a2b' ]
```
