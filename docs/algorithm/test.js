function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}

// function func() {
//   let list = new ListNode()
//   list.val = 1
//   let head = list
//   list.next = new ListNode(2)
//   list = list.next
//   console.log(list)
//   console.log(head)
// }

function generateList(arr) {
  let list = new ListNode(0)
  let head = list
  for (let i = 0; i < arr.length; i++) {
    list.next = new ListNode(arr[i])
    list = list.next
  }
  return head.next
}

function func(head, n) {
  head = generateList(head)
  let ret = new ListNode(0, head)
  let slow = ret
  let fast = ret

  while (n--) {
    fast = fast.next
  }
  if (!fast) return ret.next

  while (fast.next) {
    fast = fast.next
    slow = slow.next
  }
  slow.next = slow.next.next
  return ret.next
}

console.log(func([1, 2, 3, 4, 5], 4))
