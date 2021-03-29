import {
  add10,
  add20,
  appendUps,
  assertEquals,
  err1,
  err2,
  val1,
  val2,
} from "./deps.ts";
import {
  mapFulfilled,
  mapPromise,
  parallel,
  parallelMap,
} from "../promise-functions.ts";

async function add10Async(v: Promise<number>) {
  return add10(await v);
}

const promise = Promise.resolve(10);
const promises = [promise, promise];

Deno.test("[promise-functions] parallel", async function () {
  assertEquals(
    await parallel(promise, promise),
    [val1, val1],
  );
  assertEquals(await parallel(promises), [val1, val1]);
  // assertEquals(await parallel(promises, promises), [val1, val1]);
});

Deno.test("[promise-functions] parallelMap", async function () {
  assertEquals(
    await parallelMap(add10Async)(promises),
    [val2, val2],
  );
});

Deno.test("[promise-functions] mapFulfilled", async function () {
  assertEquals(
    await mapFulfilled(val2)(promise),
    val2,
  );
  assertEquals(
    await mapFulfilled(add10)(promise),
    val2,
  );
  assertEquals(
    await mapFulfilled(add10)(Promise.reject(err1)).catch((err) => err),
    err1,
  );
});

Deno.test("[promise-functions] mapPromise", async function () {
  assertEquals(
    await mapPromise(val2)(appendUps)(promise),
    val2,
  );
  assertEquals(
    await mapPromise(val2)(err2)(promise),
    val2,
  );
  assertEquals(
    await mapPromise(add10)(appendUps)(promise),
    val2,
  );
  assertEquals(
    await mapPromise(add10)(err2)(promise),
    val2,
  );
  assertEquals(
    await mapPromise(val2)(appendUps)(Promise.reject(err1)),
    err1 + "ups",
  );
  assertEquals(
    await mapPromise(val2)(err2)(Promise.reject(err1)),
    err2,
  );
  assertEquals(
    await mapPromise(add10)(appendUps)(Promise.reject(err1)),
    err1 + "ups",
  );
  assertEquals(
    await mapPromise(add10)(err2)(Promise.reject(err1)),
    err2,
  );
});
