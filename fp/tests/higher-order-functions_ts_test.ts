// import { zip } from "../array-functions.js";
import {
  apply,
  applyPairTo,
  applyTo,
  curry,
} from "../higher-order-functions.ts";

// function foo(x: number) {
// // console.log(x);
// return x + 1;
// }
// function bar(x: number) {
// // console.log(x);
// return x + 2;
// }
// function map(f: any) {
// return (arr: any) => {
// // console.log(arr);
// return arr.map(f);
// };
// }
// const functions = [foo, bar, foo];
// const arrN = [10, 20, 30];
// const applyValue = apply(10);
// const results = map(applyValue)(functions);
// const applied = map(applyPairTo(applyTo))(zip(functions, arrN));
// console.log(results);
// console.log(applied);

function calc(a: number, b: number, c: number) {
  return a + b + c;
}

let f = curry<(a: number) => (b: number) => (c: number) => number>(calc);
console.log(f);
let f1 = f(22);
let f2 = f(2)(3)(4);
// f = 1;
// f1 = 5;
console.log(f2);
