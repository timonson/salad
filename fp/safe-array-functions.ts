import { maybeUndefined, None, Option, some } from "./option.ts";

export function safeFirst<T>(arr: T[]): Option<T> {
  return arr.length >= 1 ? some(arr[0]) : None;
}

export function safeSingle<T>(arr: [T]): Option<T> {
  return arr.length === 1 ? some(arr[0]) : None;
}

export function safeLast<T>(arr: T[]): Option<T> {
  return arr.length >= 1 ? some(arr[arr.length - 1]) : None;
}

export function safeTake<T>(n: number): (arr: T[]) => Option<T[]> {
  return (arr: T[]) => arr.length >= n ? some(arr.slice(0, n)) : None;
}

export function safeDrop<T>(n: number): (arr: T[]) => Option<T[]> {
  return (arr: T[]) => arr.length >= n ? some(arr.slice(n)) : None;
}

// safeFind((n: number) => n > 3)([1, 2, 3, 4, 5]);
export function safeFind<T>(
  predicate: (x: T) => boolean,
): (arr: T[]) => Option<T> {
  return (arr: T[]) => maybeUndefined(arr.find(predicate));
}

export function safeFindIndex<T>(
  predicate: (x: T) => boolean,
): (x: T[]) => Option<number> {
  return (arr: T[]) => {
    const result = arr.findIndex(predicate);
    return result !== -1 ? some(result) : None;
  };
}
