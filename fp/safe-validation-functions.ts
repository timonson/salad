import { None, Option, some } from "./option.ts";

// import { isPresent } from "./boolean-functions.ts";
// import { isNumber } from "./number-functions.ts";
// import { isString } from "./string-functions.ts";
// isSafe<string>(isString)("abc");
// isSafe<string>(isString, isPresent)("abc");
// isSafe<never>(isString, isPresent, isNumber)("abc");
export function isSafe<T>(
  ...predicates: ((x: any) => boolean)[]
): (x: unknown) => Option<T> {
  return (x) =>
    predicates.every((predicate) => predicate(x)) ? some(x as T) : None;
}
