# GO 入门

## GO 基本语法和 Web 框架起步

### main 函数

- 无参数、无返回值
- main 方法必须要在 main 包
- `go run main.go`就可以执行
- 如果文件不叫`main.go`，则需要`go build`得到可执行文件

```go
func main() {
  print("hello, go")
}
```

## 包声明

- 语法形式：pacakge xxx
- 字母和下划线都支持
- 可以和文件夹不同名字
- 同一文件夹下的声明一致
- 引入包语法形式 import
- 匿名引用使用`_`，一般是为了执行包里面的`init`方法

```go
package main

import (
  "fmt"
  _ "string" // 匿名引用
)
```

## 基本类型

### string

- 双引号引起来，则内部双引号需要使用\转
  义
- `引号引起来，则内部`需要\转义

string 的长度很特殊：

- 字节长度：和编码无关，用 len(str)获取
- 字符数量：和编码有关，用编码库来计算

```go
println(len("你好")) // 输出6
println(utf8.RuncCountInString("你好")) // 输出 2
```

### strings 包

- string 的拼接直接使用 + 号就可以。
- strings 主要方法（你所需要的全部都可以找
  到）：
  - 查找和替换
  - 大小写转换
  - 子字符串相关
  - 相等

### rune

- rune，直观理解，就是字符
- rune 不是 byte!
- rune 本质是 int32，一个 rune 四个字节
- rune 在很多语言里面是没有的，与之对应的
是，golang 没有 char 类型。rune 不是数字，
也不是 char，也不是 byte！
- 实际中不太常用

### bool,int,unit,float

- bool: true, false
- int8, int16, int32, int64, int
- uint8, uint16, uint32, uint64, uint
- float32, float64

### byte

- 本质是unit8
- 对应的操作包在bytes上

### 总结

- golang 的数字类型明确标注了长度、有无符号
- golang 不会帮你做类型转换，类型不同无法通过编译。也因此，string 只能和string 拼接
- golang 有一个很特殊的 rune 类型，接近一般语言的 char 或者 character 的概念，非面试情况下，可以
理解为 “
rune = 字符”
- string 遇事不决找 strings 


## 变量

### 声明

#### var

- 语法：`var name type = value`
- 可以声明局部变量，包变量，块变量
- 首字符是否大写控制了访问性
- 支持类型推断

#### :=

- 只能用于局部变量，即方法内部