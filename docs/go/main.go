package main

import (
	"fmt"
	"sync"
	"time"
)

var wg sync.WaitGroup

func worker(id int) {
	defer wg.Done()
	fmt.Printf("start is %d \r\n", id)
	time.Sleep(time.Second)
	fmt.Printf("end is %d \r\n", id)
}

func main() {
	wg.Add(10)
	for i := 0; i < 10; i++ {
		go worker(i)
	}
	wg.Wait()
	fmt.Println("main")
}
