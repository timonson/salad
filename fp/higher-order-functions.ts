export function isFunction<T, U>(input: unknown): input is (x: T) => U {
  return typeof input === "function";
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

export function compose<S>(...fns: any[]): S {
  return fns.reduceRight(
    (prevFn, nextFn) => (...args: any[]) => nextFn(prevFn(...args)),
    (value: any) => value,
  );
}

export function perform<S>(f: (x: S) => void): (x: S) => S {
  return (x: S) => {
    f(x);
    return x;
  };
}

export function identity<X>(x: X) {
  return x;
}

export function constant<X>(x: X): () => X {
  return () => x;
}
