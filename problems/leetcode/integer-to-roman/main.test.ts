import assert from 'node:assert/strict';
import { test } from 'node:test';
import { intToRoman } from './main.ts'

test("case 1", () => {
  assert.strictEqual(intToRoman(3749), "MMMDCCXLIX")
})

test("case 2", () => {
  assert.strictEqual(intToRoman(58), "LVIII")
})