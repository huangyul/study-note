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