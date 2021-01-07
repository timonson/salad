import { isFunction } from "./higher-order-functions.ts";
import { failure, foldResult, success } from "./result.ts";
import { foldOption } from "./option.ts";

import type { Result, Success } from "./result.ts";
import type { Option } from "./option.ts";

export function transformResultToPromise<T, U>(
  mapOrResult: ((x: T) => Promise<U>),
): <F>(p: Result<T, F>) => Promise<U>;
export function transformResultToPromise<U, F>(
  mapOrResult: Result<U, F>,
): Promise<U>;
export function transformResultToPromise<T, U, F>(
  mapOrResult: any,
): any {
  return isFunction<T, Promise<U>>(mapOrResult)
    ? (result: Result<T, F>) =>
      foldResult(mapOrResult)((error) => Promise.reject(error))(
        result,
      )
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
  return isFunction<T, Success<U>>(mapOrErrorMessage)
    ? (errorMessage: V): (o: Option<T>) => Result<U, V> =>
      foldOption(mapOrErrorMessage)(() => failure(errorMessage))
    : foldOption(success)(() => failure(mapOrErrorMessage));
}
