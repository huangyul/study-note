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

// Offer05
func TestReplaceSpace(t *testing.T) {
	s := []byte("we are family.")
	count := 0
	for _, c := range s {
		if c == ' ' {
			count++
		}
	}

	newLen := len(s) + count*2
	newS := make([]byte, newLen)

	i := len(s) - 1
	j := newLen - 1

	for i >= 0 {
		if s[i] == ' ' {
			newS[j] = '0'
			newS[j-1] = '2'
			newS[j-2] = '%'
			j -= 3
		} else {
			newS[j] = s[i]
			j--
		}
		i--
	}
	fmt.Println(string(newS))
}
