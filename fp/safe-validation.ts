import { None, Option, some } from "./option.ts";

export function isSafe<T>(
  predicates: ((x: unknown) => boolean) | ((x: unknown) => boolean)[],
  x: unknown,
): Option<T> {
  return Array.isArray(predicates)
    ? predicates.some((predicate) => !predicate(x)) ? None : some(x as T)
    : predicates(x)
    ? some(x as T)
    : None;
}
