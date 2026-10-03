import test from 'node:test'
import assert from 'node:assert/strict'
import { addTwoNumbers, ListNode } from './main.ts'

function list(...digits: number[]): ListNode | null {
  return digits.reduceRight<ListNode | null>((next, digit) => new ListNode(digit, next), null)
}

test('adds two numbers stored in reverse order', () => {
  const first = new ListNode(2, new ListNode(4, new ListNode(3)))
  const second = new ListNode(5, new ListNode(6, new ListNode(4)))
  const expected = new ListNode(7, new ListNode(0, new ListNode(8)))

  assert.deepStrictEqual(addTwoNumbers(first, second), expected)
})

test('adds two zeroes', () => {
  assert.deepStrictEqual(addTwoNumbers(list(0), list(0)), list(0))
})

test('adds different-length lists with a final carry', () => {
  assert.deepStrictEqual(
    addTwoNumbers(list(9, 9, 9, 9, 9, 9, 9), list(9, 9, 9, 9)),
    list(8, 9, 9, 9, 0, 0, 0, 1),
  )
})
