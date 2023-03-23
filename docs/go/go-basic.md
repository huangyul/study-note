# Go 基础笔记

## Hello World

要执行代码，包名必须是`main`，方法名必须是`main`

```go
package main

import "fmt"

func main() {
  fmt.Println("hello world")
}
```

两种运行方法：

1. 第一种是使用 ide 的运行
2. 生成可执行文件
   1. `go build ./xxx.go`生成可执行文件 xxx.exe 后，需要手动运行
   2. `go run ./xxx.go`直接生成可执行文件并运行

注意点：

- 同一个目录下只能有一个`main`函数

## 变量

1. 变量必须是先定义后使用
2. 变量必须有类型
3. 类型定义后不能改变

### 定义变量的方式

```go
// 方式1
var name string
// 方式2 这里可以省略类型是因为系统会推断
var name = "huang"
// 方式3 最常用
age := 3
```

> 注意：变量定义了一定要使用，不然会报错

### 全局变量和局部变量

```go
// 定义在函数外的就是全局变量
var name = "huang"
var (
  ok = bool
  age = 11
)
func main() {
  // 局部变量
  age := 1
}
```

### 多变量定义

```go
var user1, user2, user3 string = "huang", 1, "ss"
```

### 0 值特性

定义了 `int`，没有赋值，就是 `0`

## 常量

定义了后就不能修改

用处：如果是一些值绝对不会改，就建议使用常量

使用关键字`const`

- 常量类型只可以定义 bool，数值（整数，浮点数和复数）和字符串
- 不曾使用的常量，在编译是不会报错，没有强制使用的要求
- 显式指定类型的时候，必须确保常量左右类型一致

### 细节

```go
const (
  a = 1
  b
  c
  d = "huang"
  e
)
```

上面代码中，b 和 c 是 1，e 是 d，也就是会跟随上一个的值

## iota

一个特殊常量，可以认为是一个被编译器修改的常量，默认从 0 开始，1 递增

```go
func main() {
	const (
		n1 = iota
		n2
		n3
	)
	fmt.Print(n1, n2, n3)
}
```

特殊用法

```go
const (
  n1 = iota // 0
  n2 // 1
  n3 = "h" // h
  n4 // h
  n5 // 3
)
```

## 匿名变量

一般变量是定义了一定要使用，匿名变量是定义了可以不调用

一般用在函数返回值不用的时候

```go
func a() (int, bool) {
  return 0, false
}

_, ok := a() // 此时用了匿名变量
```

## 变量的作用域

跟 js 相似，以大括号形成一个作用域

## 基本类型

基本类型包括：bool，数值类型（整数，浮点数，复数，byte 字节，rune 类型），字符和 string

### bool

只能是 true 和 false

### 数值类型

#### 整数型

1. uint8
   无符号 8 位整型 (0 到 255)
2. uint16
   无符号 16 位整型 (0 到 65535)
3. uint32
   无符号 32 位整型 (0 到 4294967295)
4. uint64
   无符号 64 位整型 (0 到 18446744073709551615)
5. int8
   有符号 8 位整型 (-128 到 127)
6. int16
   有符号 16 位整型 (-32768 到 32767)
7. int32
   有符号 32 位整型 (-2147483648 到 2147483647)
8. int64
   有符号 64 位整型 (-9223372036854775808 到 9223372036854775807)

根据实际情况使用哪种类型，包括范围和空间，在满足范围的情况下尽量节省空间

##### 定义

```go
var a int8
var ua uint8
var e int // 动态类型，根据操作系统来定义
```

#### 浮点数

1. float32 32 位浮点数
2. float64 64 位浮点数

#### 定义

```go
var f1 float32
f1 = 3
f1 = 3.13
```

### byte 类型

本质上就是`unit8`，主要用于存放字符，相当于`char`

#### 定义

```go
	var c byte
	c = 'a'
	fmt.Printf("c=%c", c) // 本质上是存放ascii码
  c = 'a' + 1
```

### rune

本质上`int32`，主要用来存放字符，主要处理中文字符

```go

```

### 字符串

```go
var s string
s = "huang"
```

## 数据类型转换

### int 和 float 直接转

直接用就行

```go
f := 5.0
b := int(f)
```

注意：

- 浮点类型转整型，会丢小数点

### string

字符转整型
strconv.Atoi(str, )
整型转字符串
strconv.ItoA(int)

```go
var istr string = "32"
myint, err := strconv.Atoi(istr)
if err != nil {
fmt.Println("convert error")
}
fmt.Println(myint)
```

### 其他转换的方法

#### string 转基础类型

```go
// 指定是float32 或 float64
strconv.parseFloat("3.23", 64)
// 以几进制  int几
strconv.parseInt("4", 10, 8)
// "true" "1" 会转换为true
strconv.parseBool("true")
```

#### 基础类型转 string

```go
strconv.FormatBool(true)
strconv.FormatFloat(3.123)
```

## 运算符和表达式

基本和其他语言一致

## 转义符

比如要显示 go"hh"go

要这样写
`"go\"hh\"go"`

就是处理特殊符号

## 格式化输出

```go
username := "username"
age := 12
out := "hello" + " " + username
fmt.Printf("用户名：%s,年龄:%d,say: %s", username, age, out)
// 返回一个字符串
str := fmt.Sprintf("用户名：%s,年龄:%d,say: %s", username, age, out)
```

## 高性能字符串拼接

```go
username := "haung"
age := 30
var builder strings.Builder
builder.WriteString("用户名")
builder.WriteString(username)
builder.WriteString("年龄")
builder.WriteString(strconv.Itoa(age))
re := builder.String()
fmt.Println(re) //用户名haung年龄30
```

## 字符串比较

```go
// 对比是否相同
a := "hello"
b := "hello"
fmt.Println(a == b)
```

## 字符串常用操作方法

### 是否包含

```go
	name := "huang yaojie"
	name1 := "huang"
	fmt.Println(strings.Contains(name, name1))
```

### 字符串的长度

`len(str)`

### 字符串查询子串出现字数

`Strings.Count(str, str1)`

### 分割字符串

`Strings.Split(str, '-')`

### 字符串是否包含前，后缀

`Strings.HasPrefix(str, "i")`
`Strings.HasSuffix(Str, "i")`

### 查询子串出现的位置

`Strings.Index(str, "h")`

### 替换

`Strings.Replace(str, "target", "newStr", n)`

### 大小写转换

`Strings.ToLower(str)`
`Strings.ToUpper(str)`

### 去掉特殊字符（左右两边）

`Strings.Trim(str, " ")`
`TrimLeft  TrimRight`

## 条件语句

```go
if true {
fmt.Println("true")
} else {
fmt.Println("false")
}
```

## for 循环

```go
for i := 0; i < 10; i++ {
fmt.Println(i)
}

for i <= 3 {
  // do something
}
```

## forrange

```go
	name := "huang"
	for index, value := range name {
		fmt.Printf("%d ,%c\r\n", index, value)
	}
```

## 数组

**golang 提供了以下几种数据结构**

- 数组
- 切片(slice)
- map
- list

### 定义

```go
var arr []int
arr[0] = 1
```

数组长度不同时，会被定义为一种类型，所以不同长度的数组不能相互赋值，不灵活

### 初始化

```go
var arr = [3]string{"2", "3", "4"}
var arr = [3]string{2: "sss"}
var arr3 = [...]string{"a","b","c"}
```
