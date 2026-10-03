export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

export function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const root = new ListNode()
  let node = root
  let carrier: number = 0

  for (let node1 = l1, node2 = l2; node1 || node2; node1 = node1?.next ?? null, node2 = node2?.next ?? null) {
    let val = carrier + (node1?.val || 0) + (node2?.val || 0)
    carrier = 0
    if (val >= 10) {
      carrier = Math.trunc(val / 10)
      val = val % 10
    }
    const next = new ListNode(val)
    node.next = next
    node = next
  }
  if (carrier > 0) {
    const next = new ListNode(carrier)
    node.next = next
    node = next
  }
  return root.next
};
