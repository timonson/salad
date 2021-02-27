import { None, Option, some } from "./option.ts";

// isSafe<string>(isString)("abc");
export function isSafe<T>(
  ...predicates: ((x: unknown) => boolean)[]
): (x: unknown) => Option<T> {
  return (x) => {
    return predicates.some((predicate) => !predicate(x)) ? None : some(x as T);
  };
}
