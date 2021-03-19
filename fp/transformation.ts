import { isFunction } from "./boolean-functions.ts";
import { failure, foldResult, Result, success } from "./result.ts";
import { foldOption, Option } from "./option.ts";

/**
  * async function add(x: number) {
  *   return x + 10
  * }
  * await transformResultToPromise(add)(success(20));
  * NOTE: The Promise rejections can't be typed.
  */
export function transformResultToPromise<T, U>(
  mapOrResult: ((x: T) => Promise<U>),
): <F>(p: Result<T, F>) => Promise<U>;
export function transformResultToPromise<U, F>(
  mapOrResult: Result<U, F>,
): Promise<U>;
export function transformResultToPromise<T, U, F>(
  mapOrResult: any,
): any {
  return isFunction(mapOrResult)
    ? foldResult(mapOrResult)((error) => Promise.reject(error))
    : foldResult((value: U) => Promise.resolve(value))((error) =>
      Promise.reject(error)
    )(mapOrResult);
}

export function transformOptionToResult<T, U>(
  mapOrErrorMessage: ((x: T) => U),
): <V>(e: V) => (o: Option<T>) => Result<U, V>;
export function transformOptionToResult<V>(
  mapOrErrorMessage: V,
): <T>(o: Option<T>) => Result<T, V>;
export function transformOptionToResult<T, U, V>(
  mapOrErrorMessage: any,
): any {
  return isFunction(mapOrErrorMessage)
    ? (errorMessage: V): (o: Option<T>) => Result<U, V> =>
      foldOption(mapOrErrorMessage)(() => failure(errorMessage))
    : foldOption(success)(() => failure(mapOrErrorMessage));
}
