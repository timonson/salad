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
import { chainOption, foldOption, mapOption, None, some } from "../option.ts";
import {
  compose,
  composeMultivariate,
  identity,
} from "../higher-order-functions.ts";

function add10Chainable(v: number) {
  return v > -100 ? some(add10(v)) : None;
}

Deno.test("[higher-order-functions] identity", function () {
  assertEquals(
    chainOption(add10Chainable)(
      mapOption(identity)(mapOption(add10)(some(5))),
    ),
    {
      kind: "Some",
      value: 5 + val2,
    },
  );
});

Deno.test("[higher-order-functions] compose", function () {
  assertEquals(
    compose(
      (val: string) => `1<${val}>`,
      (val: string) => `2<${val}>`,
      (val: string) => `3<${val}>`,
    )("hello"),
    "1<2<3<hello>>>",
  );
  assertEquals(
    add10(
      compose(
        (val: string) => add10(parseInt(val)),
        (val: string) => add10(parseInt(val)).toString(),
        (val: number) => add10(val).toString(),
      )(0),
    ),
    40,
  );
});

Deno.test("[higher-order-functions] composeMultivariate", function () {
  assertEquals(
    composeMultivariate<number[]>(
      (i: number, j: number) => [i + 1, j + 1],
      (g: number, h: number) => [g + 1, h + 1],
      (e: number, f: number) => [e + 1, f + 1],
      (c: number, d: number) => [c + 1, d + 1],
      (a: number, b: number) => [a + 1, b + 1],
    )(0, 1).map(add10),
    [15, 16],
  );
});
