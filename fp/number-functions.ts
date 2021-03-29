export function add(x: number) {
  return (y: number) => x + y;
}

export function multiply(x: number) {
  return (y: number) => x * y;
}

export function greaterThan(value: number) {
  return (x: number) => x > value;
}

export function lessThan(value: number) {
  return (x: number) => x < value;
}
