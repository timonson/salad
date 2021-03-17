import { isFunction } from "./boolean-functions.ts";

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
      isFunction(functionOrValue) ? functionOrValue : () => functionOrValue,
    );
}

export function mapPromise<T, U>(ifFulfilled: ((x: T) => U) | U) {
  return <V>(ifRejected: ((x: T) => V) | V) => {
    return (promise: Promise<T>) =>
      promise.then(
        isFunction(ifFulfilled) ? ifFulfilled : () => ifFulfilled,
        isFunction(ifRejected) ? ifRejected : () => ifRejected,
      );
  };
}
