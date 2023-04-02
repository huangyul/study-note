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

### 闭包

```go
func autoAddOne() func() int {
	local := 0
	return func() int {
		local += 1
		return local
	}
}

func main() {
	var f = autoAddOne()
	for i := 1; i < 5; i++ {
		fmt.Println(f())
	}
}
```

### defer

相当于 finally，在一些操作，比如链接数据库，打开文件等，最后都去操作某些事

```go
var mu sync.Mutex
mu.Lock()
defer mu.Unlock() // defer后面的代码会放在函数retur之前执行
```

多个`defer`相当于栈的先进后出，后面的`defer`会先执行

defer 可以修改函数的输出

```go
func deferReturn() (ret int) {
	defer func() {
		ret++
	}()
	return 10
}

func main() {
	ret := deferReturn()
	fmt.Printf("ret = %d\r\n", ret) // 11
}
```

### 捕获错误

```go
func A() (int, error) {
	return 0, errors.New("this is an error")
}

func main() {
	if _, err := A(); err != nil {
		fmt.Println(err)
	}
}
```

### panic 和 recover

使用 panic，会导致程序退出，但不推荐使用

```go
func A() (int, error) {
	panic("this is an panic") // 导出程序退出，后面不执行
	fmt.Println("this is a func")
	return 0, errors.New("this is an error")
}
```

比如服务想要启动，必须要依赖服务准备好，比如日志文件，`mysql`能链接通，才能链接，如果启动中有不满足的，主动调用`panic`

代码有错误时，会主动调用`panic`方法，recover 可以捕获`panic`

```go
defer func() {
if r := recover(); r != nil {
fmt.Println("recover if A: ", r)
}
}()
var names map[string]string // 故意没有初始化，会报错
fmt.Println("panic", names)
```

1. defer 需要放在 panic 之前定义，另外 recover 只有在 defer 调用函数中才会生效
2. recover 处理异常后，逻辑并不会恢复到 panic 那个点
3. 多个 defer 会形成栈，后定义 defer 会新执行

## 结构体

### type 关键字

1. 用来定义结构体
2. 定义接口
3. 定义类型别名
4. 类型定义
5. 类型判断

```go
// 类型别名
type MyInt = int
var i MyInt = 12 // 本质还是int

// 类型定义
type MyInt int
var i MyInt = 12 // 类型已经真的是MyInt了

// 类型判断
var a interface{} = "abc"
switch a.(type) {
  case string:
    fmt.Println("字符串")
}
```

### 定义及初始化

```go
type Person struct {
	name    string
	age     int
	address string
}

func main() {
	p1 := Person{
		"huang",
		23,
		"地址",
	}
	p2 := Person{
		name:    "huang",
		age:     33,
		address: "地址",
	}
}
```

### 匿名结构体

### 结构体嵌套

```go
type Person struct {
	name string
	age  int
}

type Student struct {
	p     Person
	score float32
}

type Student2 struct {
	Person
	score int
}

func main() {
	stu1 := Student{
		Person{
			"huang",
			18,
		},
		9.99,
	}
	fmt.Println(stu1.p.age)

	stu2 := Student2{Person{
		"huang", 18,
	}, 8,
	}

	fmt.Println(stu2.name)
}
```

### 结构体定义方法

```go
type Person struct {
	name string
	age  int
}

func (p Person) sayHi() {
	fmt.Printf("name: %s", p.name)
}

```

## 指针

```go
type Person struct {
	name string
}

// 接收指针
func change(p *Person) {
	p.name = "333"
}

func main() {
	p1 := Person{
		"999",
	}
	// 这里就要传地址
	change(&p1)
	fmt.Println(p1.name)
}
```

### 指针的定义

```go
var p0 *int
```

**golang 不能对指针进行运算**

### 指针的初始化

```go
// 第一种方式
p := &param
// 第二种方式
p := &Person{}
// 第三种方式
p := new(Person)
// new方法会返回地址
```

### 交换指针的值

```go
// 错误写法
func swap(a, b *int) {
  a, b = b, a
}

func swap(a, b *int) {
	t := *a // 获取a的值
	*a = *b
	*b = t
}

func main() {
	a := 1
	b := 2
	swap(&a, &b)
	fmt.Println(a, b)
}

```

在错误写法中，把 a，b 的地址传了进去，进行交互，注意函数传参是值传递，在函数内部交换了两个地址对外部没什么影响，真正需要的是将两个地址中的值进行交换

### nil

代表某些数据类型的零值，不同数据类型的零值是不一样的

- bool false
- numbers 0
- string ""
- pointer nil 指针
- slice nil
- map nil
- channel,interface,func nil
- struct 默认值是具体字段的默认值

### 判断 nil

`== nil`

## 接口 interface

### 鸭子类型

走起路来丫丫叫的就是鸭子，是一种形容，强调事物的外部行为（暴露的方法），而不是内部的结构（属性）

### 定义接口

```go
type Duck interface {
	Gaga()

	Walk()
}

type pskDuck struct {
	legs int
}

func (pd *pskDuck) Gaga() {
	fmt.Println("gaga")
}

func (pd *pskDuck) Walk() {
	fmt.Println("walking")
}
func main() {
	var d Duck = &pskDuck{}
	d.Walk()
}

```

### 多接口实现

```go
type Type1 interface {
	type1()
}
type Type2 interface {
	type2()
}
type Type3 struct {
}

func (t *Type3) type1() {
	fmt.Println("type1")
}
func (t *Type3) type2() {
	fmt.Println("type2")
}
func main() {
	var t Type1 = &Type3{}
	t.type1()
	var t2 Type2 = &Type3{}
	t2.type2()
}

```

### 动态类型传参

```go
func add(a, b interface{})int {
  // 断言为int
  ai, _ := a.(int)
  bi, _ := b.(int)
  return ai + bi
}
```

### 通过 switch 语句进行类型判断

```go
func add(a, b interface{}) interface{} {
	switch a.(type) {
	case int:
		ai, _ := a.(int)
		bi, _ := b.(int)
		return ai + bi
	case int32:
		ai, _ := a.(int32)
		bi, _ := b.(int32)
		return ai + bi
	default:
		panic("not supported type")
	}
}
```

### 接口嵌套

也就是继承

```go
type MyWriter interface {
	Write()
}

type MyReader interface {
	Read()
}

type MyRW interface {
	MyWriter
	MyReader
	RW()
}

type SreadWrite struct {
}

func (s SreadWrite) Write() {
	//TODO implement me
	panic("implement me")
}

func (s SreadWrite) Read() {
	//TODO implement me
	panic("implement me")
}

func (s SreadWrite) RW() {
	//TODO implement me
	panic("implement me")
}
```

## 包

1. 同一个目录下，所有源码的 package 都要一样
2. 同一目录下，可以直接引用其他文件的内容
3. 不同目录需要 import

### import

1. 尽量 package 和目录名保持一直
2. 可以使用别名 import u "xxx/xxx/xx"
3. import . "xx/xx/xx"将内容全部导入，可以不用加前缀使用，但是尽量少用！！
4. 匿名导入，单纯只想导入，不想用，一般是初始化的时候用

### Go 代理

设置国内镜像

`go env -w GOPROXY=https://goproxy.cn,direct`

### go.mod

#### go get

```bash
go get github.com/xxx/xx
```

#### go mod tidy

清空未使用的包，并下载未下载的依赖

#### go get -u

升级到最新的版本

go get -u=patch 升级到最新的修订版

## 编码规范

### 代码规范

#### 命名规范

1. 包名
   1. 尽量和目录保持一致
   2. 尽量采用有意义的包名，简短
   3. 不要和标准库冲突
   4. 包名全部小写
2. 文件名
   1. user_name.go 采用蛇形命名法
3. 变量名
   1. 驼峰：userName un
4. 结构体命名
   1. 驼峰：UserName（导出） 不导出小写
5. 接口命名
   1. 和结构体差不多
6. 常量命名
   1. 全部大写，如果多个单词，采用蛇形 APP_VERSION

#### 注释规范

跟其他语言一样

## 单元测试

### 用例

使用`go test`命令执行测试，约定如下：

1. 以`_test.go`为后缀的源码文件都会被`go test`运行到
2. `go build`不会将测试文件打包到可执行文件中
3. test 文件里面有 4 类
   1. Test 开头的，是功能测试
   2. Benchmark 开头的，是性能测试
   3. example 模糊测试

```go
func TestAdd(t *testing.T) {
	re := add(1, 5)
	if re != 3 {
		t.Errorf("expect %d, actual %d", 3, re)
	}
}
```

### 跳过耗时的单元测试

```go
if testing.Short() {
		// 如果时间长，就跳过这个测试
		t.Skip("")
	}
```

### 基于表格驱动测试

快速的写一堆数据进行测试

```go
var dataset = []struct {
a   int
b   int
out int
}{
{1, 1, 2}, {1, 2, 4}, {2, 0, 4},
}

for _, value := range dataset {
re := add(value.a, value.b)
if re != value.out {
t.Errorf("expect: %d, actual: %d", value.out, re)
}
}
```

### 性能测试

要测试核心的函数

```go
func BenchmarkAdd(bb *testing.B) {
	a := 123
	b := 456
	c := 579
	for i := 0; i < bb.N; i++ {
		if actual := add(a, b); actual != c {
			fmt.Printf("expect %d, actual %d", c, actual)
		}
	}
}
```

## 并发编程

其他语言并发的原理是多线程，多进程编程，会消耗内存

现在大多使用用户级线程，也叫绿程、协程

go 语言使用的是协程

```go
func add() {
  // do something
}
func main() {
  // 在调用函数前加go关键字，表示接下来要执行的函数将会启动一个协程去运行它，此时，该过程会变成异步，不可控，不知道什么时候执行和返回；如果此时mian函数的主协程结束了，里面的所有协程都会结束
  go add()

  for i:=0;i<100;i++ {
    // 这里这样做的目的是，里面的函数调用了外面作用域的变量，形成了闭包，再加上函数现在是异步执行，无法确定里面函数的时机，会造成i值的不确定，此时将i传入可避免不必要的问题
    go func(i int) {
      fmt.Println(i)
    }(i)
  }
}
```

### go 调度的原理

个人理解:

在 java，python 等其他语言中，为了高并发，需要多开线程去执行函数，这个时候，系统对于能执行的线程是有一个最大值的，所以当线程过多时，后面来的线程要等待，等旧的线程执行完，新的线程才能进入执行，而新线程进入时，需要做一些准备工作，此时也会耗费不少时间

go 的并发是依赖 GMP 调度

- G-是 goroutine，go 启动的协程，可以是一个函数
- M-是线程
- P 是处理器

通过处理器去安排 goroutine 的执行，使用合适的算法去分配到现有的线程上，这样就可以避免线程的切换，也不会创建过多的线程耗费内存；当某一个 goroutine 有 http 请求、循环等耗时长的过程时，会被挂起，把下一个 goroutine 通过处理器分发到线程去执行

### waitgroup

子的 goroutine 如何通知主的 goroutine 自己结束了，主的 goroutine 如果知道子的 goroutine 已经结束

```go
	var wg sync.WaitGroup
// 要监听多少个goroutine
wg.Add(100)
for i := 0; i < 100; i++ {
go func(i int) {
	// 每次一个goroutine执行完，都要执行一下done
	defer wg.Done()
	fmt.Println(i)
}(i)
}

// 等待goroutine执行完，才执行下面的代码，将异步变为同步
wg.Wait()

fmt.Println("all goroutine done")
```

1. waitgroup 主要用于等待异步 goroutine 执行完
2. 每 Add 一次，都要执行一次 Done

### mutex atomic 全局变量的原子操作

锁：goroutine 对共享资源的竞争，也就是使用了公用的变量

理解资源冲突：

比如一个简单的操作：`a+=1`，要执行该代码实际上需要三步，1.取出 a 的值，2.计算 a+1，3.重新写入 a 的值；因为用了多协程，所以执行`a+=1`的过程实际上不是最小的原子操作（还是可以拆开的，就是可以拆开成三步），这个时候比如有两个协程，一个 A 刚执行到取出 a 的值，另外一个协程 B 也执行取出 a 的值，此时 B 取出 a 的值并不是 A 执行后 a 的值，并且也无法确定哪个协程先结束，无法确定最后 a 的值是谁写入的

```go
var a int = 0
var wg sync.WaitGroup
var lock sync.Mutex

func add() {
	defer wg.Done()
	for i := 0; i < 100000; i++ {
    // 将资源锁住，此时只能我访问
		lock.Lock()
		a += 1
    // 释放资源的锁
		lock.Unlock()
	}
}

func sub() {
	defer wg.Done()
	for i := 0; i < 100000; i++ {
		lock.Lock()
		a -= 1
		lock.Unlock()
	}
}

func main() {
	wg.Add(2)
	go add()
	go sub()
	wg.Wait()
	fmt.Println(a)
}

```

注意点：

1. 必须使用同一个锁，所以不能赋值使用

如果资源冲突是简单的 int32 类型，还可以使用 atomic，性能会更高

```go
atomic.AddInt32(&a, 1)
//lock.Lock()
//a += 1
//lock.Unlock()
```

### RWMutex 读写锁

锁本质上是将并行的代码串行化了，使用 lock 肯定会影响性能，所以尽量避免使用 lock
即使设置锁，也要尽量保证并行
如何保证？

1. 读数据协程之间应该并发
2. 读和写之间应该串行

```go
var rwlock sync.RWMutex

rwlock.Lock() // 加写锁，此时阻止了读和写操作
// do something
rwlock.UnLock()

rwlock.RLock() // 加读锁，读锁不会阻止别人读
rwlock.UnLock()

```

### goroutine 之间的通信 channnel

> 不要通过共享内存来通信，而是通过通信来实现内存共享

```go
// 创建channel
var msg chan string
msg = make(chan string, 1) // channel的初始化值如果为0，放值就会阻塞
// 往channel放值
msg <- "huang" // 放值到channel
data := <-msg  // 从channel取值
fmt.Println(data)
```

### 有缓冲和无缓冲 channel

适用场景：

- 无缓冲适用于 通知， B 要第一时间知道 A 是否已经完成
- 有缓冲适用于消费者和生产者之间的通信

```go
// n = 0就是无缓冲，大于零就是有缓冲
msg := make(chan string, n)
```

### 使用 for range 对 channel 进行遍历

```go
msg := make(chan int, 2)

	go func() {
		for data := range msg {
			fmt.Println(data)
		}
		fmt.Println("all done")
	}()

	msg <- 1
	msg <- 2
	// 关闭channel
	close(msg)
	time.Sleep(1000)
```

注意：

1. 对 channel 进行取值，当没有值时会阻塞，所以需要使用 close 关闭 channel
2. 关闭后的 channel 不能再放值，当还能取值（虽然不知道有什么用）

### 单项 channel

一般 channel 是双向的，但是 channel 作为参数使用时，希望是单向使用

```go
	//var ch chan<- int // 单向channel，只能写入int的数据
	//var ch2 <-chan int // 只能读取int的数据的channel
	c := make(chan int, 3)
	var write chan<- int = c // 只能写
	var read <-chan int = c  // 只能读
	write <- 1               // 没问题
	<-read                   // 没问题
```

简单应用

```go
func producer(out chan<- int) {
	for i := 0; i < 100; i++ {
		out <- i
	}
	wg.Done()
	close(out)
}

func consumer(in <-chan int) {
	for data := range in {
		fmt.Println(data)
	}
	wg.Done()
}

func main() {
	c := make(chan int)
	wg.Add(2)
	go producer(c) // 自动转换
	go consumer(c)
	wg.Wait()

}
```

### 使用 channel 交替打印

一个 goroutine 打印数字，一个 goroutine 打印字母

```go
// 定义两个无缓存channel
var ch1, ch2 = make(chan bool), make(chan bool)

func printNum() {
	i := 1
	for {
		<-ch1
		fmt.Printf("%d%d", i, i+1)
		i += 2
		ch2 <- true
	}

}

func printLetter() {
	str := "abcdefghijklmnopqrstuvwxyz"
	i := 0
	for {
		<-ch2
		if i >= len(str) {
			return
		}
		fmt.Printf("%s%s", strings.ToUpper(string(str[i])), strings.ToUpper(string(str[i+1])))
		i += 2
		ch1 <- true
	}
}

func main() {
	go printNum()
	go printLetter()
	// 打印数字的先执行
	ch1 <- true

	time.Sleep(time.Second * 20)
}

```

### select 监控 goroutine 执行

select 类似于 switch case，select 功能和 linux 里面提供的 io 的 select，poll，epoll 差不多，主要作用于多个 channel

```go
func g1(ch chan struct{}) {
	time.Sleep(time.Second * 3)
	ch <- struct{}{}
}
func g2(ch chan struct{}) {
	time.Sleep(time.Second * 4)
	ch <- struct{}{}
}

func main() {
	ch1 := make(chan struct{})
	ch2 := make(chan struct{})
	go g1(ch1)
	go g2(ch2)

	// 定一个时间器，当达到设置的时间时，里面的channel会返回，可以用于防止函数被阻塞
	timer := time.NewTimer(time.Second * 2)

	// 1. 某一个分支就绪了就执行该分支
	// 2. 如果两个都就绪了，随机执行，防止两个分支都一值就绪，只执行第一个的情况
	for {
		select {
		case <-ch1:
			fmt.Println("g1 done")
		case <-ch2:
			fmt.Println("g2 done")
		// 防止阻塞，当定义的时间到了，该channel就会被写入值，此时拿到值就执行自己的逻辑，不等了
		case <-timer.C:
			fmt.Println("default")
			return
		}
	}

}
```

### context

使用 context 解决 goroutine 的信息传递

#### 主函数取消

```go
var wg sync.WaitGroup

func cupInfo(ctx context.Context) {
	defer wg.Done()
	for {
		select {
		case <-ctx.Done():
			fmt.Println("over")
			return
		default:
			time.Sleep(time.Second * 2)
			fmt.Println("cpu info")
		}

	}
}

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	wg.Add(1)
	go cupInfo(ctx)
	time.Sleep(time.Second * 6)
	// 由父方法取消监听
	cancel()
	wg.Wait()
	fmt.Println("success")

}

```

#### 主动超时取消

```go
ctx, _ := context.WithTimeout(context.Background(), 6*time.Second)

go func(ctx)
```

#### 按时取消

```go
WithDeadline()
```

#### WithValue

通过 ctx 传值进去

```go
// 父进程
	fmt.Println("traceid: %s\r\n", ctx.Value("traceid"))
// 子进程
	fmt.Println("traceid: %s\r\n", ctx.Value("traceid"))
```