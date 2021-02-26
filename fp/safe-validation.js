import { None, some } from "./option.js";

export function isSafe(predicates, x) {
  return Array.isArray(predicates)
    ? predicates.some((predicate) => !predicate(x)) ? None : some(x)
    : predicates(x)
    ? some(x)
    : None;
}
