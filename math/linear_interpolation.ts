/*
 * Linear Interpolation (Lerp function):
 * This method is monotonic only when v0 * v1 < 0.
 * Lerping between same values might not produce the same value
 * console.log(mix(10, 20, 0.6)); // 16
 * console.log(mix(20, 10, 0.6)); // 14
 * console.log(mix(20, 10, -0.6)); // 26
 */
export function mix(v0: number, v1: number, t: number): number {
  return (1 - t) * v0 + t * v1;
}
