import { test } from "node:test"
import assert from "node:assert/strict"
import { sumGame } from './main.ts'

test("case 1", () => {
  assert.strictEqual(sumGame("5023"), false)
})

test("case 2", () => {
  assert.strictEqual(sumGame("25??"), true)
})

test("case 3", () => {
  assert.strictEqual(sumGame("?3295???"), false)
})

test("case 4", () => {
  assert.strictEqual(sumGame("9?"), true)
})

test("case 5", () => {
  assert.strictEqual(sumGame("?3?32?"), true)
})

test("case 6", () => {
  assert.strictEqual(sumGame("?3295???"), false)
})

test("case 93", () => {
  assert.strictEqual(sumGame("?6?6?000?3"), true)
})