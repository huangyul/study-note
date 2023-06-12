package go_test

import (
	"fmt"
	"sort"
	"strings"
	"testing"
)

type ListNode struct {
	Val  int
	Next *ListNode
}

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

// No.151
func TestReverseWord(t *testing.T) {
	s := "the sky is blue"
	words := strings.Fields(s)

	i := 0
	j := len(words) - 1
	for i < j {
		temp := words[i]
		words[i] = words[j]
		words[j] = temp

		i++
		j--
	}

	fmt.Println(strings.Join(words, " "))
}

// No.206
func TestReverseList(t *testing.T) {
	head := &ListNode{Val: 1}
	node2 := &ListNode{Val: 2}
	node3 := &ListNode{Val: 3}
	node4 := &ListNode{Val: 4}
	node5 := &ListNode{Val: 5}

	head.Next = node2
	node2.Next = node3
	node3.Next = node4
	node4.Next = node5

	var prev *ListNode
	curr := head

	for curr != nil {
		next := curr.Next
		curr.Next = prev
		prev = curr
		curr = next
	}

	fmt.Println(prev)
}

// No.19
func TestRemoveNthFromEnd(t *testing.T) {
	head := &ListNode{Val: 1}
	node2 := &ListNode{Val: 2}
	node3 := &ListNode{Val: 3}
	node4 := &ListNode{Val: 4}
	node5 := &ListNode{Val: 5}

	head.Next = node2
	node2.Next = node3
	node3.Next = node4
	node4.Next = node5

	dummy := &ListNode{Val: 0, Next: head}

	n := 2

	slow := dummy
	fast := dummy
	for i := 0; i < n+1; i++ {
		fast = fast.Next
	}

	for fast != nil {
		slow = slow.Next
		fast = fast.Next
	}
	slow.Next = slow.Next.Next

	fmt.Println(dummy.Next)

}

// No.160
// func TestGetIntersectionNode(t *testing.T) {
// 	var pA, pB = headA, headB
// 	for pA != pB {
// 		if pA != nil {
// 			pA = pA.Next
// 		} else {
// 			pA = headB
// 		}
// 		if pB != nil {
// 			pB = pB.Next
// 		} else {
// 			pB = headA
// 		}
// 	}
// 	return pA
// }

/* 6.5 */
// No.142
func TestDetectCycle(t *testing.T) {
	head := &ListNode{Val: 1}
	node2 := &ListNode{Val: 2}
	node3 := &ListNode{Val: 3}
	node4 := &ListNode{Val: 4}
	node5 := &ListNode{Val: 5}

	head.Next = node2
	node2.Next = node3
	node3.Next = node4
	node4.Next = node5

	slow, fast := head, head
	for fast != nil && fast.Next != nil {
		slow = slow.Next
		fast = fast.Next.Next
		if slow == fast {
			slow = head
			for slow != fast {
				slow = slow.Next
				fast = fast.Next
			}
			fmt.Println(slow)
		}
	}
	fmt.Println(nil)
}

// No.15
func TestThreeSum(t *testing.T) {
	nums := []int{-1, 0, 1, 2, -1, -4}

	sort.Ints(nums)

	res := [][]int{}
	for i := 0; i < len(nums)-2; i++ {
		if i > 0 && nums[i] == nums[i-1] {
			continue
		}
		left, right := i+1, len(nums)-1
		for left < right {
			sum := nums[left] + nums[right] + nums[i]
			if sum == 0 {
				res = append(res, []int{nums[i], nums[left], nums[right]})
				for left < right && nums[left] == nums[left+1] {
					left++
				}
				for left < right && nums[right] == nums[right-1] {
					right--
				}
				left++
				right--
			} else if sum < 0 {
				left++
			} else {
				right--
			}
		}
	}
	fmt.Println(res)
}

/* 6.7 */
// No.18
func TestFourSum(t *testing.T) {
	nums := []int{1, 0, -1, 0, -2, 2}
	target := 0

	sort.Ints(nums)
	res := [][]int{}
	n := len(nums)

	for i := 0; i < n-3; i++ {
		if i > 0 && nums[i] == nums[i-1] {
			continue
		}
		for j := i + 1; j < n-2; j++ {
			if j > 0 && nums[j] == nums[j-1] {
				continue
			}
			left, right := j+1, n-1
			for left < right {
				sum := nums[i] + nums[j] + nums[left] + nums[right]
				if sum == target {
					res = append(res, []int{nums[i], nums[j], nums[left], nums[right]})
					for left < right && nums[left] == nums[left+1] {
						left++
					}
					for left < right && nums[right] == nums[right-1] {
						right--
					}
					left++
					right--
				} else if sum < target {
					left++
				} else {
					right--
				}
			}
		}
	}
	fmt.Println(res)
}

/* 6.12 */
// No.20
func TestIsValue(t *testing.T) {
	s := "[[]}]"
	stack := make([]rune, 0)
	signMap := map[string]rune{
		"[": ']',
		"(": ')',
		"{": '}',
	}
	for _, char := range s {
		if char == '(' || char == '{' || char == '[' {
			stack = append(stack, char)
		} else {
			if len(stack) == 0 || char != signMap[string(stack[len(stack)-1])] {
				fmt.Println("false")
			} else {
				stack = stack[0 : len(stack)-1]
			}
		}
	}
	fmt.Println(true)
}
