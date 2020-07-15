// tools
//======

export {
  makeArray,
  pipe,
  memoize,
  getRandomInt,
  getRandomIntSimpel,
  getRandomItem,
  generateId,
  makeHash,
  makeHashMax,
  delay,
  generateDelayingIterable,
  getLoopingRange,
  makeObserver,
  makeQueue,
  queue,
  valoo,
  mix,
  getProportianteOffsetSize,
  waitForPredicate,
  throwError,
}

// makeArray(1, 'string', [3, 4, 5])
function makeArray(...arg) {
  return [].concat(...arg)
}

// Performs left-to-right function composition. The leftmost function may have
// any arity; the remaining functions must be unary.
function pipe(...fns) {
  const _pipe = (accumulator, currentValue) => (...arg) =>
    currentValue(accumulator(...arg))
  return fns.reduce(_pipe)
}

function memoize(f) {
  const cache = {}
  return (...args) => {
    const argStr = JSON.stringify(args)
    cache[argStr] = cache[argStr] || f(...args)
  }
}

function getRandomInt(min, max) {
  // Create byte array and fill with 1 random number
  var byteArray = new Uint8Array(1)
  window.crypto.getRandomValues(byteArray)
  var range = max - min + 1
  var max_range = 256
  if (byteArray[0] >= Math.floor(max_range / range) * range)
    return getRandomInt(min, max)
  return min + (byteArray[0] % range)
}

function getRandomIntSimpel(min = 1, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomItem(array) {
  return array[Math.floor(array.length * Math.random())]
}

function generateId(size) {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz"
  for (var str = "", i = 0; i < size; i += 1)
    str += chars[Math.floor(Math.random() * chars.length)]
  return str
}

function makeHash(string) {
  var hash = 0,
    i,
    chr
  if (string.length === 0) return hash
  for (i = 0; i < string.length; i++) {
    chr = string.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}

// Hashes a string to an integer with returned hash < integer:
function makeHashMax(str, max) {
  function hash(str) {
    return str
      .split("")
      .reduce(
        (hash, char) => (hash << 6) + (hash << 16) - hash + char.charCodeAt(0),
        0
      )
  }
  return ((hash(str) % max) + max) % max
}

// Returns a promise that resolves with the specified value after the specified
// duration in milliseconds. The first arg can be an Error object:
function delay(value, duration = 100) {
  return new Promise(function makePromiseInsideDelay(resolve, reject) {
    setTimeout(function () {
      try {
        const result = typeof value === "function" ? value() : value
        resolve(result)
      } catch (err) {
        reject(err)
      }
    }, duration)
  })
}

// generateDelayingIterable([0,200],1500)
function* generateDelayingIterable(range, time) {
  let i = 0
  while (i++ < 200) {
    yield delay(getRandomIntSimpel(...range), time)
  }
}

async function* getLoopingRange(from, to, time) {
  let c = from
  while (true)
    if (c < to) yield await delay(++c, time)
    else yield await delay((c = 0), time)
}

/**
 * Returns a function that, when called, returns a generator object that is
 * immediately ready for input via `next()`
 */
function makeObserver(generatorFunction) {
  return function (...args) {
    const generatorObject = generatorFunction(...args)
    generatorObject.next()
    return generatorObject
  }
}

// const queue = makeQueue(console.log)
// queue.next(10)
// queue.next(20)
function makeQueue(...callbacks) {
  async function* makeGenerator(callbacks) {
    while (true) {
      const request = yield
      for (const callback of callbacks) {
        await callback(request)
      }
    }
  }
  const generatorObject = makeGenerator(callbacks)
  generatorObject.next()
  return generatorObject
}

// Wrap an async function `fn()` in a queue using promise chaining, so only
// one instance of `fn()` can run at a time on this server.
function queue(fn) {
  let lastPromise = Promise.resolve()
  return function (...args) {
    let returnedPromise = lastPromise.then(() => fn(...args))
    // If `returnedPromise` rejected, swallow the rejection for the queue,
    // but `returnedPromise` rejections will still be visible outside the queue
    lastPromise = returnedPromise.catch(() => {})
    return returnedPromise
  }
}

// valoo: just the bare necessities of state management
function valoo(v = null, ...cb) {
  function value(n) {
    if (arguments.length) {
      v = n
      cb.map(f => f && f(v))
    }
    return v
  }
  value.on = c => {
    const i = cb.push(c) - 1
    return () => (cb[i] = null)
  }
  return value
}

// This is our Linear Interpolation method. It takes 3 parameters:
// a: The starting value
// b: The destination value
// amount: The normal value (between 0 and 1) to control the Linear Interpolation
//
// If your normal value is equal to 1 the circle will instantly switch from A to B.
// If your normal value is equal to 0 the circle will not move.
// The closer your normal is to 0 the smoother will be the interpolation.
// The closer your normal is to 1 the sharper will be the interpolation.
function mix(a, b, amount) {
  return (1 - amount) * a + amount * b
}

// calculate the proportianl share of the 40/300 ratio from 100:
// getProportianteOffsetSize(40, 300, 100) // 13.333333333333332
function getProportianteOffsetSize(
  value,
  biggestPossibleValue,
  actualTotalLength
) {
  return (value / biggestPossibleValue) * actualTotalLength
}

/**
 * Waits until the given predicate returns a truthy value. Calls and awaits the predicate
 * function at the given interval time. Can be used to poll until a certain condition is true.
 *
 * @example
 * ```js
 * const element = await fixture(html`<my-element></my-element>`);
 * await waitUntil(() => return !!element.offsetParent, 'element should become ready');
 * ```
 *
 * @param {() => boolean | Promise<boolean>} predicate - predicate function which is called each poll interval.
 *   The predicate is awaited, so it can return a promise.
 * @param {string} [message] an optional message to display when the condition timed out
 * @param {{ interval?: number, timeout?: number }} [options] timeout and polling interval
 */
function waitForPredicate(predicate, message, options = {}) {
  const { interval = 50, timeout = 2000 } = options

  return new Promise((resolve, reject) => {
    let timeoutId

    setTimeout(() => {
      clearTimeout(timeoutId)
      reject(new Error(message ? `Timeout: ${message}` : "waitUntil timed out"))
    }, timeout)

    async function nextInterval() {
      try {
        if (await predicate()) {
          resolve()
        } else {
          timeoutId = setTimeout(() => {
            nextInterval()
          }, interval)
        }
      } catch (error) {
        reject(error)
      }
    }
    nextInterval()
  })
}

function throwError(mssg) {
  throw new Error(mssg)
}
