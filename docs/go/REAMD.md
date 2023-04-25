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
