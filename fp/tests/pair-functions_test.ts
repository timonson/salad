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
  duplicate,
  foldPair,
  mapFirst,
  mapPair,
  mapSecond,
  pair,
  pairBy,
  pairWith,
} from "../pair-functions.ts";

Deno.test("[pair-functions] pair", function () {
  assertEquals(
    pair(val1)(val2),
    [val1, val2],
  );
});

Deno.test("[pair-functions] pairWith", function () {
  assertEquals(
    pairWith(val1)(val2),
    [val2, val1],
  );
});

Deno.test("[pair-functions] pairBy", function () {
  assertEquals(
    pairBy(add10)(val1),
    [val1, val2],
  );
});

Deno.test("[pair-functions] duplicate", function () {
  assertEquals(
    duplicate(val1),
    [val1, val1],
  );
});

Deno.test("[pair-functions] mapFirst", function () {
  assertEquals(
    mapFirst(add10)([val1, err1]),
    [val2, err1],
  );
});

Deno.test("[pair-functions] mapSecond", function () {
  assertEquals(
    mapSecond(add10)([err1, val1]),
    [err1, val2],
  );
});

Deno.test("[pair-functions] mapPair", function () {
  assertEquals(
    mapPair((a: number) => (b: number) => a + b)([val1, val1]),
    [val1, val2],
  );
});

Deno.test("[pair-functions] foldPair", function () {
  assertEquals(
    foldPair((a: number) => (b: number) => a + b)([val1, val1]),
    val2,
  );
});
