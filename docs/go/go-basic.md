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