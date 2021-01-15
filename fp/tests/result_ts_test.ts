import {
  chainResult,
  failure,
  foldResult,
  ifFailed,
  ifSucceeded,
  invertResults,
  mapResult,
  success,
} from "../result.ts";

const add10 = (v: number) => v + 10;
const append = (v: string) => v + " appended";

//success
const s = success("suc");
const e = failure(["err"]);

// mapResult
let r2 = mapResult(append)(s);
// r2 = 9;
let r22 = mapResult(append)(e);
// r22 = "";

// chainResult
let r3 = chainResult((str: string) =>
  str.length > 2 ? success("chained") : failure(["faield", 55])
)(s);
// r3 = 9;

// foldResult
let r1 = foldResult(append)((e: string[]) => [""])(s);
// r1 = { a: "" };
let r12 = foldResult(append);
// r12 = 3;
let r122 = foldResult("yyy");
// r122 = 4;
let r123 = r12(add10);
// r123 = 9;
let r13 = r12(add10);
// r13 = 3;
let r14 = r12(44);
// r14 = 4;
let r15 = r14(e);
console.log(r15);
let r16 = foldResult(() => "FOLDED")("GRRRRR")(s);
console.log("r16", r16);

// invertResults

let r4 = invertResults([success(2), success("a"), failure("s")]);
let r5 = invertResults([failure("s"), failure("")]);
let r6 = invertResults([failure(3), success(3)]);
let r7 = invertResults([success(3), failure("")]);
// r4 = success([8]);
// r4 = 5;

// ifSucceeded
let r8 = ifSucceeded(console.log);
// r8 = 9;
let r9 = r8(s);

// ifFailed
let r10 = ifFailed((x: string[]) => x[0]);
// r10 = 9;
let r11 = r10(e);
// r11 = 3;
