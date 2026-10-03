function getSwingRange(num: string): { sum: number, q: number } {
  let sum = 0
  let q = 0
  for (const c of num) {
    if (c === '?') {
      q++
    } else {
      sum += +c
    }
  }
  return {
    sum,
    q
  }
}

export function sumGame(num: string): boolean {
  const left = getSwingRange(num.substring(0, num.length / 2))
  const right = getSwingRange(num.substring(num.length / 2))
  if ((left.q + right.q) % 2 == 1) {
    return true
  }
  const diff = left.sum - right.sum
  const target = (right.q - left.q) / 2 * 9
  return diff != target
};