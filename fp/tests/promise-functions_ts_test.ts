const ifFulfilled = (p: string) => {
  console.log("fullfilled");
  return "full promise";
};
const ifRejected = (p: string) => {
  console.log("rejected");
  return 100;
};
let r1 = mapFulfilled(ifFulfilled)(Promise.resolve("promise"));
let r2 = mapPromise(ifFulfilled)(ifRejected)(Promise.resolve("promise"));
let r3 = mapPromise(ifFulfilled)(ifRejected)(Promise.reject("promise"));
console.log(r1, r2, r3);
// r1 = 3;
let r4 = mapFulfilled(ifFulfilled);
// r4 = 3;
let r5 = mapPromise(ifFulfilled)(ifRejected);
// r5 = 4;
let r6 = mapPromise(ifFulfilled)(ifRejected);
// r6 = 5;
