import { isFunction } from "./higher-order-functions.ts";

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

const ifFulfilled = (p: string) => {
  console.log("fullfilled");
  return "full promise";
};
const ifRejected = (p: string) => {
  console.log("rejected");
  return 100;
};
let r1 = mapFulfilled(ifFulfilled)(Promise.resolve("promise"));
let r2 = mapPromise(ifFulfilled)(ifRejected)(Promise.resolve("promise"));
let r3 = mapPromise(ifFulfilled)(ifRejected)(Promise.reject("promise"));
console.log(r1, r2, r3);
// r1 = 3;
let r4 = mapFulfilled(ifFulfilled);
// r4 = 3;
let r5 = mapPromise(ifFulfilled)(ifRejected);
// r5 = 4;
let r6 = mapPromise(ifFulfilled)(ifRejected);
// r6 = 5;
