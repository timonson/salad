import { isFunction } from "./higher-order-functions.ts";
import { failure, foldResult, Result, success } from "./result.ts";
import { foldOption, Option } from "./option.ts";

export function transformOptionToResult<T, U, V>(
  mapOrErrorMessage: (x: T) => Result<U, V>,
): <V>(e: V) => (o: Option<T>) => Result<U, V>;
export function transformOptionToResult<V>(
  mapOrErrorMessage: V,
): <T>(o: Option<T>) => Result<T, V>;
export function transformOptionToResult<T, U, V>(
  mapOrErrorMessage: ((x: T) => Result<U, V>) | V,
) {
  return isFunction(mapOrErrorMessage)
    ? (errorMessage: V): (o: Option<T>) => Result<U, V> =>
      foldOption(mapOrErrorMessage)(() => failure(errorMessage))
    : foldOption(success)(() => failure(mapOrErrorMessage));
}

export function transformOptionToResultWithAnyMap<T, U>(
  mapOrErrorMessage: (x: T) => U,
): <V>(e: V) => (o: Option<T>) => Result<U, V>;
export function transformOptionToResultWithAnyMap<V>(
  mapOrErrorMessage: V,
): <T>(o: Option<T>) => Result<T, V>;
export function transformOptionToResultWithAnyMap<T, U, V>(
  mapOrErrorMessage: ((x: T) => U) | V,
) {
  return isFunction(mapOrErrorMessage)
    ? (errorMessage: V): (o: Option<T>) => Result<U, V> =>
      foldOption((x: T) => success(mapOrErrorMessage(x)))(() =>
        failure(errorMessage)
      )
    : foldOption(success)(() => failure(mapOrErrorMessage));
}

/**
  * NOTE: The promise-rejections can't be typed.
  * @example
  * async function add(x: number) {
  *   return x + 10
  * }
  * await transformResultToPromise(add)(success(20));
  */
export function transformResultToPromise<T, U>(
  mapOrResult: (x: T) => Promise<U>,
): <F>(p: Result<T, F>) => Promise<U>;
export function transformResultToPromise<U, F>(
  mapOrResult: Result<U, F>,
): Promise<U>;
export function transformResultToPromise<T, U, F>(
  mapOrResult: ((x: T) => Promise<U>) | Result<U, F>,
) {
  return isFunction(mapOrResult)
    ? foldResult(mapOrResult)((error) => Promise.reject(error))
    : foldResult((value: U) => Promise.resolve(value))((error) =>
      Promise.reject(error)
    )(mapOrResult);
}

export function transformPromiseToResult<U, T>(
  mapOrPromise: ((x: T) => U),
): <U, F = Error>(promise: Promise<T>) => Promise<Result<U, F>>;
export function transformPromiseToResult<T, F = Error>(
  mapOrPromise: Promise<T>,
): Promise<Result<T, F>>;
export function transformPromiseToResult<T, U, F>(
  mapOrPromise: ((x: T) => U) | Promise<T>,
) {
  return isFunction(mapOrPromise)
    ? (promise: Promise<T>) =>
      promise.then((x) => success(mapOrPromise(x))).catch(failure)
    : mapOrPromise.then(success).catch(failure);
}
