// remove falsey values:
export function isPresent<T>(t: T | undefined | null | void): t is T {
  return t !== undefined && t !== null;
}
export function isNotNull<T>(t: T | null): t is T {
  return t !== null;
}

export function isNull(input: unknown): input is null {
  return input === null;
}

export function isUndefined(input: unknown): input is undefined {
  return input === undefined;
}

export function isString(input: unknown): input is string {
  return typeof input === "string";
}

export function isNumber(input: unknown): input is number {
  return typeof input === "number";
}

export function isObjectWide(obj: unknown): obj is Record<string, unknown> {
  return (
    obj !== null && typeof obj === "object" && Array.isArray(obj) === false
  );
}

export function isObject(obj: unknown): obj is object {
  return (
    obj !== null && typeof obj === "object" && Array.isArray(obj) === false
  );
}

export function hasProperty<K extends string>(
  key: K,
  obj: object,
): obj is { [key in K]: unknown } {
  return key in obj;
}

export function isObjectAndHasProp<K extends string>(
  key: K,
  obj: unknown,
): obj is { [key in K]: unknown } {
  return (
    typeof obj === "object" &&
    Array.isArray(obj) === false &&
    obj !== null &&
    key in obj
  );
}

export function isTrue(input: unknown): input is true {
  return input === true;
}

export function isFalse(input: unknown): input is false {
  return input === false;
}

export function isEmail(value: unknown): value is string {
  // https://stackoverflow.com/a/46181
  const regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return typeof value === "string" && regex.test(value.toLowerCase());
}
