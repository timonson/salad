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
  * assureArray(1, 'string', [3, 4, 5])
  */
export function assureArray(...arg) {
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

export function getRandomInt(min, max) {
  // Create byte array and fill with 1 random number
  var byteArray = new Uint8Array(1);
  window.crypto.getRandomValues(byteArray);
  var range = max - min + 1;
  var max_range = 256;
  if (byteArray[0] >= Math.floor(max_range / range) * range) {
    return getRandomInt(min, max);
  }
  return min + (byteArray[0] % range);
}

export function getRandom(min = 1, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomItem(array) {
  return array[Math.floor(array.length * Math.random())];
}

export function generateId(size) {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  for (var str = "", i = 0; i < size; i += 1) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
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
