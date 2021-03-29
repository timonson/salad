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
import { join, split } from "../string-functions.ts";

Deno.test("[string-functions] split", function () {
  assertEquals(
    split("t")(err1),
    ["ou", "ch"],
  );
});

Deno.test("[string-functions] join", function () {
  assertEquals(
    join("")(err1, err2),
    err1 + err2,
  );
  assertEquals(
    join(",")([err1, err2]),
    err1 + "," + err2,
  );
});
