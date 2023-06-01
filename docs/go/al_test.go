package go_test

import (
	"fmt"
	"testing"
)

/* 6.1 */

// No.27
func TestRemoveElement(t *testing.T) {
	nums := []int{3, 2, 2, 3}
	val := 3

	j := 0

	for i := 0; i < len(nums); i++ {
		if nums[i] != val {
			nums[j] = nums[i]
			j++
		}
	}

	fmt.Println(nums, j)
}

// No.344
func TestReverseString(t *testing.T) {
	s := []string{"h", "e", "l", "l", "o"}
	left := 0
	right := len(s) - 1
	for left < right {
		temp := s[left]
		s[left] = s[right]
		s[right] = temp
		left++
		right--
	}
	fmt.Println(s)
}
