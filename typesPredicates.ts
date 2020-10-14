export {
  isPresent,
  isNotNull,
  isNull,
  isUndefined,
  isString,
  isObjectWithAllProps,
  isObject,
  hasProperty,
  isTrue,
  isFalse,
};

// remove falsey values:
function isPresent<T>(t: T | undefined | null | void): t is T {
  return t !== undefined && t !== null;
}
function isNotNull<T>(t: T | null): t is T {
  return t !== null;
}

function isNull(input: unknown): input is null {
  return input === null;
}

function isUndefined(input: unknown): input is undefined {
  return input === undefined;
}

function isString(input: unknown): input is string {
  return typeof input === "string";
}

function isObjectWithAllProps(obj: unknown): obj is { [key: string]: unknown } {
  return (
    obj !== null && typeof obj === "object" && Array.isArray(obj) === false
  );
}

function isObject(obj: unknown): obj is object {
  return (
    obj !== null && typeof obj === "object" && Array.isArray(obj) === false
  );
}

function hasProperty<K extends string>(
  key: K,
  obj: object
): obj is { [key in K]: unknown } {
  return key in obj;
}

function isObjectAndHasProp(
  obj: unknown,
  key: string
): obj is { [key in K]: unknown } {
  return (
    obj !== null &&
    typeof obj === "object" &&
    Array.isArray(obj) === false &&
    key in obj
  );
}

function isTrue(input: unknown): input is true {
  return input === true;
}

function isFalse(input: unknown): input is false {
  return input === false;
}
