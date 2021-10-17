export {
  assertEquals,
  assertThrows,
  assertThrowsAsync,
} from "https://deno.land/std@0.111.0/testing/asserts.ts";

export const val1 = 10;
export const val2 = 20;
export const err1 = "outch";
export const err2 = "ups";
export const str1 = "abc";
export const str2 = "xyz";

export function add(a: number): (b: number) => number {
  return (b) => a + b;
}
export const add10 = add(val1);
export const add20 = add(val2);

export function append(a: string): (b?: string) => string {
  return (b) => b ? b + a : a;
}
export const appendUps = append(err2);

export function isLetterC(x: unknown) {
  return x === "c";
}
