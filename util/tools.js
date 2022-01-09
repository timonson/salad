/**
 * Returns a promise that resolves with the specified value after the specified
 * duration in milliseconds. The first arg can be an Error object:
 */
export function delay(value, duration = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(
      async () => resolve(typeof value === "function" ? await value() : value),
      duration,
    );
  });
}

/**
 * assertArray(1, 'string', [3, 4, 5])
 */
export function assertArray(...arg) {
  return [].concat(...arg);
}

export function throwError(msg) {
  throw new Error(msg);
}

/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity; the remaining functions must be unary.
 */
export function pipe(...fns) {
  const _pipe = (accumulator, currentValue) =>
    (...arg) => currentValue(accumulator(...arg));
  return fns.reduce(_pipe);
}

export function memoize(f) {
  const cache = {};
  return (...args) => {
    const argStr = JSON.stringify(args);
    cache[argStr] = cache[argStr] || f(...args);
  };
}

/**
 * The id's length is 8
 */
export function generateId() {
  return window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
}

export function generateIdOfSize(size) {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  for (var str = "", i = 0; i < size; i += 1) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}

export function getRandomInt(min = 1, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomElement(array) {
  return array[Math.floor(array.length * Math.random())];
}

export function getRandomHexColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

/**
 * Just the bare necessities of state management
 */
export function valoo(v, ...cb) {
  function value(n) {
    if (arguments.length) {
      v = n;
      cb.map((f) => f && f(v));
    }
    return v;
  }
  value.on = (c) => {
    const i = cb.push(c) - 1;
    return () => (cb[i] = null);
  };
  return value;
}

export function stringifyKeysInOrder(data) {
  function recursivelyOrderKeys(unordered) {
    // If it's an array - recursively order any
    // dictionary items within the array
    if (Array.isArray(unordered)) {
      unordered.forEach(function (item, index) {
        unordered[index] = recursivelyOrderKeys(item);
      });
      return unordered;
    }
    // If it's an object - let's order the keys
    if (typeof unordered === "object") {
      const ordered = {};
      Object.keys(unordered)
        .sort()
        .forEach(function (key) {
          ordered[key] = recursivelyOrderKeys(unordered[key]);
        });
      return ordered;
    }
    return unordered;
  }
  return JSON.stringify(recursivelyOrderKeys(data), null, 2);
}

/**
 * The function returns an array with nested key/value pairs, where the unique key
 * represents a word and the value the amount of the word's appearances:
 * Example:
 * let text = "Hello World, hello Sun!";
 * const words = getWordCnt(text); // [ [ "Hello", 2 ], [ "World", 1 ], [ "Sun", 1 ] ]
 * const strings = words.map(
 * ([key, value]) => `The word '${key}' appears ${value} time(s)`,
 * );
 */
export function getWordCnt(text) {
  return Object.entries(
    text
      .toLowerCase()
      .split(/\W+/)
      .filter((line) => !!line)
      .reduce((acc, el) => {
        acc[el] = acc[el] + 1 || 1;
        return acc;
      }, {}),
  );
}
