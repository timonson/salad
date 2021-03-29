import {
  add10,
  add20,
  appendUps,
  assertEquals,
  err1,
  err2,
  isLetterC,
  str1,
  str2,
  val1,
  val2,
} from "./deps.ts";
import {
  append,
  appendTo,
  concat,
  first,
  last,
  prepend,
  prependTo,
  reverse,
} from "../string-or-array-functions.ts";

Deno.test("[string-or-array-functions] first", function () {
  assertEquals(first(str1), "a");
  assertEquals(first(["a", 4, "b"]), "a");
  assertEquals(first(isLetterC)(str1), "c");
  assertEquals(first(isLetterC)(["a", "b", 1, "c", "d"]), "c");
  assertEquals(first(isLetterC)(str2), null);
  assertEquals(first(isLetterC)(["a", "b", 1, "d"]), null);
});

Deno.test("[string-or-array-functions] append", function () {
  assertEquals(append(str2)(str1), str1 + str2);
  assertEquals(append(str2)([val1, str1]), [val1, str1, str2]);
});

Deno.test("[string-or-array-functions] appendTo", function () {
  assertEquals(appendTo(str1)(str2), str1 + str2);
  assertEquals(appendTo([val1, str1])(val2), [val1, str1, val2]);
});

Deno.test("[string-or-array-functions] prepend", function () {
  assertEquals(prepend(str2)(str1), str2 + str1);
  assertEquals(prepend(str2)([val1, str1]), [str2, val1, str1]);
});

Deno.test("[string-or-array-functions] prependTo", function () {
  assertEquals(prependTo(str1)(str2), str2 + str1);
  assertEquals(prependTo([val1, str1])(val2), [val2, val1, str1]);
});

Deno.test("[string-or-array-functions] concat", function () {
  assertEquals(concat([[val1], [str1, str2]]), [val1, str1, str2]);
  assertEquals(concat([val1], [str1, str2]), [val1, str1, str2]);
  assertEquals(concat([str1, str2], [str1]), [str1, str2, str1]);
  assertEquals(concat([str1, str2]), str1 + str2);
  assertEquals(concat(str1, str2), str1 + str2);
});

Deno.test("[string-or-array-functions] prependTo", function () {
  assertEquals(reverse(str1), ["c", "b", "a"]);
  assertEquals(reverse([str1, val1, str2]), [str2, val1, str1]);
});
