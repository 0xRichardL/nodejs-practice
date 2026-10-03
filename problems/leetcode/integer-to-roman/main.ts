const syllabus: Array<[number, string]> = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"]
]

export function intToRoman(num: number): string {
  let result = ""
  for (const [value, char] of syllabus) {
    if (value > num) continue
    const rep = Math.trunc(num / value)
    num = num % value
    for (let i = 0; i < rep; i++) {
      result += char
    }
  }
  return result
};