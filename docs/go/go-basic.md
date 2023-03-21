# Go基础笔记

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
1. 第一种是使用ide的运行
2. 生成可执行文件
   1. `go build ./xxx.go`生成可执行文件xxx.exe后，需要手动运行
   2. `go run ./xxx.go`直接生成可执行文件并运行
  
注意点：
- 同一个目录下只能有一个`main`函数
- 