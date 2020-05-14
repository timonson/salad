export { GenericObject, AnyFunction, IsExact, assertType }

type GenericObject<T> = { [key: string]: T }
type AnyFunction = (...args: any[]) => any

// https://stackoverflow.com/questions/55046211/typescript-check-if-type-a-type-b-type-c
// assertType<IsExact<P1 | P2, P3>>(true)
type IsExact<T, U> = [T] extends [U] ? ([U] extends [T] ? true : false) : false
function assertType<T extends true | false>(expectTrue: T) {}
