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

### 数组的比较

长度相同的数组才能比较

### 多维数组

```go
var arr [2][2]int
arr[0] = [2]int{1, 2}
arr[1] = [2]int{2, 2}
fmt.Println(arr)
```

## 切片

> 非常重要和常用，可以理解成其他语言动态的 array

### 切片的定义

```go
var course []string
```

### 添加数据

```go
var course []int
// 注意要注意，一定要接收返回值
course = append(course, 222)
```

### 初始化的方式

1. 从数组中直接创建
2. 使用 string
3. make

第一种方式

```go
// 先定义一个数组
course := []int{1, 2, 3, 4, 5}
// 使用[],左闭右开
list := course[0:2] // 1,2
fmt.Println(list)
```

第二种方式

```go
list1 := []int{1, 2, 3, 4, 5}
```

第三种

```go
// 第一个参数是类型，第二个是容量
list1 := make([]int, 3)
```

如果不使用`make`创建带有容量的，必须使用`append`来推入元素，并且要接收返回值

### 获取切片的元素

访问单个，注意不能超出长度

```go
list[0]
```

获取一段数据

```go
list[start:end]
```

说明：

1. 如果有 start，没有 end，表明从 start 到结尾的所有数据
2. 如果只有 end，没有 start，表明从 0 到 end 的所有数据
3. 如果两个都没有，就是全部获取

### 如何删除元素

```go
list := []int{1, 2, 3, 4, 5}
// 现在要删除3
newList := append(list[:2], list[3:]...)
fmt.Println(newList) // 1 2 4 5
```

原理就是先取再拼接

### 如何复制

```go
list := []int{1,2,3,4,5}
// 浅拷贝
list1 := list[:]
list2 := list
// 拷贝（深拷贝）
var list3 = make([]int, len(list))
copy(list1, list3)
```

## 切片的底层原理

slice 在函数参数传递是值传递，但又有引用传递的效果

切片本质上是一个结构体，里面有三个值：

1. 指向的数组或切片，放的是指针
2. 长度 len，指切片的长度
3. 容量 cap，指切片最大的长度

假如有两个切片都是使用同一个数组生成的，那他们都指向同一个数组，此时三者无论谁改变，都会影响其他的两个的值；每当 appned 时，如果 len 没有超出 cap，不会发生扩容，还是会改变原数组；当 len 大于 cap 时，会发生扩容，会复制出一个新的数组，此时两个切片就不会相互影响；扩容一般时成倍增加的，但增加到 512 后，以后就不会成倍增加

```go
	arr := [10]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	s1 := arr[2:7]
	s2 := arr[3:6]
	fmt.Println(s1) // [3 4 5 6 7]
	fmt.Println(s2) //[4 5 6]
	// 改变了其中一个的值，会影响另外一个
	s1[1] = 99      //7
	fmt.Println(s1) //[3 99 5 6 7]
	fmt.Println(s2) //[99 5 6]
	// 在没有发生扩容的情况下，还是会互相影响
	for i := 0; i < 4; i++ {
		s2 = append(s2, 88)
	}
	fmt.Println(s1)  //[3 99 5 6 88]
	fmt.Println(s2)  //[99 5 6 88 88 88 88]
	fmt.Println(arr) //[1 2 3 99 5 6 88 88 88 88]
	// 如果发生了扩容
	s2 = append(s2, 77)
	// 改变原来的值，就不会再相互影响
	s2[0] = 77
	fmt.Println(s1)  //[3 99 5 6 88]
	fmt.Println(s2)  //[77 5 6 88 88 88 88 77]
	fmt.Println(arr) //[1 2 3 99 5 6 88 88 88 88]
```

## Map

key-value 的键值组合，主要用于查询

### 初始化和赋值

```go
// 初始化
var courseMap map[string]string
var courseMap1 = map[string]string{
"go": "go",
}
courseMap2 := map[string]string{
"go": "go",
}
courseMap3 := make(map[string]string, 3)
fmt.Println(courseMap, courseMap1, courseMap2)
// 取值
fmt.Println(courseMap1["go"])
// 设置值
courseMap1["go2"] = "go2"
```

注意：map 必须要初始化，否则会报错 var myMap = map[string]string

### Map 遍历

```go
courseMap := map[string]string{"go": "go", "aa": "aa"}
for key, value := range courseMap {
fmt.Println(key, value)
}
```

### 获取 map 里面的元素

不能通过`map["xxx"]`判断，因为没有时也为空

```go
courseMap := map[string]string{"go": "go", "aa": "aa"}
d, ok := courseMap["go"]
if !ok {
fmt.Println("没有该key")
}
fmt.Println(d)

if d, ok := courseMap["go"]; !ok {
fmt.Println("not find")
} else {
fmt.Println(d)
}
```

### 删除

```go
delete(courseMap, "go")
```

## list

链表

- 空间要求不是连续的，而 slice 要求内存空间是连续的
- 但每一个都包含一个指针，会造成一点空间浪费

### 基本用法

```go
var myList list.List
myList := list.New()
// 放入值
myList.PushBack("go")
myList.PushBack("grpc")
// 遍历打印
for i := myList.Front(); i != nil; i = i.Next() {
fmt.Println(i.Value)
}
```

## 函数

### 函数是第一等公民

1. 函数本身可以当作变量
2. 函数包含匿名函数，闭包
3. 函数可以满足接口

### 函数本身可以当作变量

### 可变参数

```go
func add(items ...int) int {
  return len(items)
}
```

### 一等公民的特性

```go
func add(myfunc func(int) int) int {
  return myfunc()
}
```