export { isPresent, isObject, has }

// remove falsey values:
function isPresent<T>(t: T | undefined | null | void): t is T {
  return t !== undefined && t !== null
}

function isObject(obj: unknown): obj is object {
  return obj !== null && typeof obj === "object" && Array.isArray(obj) === false
}

function has<K extends string>(
  key: K,
  x: object
): x is { [key in K]: unknown } {
  return key in x
}
