// https://github.com/microsoft/TypeScript/pull/23039
export function isFunction<T>(value: T): value is Extract<T, Function> {
  return typeof value === "function";
}

export function apply<X>(x: X) {
  return <R>(f: (arg: X) => R) => f(x);
}

export function applyTo<X, R>(f: (x: X) => R) {
  return (x: X) => f(x);
}

export function applyPair<A, B, R>([a, b]: [A, B]) {
  return (f: (a: A) => (b: B) => R) => f(a)(b);
}

export function applyPairTo<A, B, R>(f: (a: A) => (b: B) => R) {
  return ([a, b]: [A, B]): R => f(a)(b);
}

export function perform<S>(f: (x: S) => void): (x: S) => S {
  return (x: S) => {
    f(x);
    return x;
  };
}

/**
  * The generic type of the identity function does not work with 'foldOption'
  * and 'foldResult'.
  * add10(foldOption(identity)(identity)(some(5)))
  * // TS Error
  */
export function identity<X>(x: X) {
  return x;
}

export function constant<X>(x: X): () => X {
  return () => x;
}

export function curry<F>(fn: any): F {
  const arity = fn.length;

  // @ts-ignore
  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args);
  };
}

/**
  * https://gist.github.com/JamieMason/172460a36a0eaef24233e6edb2706f83
  */
export function composeMultivariate<R>(
  ...fns: Function[]
): (...args: any[]) => R {
  return (fns as any).reduce((f: any, g: any) =>
    (...xs: any) => f(...g(...xs))
  );
}

/**
  * https://github.com/reduxjs/redux/blob/master/src/compose.ts
  */

type Func<T extends any[], R> = (...a: T) => R;

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for the
 * resulting composite function.
 *
 * @param funcs The functions to compose.
 * @returns A function obtained by composing the argument functions from right
 *   to left. For example, `compose(f, g, h)` is identical to doing
 *   `(...args) => f(g(h(...args)))`.
 */
export function compose(): <R>(a: R) => R;

export function compose<F extends Function>(f: F): F;

/* two functions */
export function compose<A, T extends any[], R>(
  f1: (a: A) => R,
  f2: Func<T, A>,
): Func<T, R>;

/* three functions */
export function compose<A, B, T extends any[], R>(
  f1: (b: B) => R,
  f2: (a: A) => B,
  f3: Func<T, A>,
): Func<T, R>;

/* four functions */
export function compose<A, B, C, T extends any[], R>(
  f1: (c: C) => R,
  f2: (b: B) => C,
  f3: (a: A) => B,
  f4: Func<T, A>,
): Func<T, R>;

/* rest */
export function compose<R>(
  f1: (a: any) => R,
  ...funcs: Function[]
): (...args: any[]) => R;

export function compose<R>(...funcs: Function[]): (...args: any[]) => R;

export function compose(...funcs: Function[]) {
  if (funcs.length === 0) {
    // infer the argument type so it is usable in inference down the line
    return <T>(arg: T) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args: any) => a(b(...args)));
}
