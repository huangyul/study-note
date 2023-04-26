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

- 本质是 unit8
- 对应的操作包在 bytes 上

### 总结

- golang 的数字类型明确标注了长度、有无符号
- golang 不会帮你做类型转换，类型不同无法通过编译。也因此，string 只能和 string 拼接
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

#### 易错点

- 声明了没有使用会报错
- 类型不匹配
- 同一个作用域下，只能声明一次

## 方法

### 方法声明

支持多返回

```go
func Func1(name string, age int) (int, error) {
  return 8, error
}
```

### 总结

- golang 支持多返回值，这是一个很大的不同点
- golang 方法的作用域和变量作用域一样，通过大小写控制
- golang 的返回值是可以有名字的，可以通过给予名字让调用方清楚知道你返回的是什么

## fmt 格式化输出

- 掌握常用的：%s, %d, %v, %+v, %#v
- 不仅仅是 `fmt`的调用，所有格式化字符串
  的 API 都可以用
- 因为 golang 字符串拼接只能在 string 之间，
  所以这个包非常常用

```go
name := "huang"
age := 12
fmt.Sprintf("%s, %d", name, age)
```

## 数组和切片

### 数组

数组和别的语言的数组差不多，语法
是：[cap]type

1. 初始化要指定长度（或者叫做容量）
2. 直接初始化
3. arr[i]的形式访问元素
4. len 和 cap 操作用于获取数组长度

```go
a1 := [3]int{9,8,7}
a1[0] // 访问元素
len(a1)
```

### 切片

切片,语法：[]type

1. 直接初始化
2. make 初始化:make([]type, length, capacity)
3. arr[i] 的形式访问元素
4. append 追加元素
5. len 获取元素数量
6. cap 获取切片容容量
7. 推荐写法：s1 := make([]type, 0,cap)

#### 子切片

数组和切片都可以通过`[start:end]` 的形式来获取
子切片：

1. ` arr[start:end]`，获得[start, end)之间的元素
2. `arr[:end]`，获得[0, end) 之间的元素
3. `arr[start:]`，获得[start, len(arr))之间的元素

## http 库

### Request

###### Body

只能读一次

```go
func handler(w http.ResponseWriter, r *http.Request) {
  body := r.Body
}

```

###### GetBody

原则上可以读多次，但是原生的 http.Request 里面，这个是 nil

###### Query

查询参数

```go
func handlerQuery(w http.ResponseWriter, r *http.Request) {
	values := r.URL.Query()
	fmt.Fprintf(w, "query is %v\n", values)
}

```

###### URL

包含路径方面的所有信息和一些很有用的操作，但只有 path 是肯定存在的

###### Form

使用 Form 之前要先调用 parseForm

```go
err := r.ParseForm
form := r.Form
```

## type 定义

有四种方式：

1. type name interface {}
2. type name struct {}
3. type name otherType
4. type name = oterType

###### 接口

里面只能有方法，是一组行为的抽象；尽量使用接口来实现面向接口编程

```go
type Server interface {
	Route(pattern string, handleFunc http.HandlerFunc)
	Start(address string) error
}
```
