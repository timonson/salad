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
  chainResult,
  failure,
  foldResult,
  ifFailed,
  invertResults,
  mapResult,
  success,
} from "../result.ts";

function add10Chainable(v: number) {
  return v > -100 ? success(add10(v)) : failure(err1);
}

function add20Chainable(v: number) {
  return v > -100 ? success(add20(v)) : failure(err1);
}

function add20IfNegativeChainable(v: number) {
  return v < 0 ? success(add20(v)) : failure(err1);
}

Deno.test("[result] mapResult", function () {
  assertEquals(mapResult(add20)(mapResult(add10)(success(5))), {
    value: 5 + val1 + val2,
    kind: "Success",
  });
});

Deno.test("[result] chainResult", function () {
  assertEquals(
    chainResult(add20Chainable)(chainResult(add10Chainable)(success(5))),
    {
      value: 5 + val1 + val2,
      kind: "Success",
    },
  );
});

Deno.test("[result] foldResult", function () {
  assertEquals(
    foldResult(add10)(appendUps)(
      chainResult(add20IfNegativeChainable)(
        chainResult(add10Chainable)(success(-20)),
      ),
    ),
    -20 + val1 + val2 + val1,
  );
  assertEquals(
    foldResult(add10Chainable)(appendUps)(
      chainResult(add20IfNegativeChainable)(
        chainResult(add10Chainable)(success(5)),
      ),
    ),
    err1 + err2,
  );
});

Deno.test("[result] invertResults", function () {
  assertEquals(
    invertResults([success(val1), success(val2)]),
    success([val1, val2]),
  );
  assertEquals(invertResults([failure(err1), failure(err2)]), failure(err1));
  assertEquals(invertResults([failure(err1), success(val1)]), failure(err1));
  assertEquals(invertResults([success(val1), failure(err1)]), failure(err1));
});
