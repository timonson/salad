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
  alternativeOption,
  alternativeValue,
  chainOption,
  concatOptions,
  foldOption,
  invertOptions,
  mapOption,
  None,
  some,
} from "../option.ts";

function add10Chainable(v: number) {
  return v > -100 ? some(add10(v)) : None;
}

function add20Chainable(v: number) {
  return v > -100 ? some(add20(v)) : None;
}

function add20IfNegativeChainable(v: number) {
  return v < 0 ? some(add20(v)) : None;
}

Deno.test("[Option] mapOption", function () {
  assertEquals(mapOption(add20)(mapOption(add10)(some(5))), {
    value: 5 + val1 + val2,
    kind: "Some",
  });
});

Deno.test("[Option] chainOption", function () {
  assertEquals(
    chainOption(add20Chainable)(chainOption(add10Chainable)(some(5))),
    {
      value: 5 + val1 + val2,
      kind: "Some",
    },
  );
});

Deno.test("[Option] foldOption", function () {
  assertEquals(
    foldOption(add10)(appendUps)(
      chainOption(add20IfNegativeChainable)(
        chainOption(add10Chainable)(some(-20)),
      ),
    ),
    -20 + val1 + val2 + val1,
  );
  assertEquals(
    foldOption(add10Chainable)(appendUps)(
      chainOption(add20IfNegativeChainable)(
        chainOption(add10Chainable)(some(5)),
      ),
    ),
    err2,
  );
});

Deno.test("[Option] invertOptions", function () {
  assertEquals(
    invertOptions([some(val1), some(val2)]),
    some([val1, val2]),
  );
  assertEquals(invertOptions([None, None]), None);
  assertEquals(invertOptions([None, some(val1)]), None);
  assertEquals(invertOptions([some(val1), None]), None);
});

Deno.test("[Option] concatOptions", function () {
  assertEquals(
    concatOptions([some(val1), some(val2)]),
    [val1, val2],
  );
  assertEquals(concatOptions([None, None]), []);
  assertEquals(concatOptions([None, some(val1)]), [val1]);
  assertEquals(concatOptions([some(val1), None]), [val1]);
});

Deno.test("[Option] alternativeOption", function () {
  assertEquals(alternativeOption(() => some(val1))(some(val2)), {
    kind: "Some",
    value: val2,
  });
  assertEquals(alternativeOption(some(val1))(some(val2)), {
    kind: "Some",
    value: val2,
  });
  assertEquals(alternativeOption(() => some(val1))(None), {
    kind: "Some",
    value: val1,
  });
  assertEquals(alternativeOption(some(val1))(None), {
    kind: "Some",
    value: val1,
  });
});

Deno.test("[Option] alternativeValue", function () {
  assertEquals(alternativeValue(() => val1)(some(val2)), val2);
  assertEquals(alternativeValue(val1)(some(val2)), val2);
  assertEquals(alternativeValue(() => val1)(None), val1);
  assertEquals(alternativeValue(val1)(None), val1);
});
