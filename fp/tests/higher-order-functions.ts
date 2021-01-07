import { zip } from "../array-functions.js";

function foo(x) {
  // console.log(x);
  return x + 1;
}
function bar(x) {
  // console.log(x);
  return x + 2;
}
function map(f) {
  return (arr) => {
    // console.log(arr);
    return arr.map(f);
  };
}
const functions = [foo, bar, foo];
const arrN = [10, 20, 30];
const applyValue = apply(10);
const results = map(applyValue)(functions);
const applied = map(applyPairTo(applyTo))(zip(functions, arrN));
console.log(results);
console.log(applied);
