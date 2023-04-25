# GO 入门

## GO基本语法和Web框架起步

### main函数

- 无参数、无返回值
- main方法必须要在main包
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

```go
package main
```