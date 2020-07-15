export function makeArray<T>(...arg: T[]) {
  return arg.flat(1)
}
