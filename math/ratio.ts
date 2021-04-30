/**
  * calculate the proportional share of the 40/300 ratio from 100:
  * carryRatio(40, 300, 100) // 13.333333333333332
  */
export function carryRatio(
  value: number,
  biggestValue: number,
  actualLength: number,
) {
  return (value / biggestValue) * actualLength;
}
