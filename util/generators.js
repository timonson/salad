/**
 * delayingIterable([0,200],1500)
 */
export function* delayingIterable(range, time) {
  let i = 0;
  while (i++ < 200) {
    yield delay(getRandomIntSimpel(...range), time);
  }
}

export function* loopingRange(from, to, time) {
  while (true) {
    if (from < to) yield delay(++from, time);
    else yield delay(from = 0, time);
  }
}

/**
 * Returns a function that, when called, returns a generator object that is
 * immediately ready for input via `next()`
 */
export function makeObserver(generatorFunction) {
  return function (...args) {
    const generatorObject = generatorFunction(...args);
    generatorObject.next();
    return generatorObject;
  };
}

/**
 * const queue = makeQueue(console.log)
 * queue.next(10)
 * queue.next(20)
 */
export function makeQueue(...callbacks) {
  async function* makeGenerator(callbacks) {
    while (true) {
      const request = yield;
      for (const callback of callbacks) {
        await callback(request);
      }
    }
  }
  const generatorObject = makeGenerator(callbacks);
  generatorObject.next();
  return generatorObject;
}

/**
 * Wrap an async function `fn()` in a queue using promise chaining, so only
 * one instance of `fn()` can run at a time on this server.
 * If `returnedPromise` rejected, swallow the rejection for the queue,
 * but `returnedPromise` rejections will still be visible outside the queue
 */
export function queue(fn) {
  let lastPromise = Promise.resolve();
  return function (...args) {
    let returnedPromise = lastPromise.then(() => fn(...args));
    lastPromise = returnedPromise.catch(() => {});
    return returnedPromise;
  };
}
