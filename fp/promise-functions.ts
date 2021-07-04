import { isFunction } from "./higher-order-functions.ts";

export function parallel<T>(
  ...promises: Promise<T>[] | [Promise<T>[]]
): Promise<T[]> {
  if (promises.length === 1) {
    const firstItem = promises[0];

    if (Array.isArray(firstItem)) {
      return parallel(...firstItem);
    }
  }

  return Promise.all(promises as any) as Promise<T[]>;
}

export function parallelMap<T, U>(f: (x: Promise<T>) => Promise<U>) {
  return (arr: Promise<T>[]) => parallel(arr.map(f));
}

export function mapFulfilled<T, U>(
  functionOrValue: ((x: T) => U) | U,
): (p: Promise<T>) => Promise<U> {
  return (promise: Promise<T>) =>
    promise.then(
      isFunction(functionOrValue) ? functionOrValue : () => functionOrValue,
    );
}

export function mapPromise<T, U>(ifFulfilled: ((x: T) => U) | U) {
  return <V, W>(ifRejected: ((x: W) => V) | V) => {
    return (promise: Promise<T>) =>
      promise.then(
        isFunction(ifFulfilled) ? ifFulfilled : () => ifFulfilled,
        isFunction(ifRejected) ? ifRejected : () => ifRejected,
      );
  };
}
