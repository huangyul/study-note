function ListNode(val, next) {
  this.val = val ? val : 0
  this.next = next ? next : null
}
function generatorList(arr) {
  let list = new ListNode()
  let head = list
  for (let i = 0; i < arr.length; i++) {
    head.val = arr[i]
    if (i === arr.length - 1) {
      break
    }
    head.next = new ListNode()
    head = head.next
  }
  return list
}
var func = function (list1, list2) {
  if (!list1) return list2
  if (!list2) return list1
  if (list1.val < list2.val) {
    list1.next = func(list1.next, list2)
    return list1
  } else {
    list2.next = func(list1, list2.next)
    return list2
  }
}

console.log(func(generatorList([1]), generatorList([2])))
