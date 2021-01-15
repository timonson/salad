import { isFunction } from "./higher-order-functions.ts";
import { transformResultToPromise } from "./transformation.ts";

export type Success<S> = {
  value: S;
  kind: "Success";
};

export type Failure<F> = {
  error: F;
  kind: "Failure";
};

export type Result<S, F> = Success<S> | Failure<F>;

export function success<S>(value: S): Success<S> {
  return {
    value,
    kind: "Success",
  };
}

export function failure<F>(error: F): Failure<F> {
  return {
    error,
    kind: "Failure",
  };
}

export function isSuccess<S, F>(result: Result<S, F>): result is Success<S> {
  return result.kind === "Success";
}

export function isFailure<S, F>(result: Result<S, F>): result is Failure<F> {
  return result.kind === "Failure";
}

export function mapResult<S, T>(
  f: (x: S) => T,
): <F>(result: Result<S, F>) => Result<T, F> {
  return (result) => isSuccess(result) ? success<T>(f(result.value)) : result;
}

export function chainResult<S, T, F>(
  f: ((x: S) => Result<T, F>),
): (result: Result<S, F>) => Result<T, F>;
export function chainResult<S, T, F>(
  f: ((x: S) => Promise<Result<T, F>>),
): (result: Result<S, F>) => Promise<Result<T, F>>;
export function chainResult<S, T, F>(
  f: any,
): any {
  return (result: Result<S, F>) =>
    isSuccess(result) ? f(result.value) : failure(result.error);
}

export function foldResult<S, T>(
  ifSuccess: ((x: S) => T) | T,
) {
  return <F, G>(ifFailure: ((e: F) => G) | G): (x: Result<S, F>) => (T | G) =>
    (res: Result<S, F>): (T | G) =>
      isSuccess(res)
        ? (isFunction<S, T>(ifSuccess) ? ifSuccess(res.value) : ifSuccess)
        : (isFunction<F, G>(ifFailure) ? ifFailure(res.error) : ifFailure);
}

/*
    [ success(val1), success(val2) ] = success([x, y])
    [ failure(err1), failure(err2) ] = failure(err)
    [ failure(err), success(val) ] = failure(err)
    [ success(val), failure(err) ] = failure(err)
 */
export function invertResults<
  R extends Result<unknown, unknown>,
>(
  results: R[],
):
  | Success<Exclude<R, Failure<any>>["value"][]>
  | Failure<Exclude<R, Success<any>>["error"]> {
  return results.reduce<any>(
    (acc: any, result: any) =>
      chainResult((arr: any) =>
        mapResult((value: any) => arr.concat(value))(result)
      )(
        acc,
      ),
    success([]),
  );
}

export function ifSucceeded<S>(sideEffect: (x: S) => void) {
  return <F>(result: Result<S, F>) => {
    if (isSuccess(result)) {
      sideEffect(result.value);
    }
  };
}

export function ifFailed<F>(sideEffect: (e: F) => void) {
  return <S>(result: Result<S, F>) => {
    if (isFailure(result)) {
      sideEffect(result.error);
    }
  };
}
