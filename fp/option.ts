import { isFunction } from "./higher-order-functions.ts";

export type Some<T> = { value: T; kind: "Some" };

export type None = { kind: "None" };

export type Option<T> = Some<T> | None;

export function some<T>(value: T): Some<T> {
  return {
    value,
    kind: "Some",
  };
}

export const None: None = {
  kind: "None",
};

export function isSome<T>(input: Option<T>): input is Some<T> {
  return input.kind === "Some";
}

export function isNone<T>(input: Option<T>): input is None {
  return input.kind === "None";
}

export function mapOption<T, U>(f: (x: T) => U) {
  return (opt: Option<T>) => isSome<T>(opt) ? some<U>(f(opt.value)) : None;
}

export function chainOption<T, U>(f: (x: T) => Option<U>) {
  return (opt: Option<T>) => isSome(opt) ? f(opt.value) : None;
}

export function foldOption<T, U>(ifSome: ((x: T) => U) | U) {
  return <V>(ifNone: (() => V) | V): (x: Option<T>) => (U | V) =>
    (opt: Option<T>) =>
      isSome(opt)
        ? (isFunction(ifSome) ? ifSome(opt.value) : ifSome)
        : (isFunction(ifNone) ? ifNone() : ifNone);
}

/**
 * [ some(x), some(y) ] = some([x, y])
 * [ None, None ] = None
 * [ None, some(x) ] = None
 * [ some(x), None ] = None
 */
export function invertOptions<S extends Some<unknown>>(
  options: (S | None)[],
): Some<Array<S["value"]>> | None {
  return options.reduce<any>(
    (acc: any, opt: any) =>
      chainOption((arr: any[]) => mapOption((value) => [...arr, value])(opt))(
        acc,
      ),
    some([]),
  );
}

/**
 * [ some(x), some(y) ] = [x, y]
 * [ None, None ] = []
 * [ None, some(x) ] = [x]
 * [ some(x), None ] = [x]
 */
export function concatOptions<T>(options: Option<T>[]): T[] {
  return options.reduce<any>(
    (arr, opt) => foldOption((value) => arr.concat([value]))(arr)(opt),
    [],
  );
}

export function alternativeOption<T>(
  functionOrOption: (() => Option<T>) | Option<T>,
) {
  return <U>(opt: Option<U>) =>
    isSome(opt)
      ? opt
      : (isFunction(functionOrOption) ? functionOrOption() : functionOrOption);
}

export function alternativeValue<T, U>(
  functionOrValue: (() => T) | T,
): (opt: Option<U>) => (T | U) {
  return (opt: Option<U>) =>
    foldOption((x: U): U => x)(
      isFunction(functionOrValue) ? functionOrValue() : functionOrValue,
    )(opt);
}

export function maybeNull<T>(nullable: T): None | Some<Exclude<T, null>> {
  return nullable === null ? None : some<Exclude<T, null>>(nullable as any);
}

export function maybeUndefined<T>(
  undefinable: T,
): None | Some<Exclude<T, undefined>> {
  return undefinable === undefined
    ? None
    : some<Exclude<T, undefined>>(undefinable as any);
}

export function ifPresent<T>(sideEffect: (x: T) => void) {
  return (opt: Option<T>) => {
    if (isSome(opt)) {
      sideEffect(opt.value);
    }
  };
}

export function ifAbsent<T>(sideEffect: () => void) {
  return (opt: Option<T>) => {
    if (isNone(opt)) {
      sideEffect();
    }
  };
}
