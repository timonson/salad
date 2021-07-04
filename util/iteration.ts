/**
 * Return an array formed by repeated values of `iter`, up to `n`
 * times if possible, as well as number of actual successful yields.
 */
export function takeN<T>(iter: IterableIterator<T>, n: number): [number, T[]] {
  const res: T[] = [];
  let count = 0;
  for (count = 0; count < n; count++) {
    const ir = iter.next();
    if (ir.done) {
      break;
    }
    res.push(ir.value);
  }
  return [count, res];
}

/**
 * Iterate through applications of `f` to `x`, starting with `x`.
 *
 * If the third (optional) argument `n` is defined, then return the
 * first `n` iterations. If `n` is undefined, return an infinite
 * generator instead.
 */
export function iterate<T>(f: (x: T) => T, x: T, n: number): T[];
export function iterate<T>(f: (x: T) => T, x: T): Generator<T>;
export function iterate<T>(f: (x: T) => T, x: T, n?: number) {
  function* iterateGen(f: (x: T) => T, x: T): Generator<T> {
    while (true) {
      yield x;
      x = f(x);
    }
  }
  if (n === undefined) {
    return iterateGen(f, x);
  } else {
    return takeN(iterateGen(f, x), n)[1];
  }
}

import { delay } from "./tools.js";

let g = iterate((x: number) => {
  delay(x);
  return x + 1;
}, 0);

export async function run(iter: AsyncGenerator<unknown> | Generator<unknown>) {
  try {
    for await (let x of iter) {
      console.log(x);
    }
  } catch (err) {
    console.log(err.message, err.code);
  }
}

run(g);
