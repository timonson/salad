export function pair<A>(a: A) {
  return <B>(b: B): [A, B] => [a, b];
}

export function pairWith<B>(b: B) {
  return <A>(a: A): [A, B] => [a, b];
}

export function pairBy<A, B>(f: (a: A) => B) {
  return (a: A): [A, B] => [a, f(a)];
}

export function duplicate<A>(a: A): [A, A] {
  return [a, a];
}

export function mapFirst<A, C>(f: (a: A) => C) {
  return <B>([a, b]: [A, B]): [C, B] => [f(a), b];
}

export function mapSecond<B, C>(g: (b: B) => C) {
  return <A>([a, b]: [A, B]): [A, C] => [a, g(b)];
}

export function mapPair<A, B, C>(g: (a: A) => (b: B) => C) {
  return ([a, b]: [A, B]): [A, C] => [a, g(a)(b)];
}

export function foldPair<A, B, C>(f: (a: A) => (b: B) => C) {
  return ([a, b]: [A, B]): C => f(a)(b);
}
