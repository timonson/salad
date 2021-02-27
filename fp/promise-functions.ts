import { isFunction } from "./higher-order-functions.ts";

interface NestedArray extends Array<NestedArray | Promise<unknown>> {}
export function parallel<T = unknown>(
  ...promises: NestedArray
): Promise<T[]> {
  if (promises.length === 1) {
    const firstItem = promises[0];

    if (Array.isArray(firstItem)) {
      return parallel(...firstItem) as Promise<T[]>;
    }
  }

  return Promise.all(promises) as Promise<T[]>;
}

export function parallelMap<T>(f: (x: unknown) => Promise<unknown>) {
  return (arr: any[]) => parallel<T>(arr.map(f));
}

export function mapFulfilled<T, U>(
  functionOrValue: ((x: T) => U) | U,
): (p: Promise<T>) => Promise<U> {
  return (promise: Promise<T>) =>
    promise.then(
      isFunction<T, U>(functionOrValue)
        ? functionOrValue
        : () => functionOrValue,
    );
}

// export function mapPromise<T, U>(ifFulfilled: ((x: T) => U) | U) {
// return (ifRejected: ((x: T) => U) | U) => {
// return (promise: Promise<T>) =>
// promise.then(
// isFunction<T, U>(ifFulfilled) ? ifFulfilled : () => ifFulfilled,
// isFunction<T, U>(ifRejected) ? ifRejected : () => ifRejected,
// );
// };
// }
export function mapPromise<T, U>(ifFulfilled: ((x: T) => U) | U) {
  return <V>(ifRejected: ((x: T) => V) | V) => {
    return (promise: Promise<T>) =>
      promise.then(
        isFunction<T, U>(ifFulfilled) ? ifFulfilled : () => ifFulfilled,
        isFunction<T, V>(ifRejected) ? ifRejected : () => ifRejected,
      );
  };
}
