// +build omit

package main

import "fmt"

func gen(nums ...int) <-chan int {
	out := make(chan int)
	go func() {
		for _, n := range nums {
			out <- n
		}
		close(out)
	}()
	return out
}

func square(in <-chan int) <-chan int {
	out := make(chan int)
	go func() {
		for n := range in {
			out <- n * n
		}
		close(out)
	}()
	return out
}

func main() {
	arr := []int{1, 2, 3, 4, 5}

	input := gen(arr...)

	c1 := square(input)

	for v := range c1 {
		fmt.Println(v)
	}
}
