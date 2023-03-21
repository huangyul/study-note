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

- 常量类型只可以定义bool，数值（整数，浮点数和复数）和字符串
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
上面代码中，b和c是1，e是d，也就是会跟随上一个的值

## iota

一个特殊常量，可以认为是一个被编译器修改的常量，默认从0开始，1递增

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
