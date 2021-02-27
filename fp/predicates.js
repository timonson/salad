export function isPresent(t) {
  return t !== undefined && t !== null;
}

export function isNull(input) {
  return input === null;
}

export function isUndefined(input) {
  return input === undefined;
}

export function isString(input) {
  return typeof input === "string";
}

export function isNumber(input) {
  return typeof input === "number";
}

export function isTrue(input) {
  return input === true;
}

export function isFalse(input) {
  return input === false;
}

export function isFunction(input) {
  return typeof input === "function";
}

export function isObjectWide(obj) {
  return obj !== null && typeof obj === "object" &&
    Array.isArray(obj) === false;
}

export function isObject(obj) {
  return obj !== null && typeof obj === "object" &&
    Array.isArray(obj) === false;
}

export function hasProperty(key, obj) {
  return key in obj;
}

export function isObjectAndHasProp(key, obj) {
  return typeof obj === "object" && Array.isArray(obj) === false &&
    obj !== null && key in obj;
}

// https://stackoverflow.com/a/46181
export function isEmail(value) {
  const regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return typeof value === "string" && regex.test(value.toLowerCase());
}
