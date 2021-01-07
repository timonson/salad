import {
  transformOptionToResult,
  transformResultToPromise,
} from "./transformation.ts";
import { failure, success } from "./result.ts";
import { chainOption, None, some } from "./option.ts";

const add10 = (v: number) => v + 10;
const append = (v: string) => v + " appended";
const s = success("suc");
const e = failure(["err"]);

async function resolve(x: string) {
  return Promise.resolve(x);
}

//transformResultToPromise
let r1 = await transformResultToPromise(resolve);
// r1 = 3;
let r2 = r1(s);
console.log(r2);
let r3 = await transformResultToPromise(s);
// r3 = 4;
console.log(r3);

// transformOptionToResult
let r4 = chainOption((n: number) => n > 30 ? None : some(111))(some(5));
console.log(r4);
// r4 = [];
let r5 = transformOptionToResult(333);
// r5 = 5;
let r6 = transformOptionToResult(append);
// r6 = 6;
let r7 = r6(44);
// r7 = "ss";
let r8 = r5(some("some"));
// r8 = 7;
let r9 = r6(999);
// console.log(r8);
// console.log(r9)
