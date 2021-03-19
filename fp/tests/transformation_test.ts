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
  transformOptionToResult,
  transformResultToPromise,
} from "../transformation.ts";
import { failure, success } from "../result.ts";
import { None, some } from "../option.ts";
import { identity } from "../higher-order-functions.ts";

async function add10Async(v: number) {
  return add10(v);
}

function add10Option(v: number) {
  return some(add10(v));
}

let r1 = await transformResultToPromise(failure(err1)).catch(identity);
let r2 = await transformResultToPromise(add10Async)(failure(err1)).catch(
  identity,
);
r1 = 3;
Deno.test("[transformation] transformResultToPromise", async function () {
  assertEquals(
    await transformResultToPromise(success(val2)),
    val2,
  );
  assertEquals(
    await transformResultToPromise(add10Async)(success(val1)),
    val2,
  );
  assertEquals(
    await transformResultToPromise(failure(err1)).catch(identity),
    err1,
  );
  assertEquals(
    await transformResultToPromise(add10Async)(failure(err1)).catch(identity),
    err1,
  );
});

Deno.test("[transformation] transformOptionToResult", function () {
  assertEquals(
    transformOptionToResult(err1)(some(val2)),
    success(val2),
  );
  assertEquals(
    transformOptionToResult(add10)(err1)(some(val1)),
    val2,
  );
  assertEquals(
    transformOptionToResult(err1)(None),
    failure(err1),
  );
  assertEquals(
    transformOptionToResult(add10)(err1)(None),
    failure(err1),
  );
});
