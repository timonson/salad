import { None, Option, some } from "./option.ts";

// import { isNumber, isPresent, isString } from "./boolean-functions.ts";
// console.log(isSafe<string>(isString)("abc"));
// console.log(isSafe<string>(isString, isPresent)("abc"));
// console.log(isSafe<never>(isString, isPresent, isNumber)("abc"));
export function isSafe<T>(
  ...predicates: ((x: any) => boolean)[]
): (x: unknown) => Option<T> {
  return (x) =>
    predicates.every((predicate) => predicate(x)) ? some(x as T) : None;
}
