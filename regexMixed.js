export { seperateIncludingNestedDelims }
// const strings = `h1 { background-color:blue; } aaaaaaaaaaaaaaaaaaaaaa
// h1 { background-co{lor:blue; } }`
// const results = seperateIncludingNestedDelims(strings, "{", "}", false)
// console.log(results)
function seperateIncludingNestedDelims(
  input,
  start,
  end,
  hasSinglelineFlag = false
) {
  const includingNestedDelims = new RegExp(
    `.+?${start}([^${start + end}]*|${start}[^${start + end}]*${end})*${end}`,
    `g${hasSinglelineFlag ? "s" : ""}`
  )
  return [...input.matchAll(includingNestedDelims)]
}
