import {
  chainOption,
  foldOption,
  invertOptions,
  mapOption,
  None,
  some,
} from "./option.ts";

const add10 = (v: number) => v + 10;
const append = (v: string) => v + " appended";

// some
let s = some("some");

// mapOption
let r1 = mapOption(append);
// r1= 3;
let r2 = r1(s);
// r2 = 4;
// console.log(r2);
let r3 = r1(None);

// chainOption
let r4 = chainOption((x: string) => x.length < 2 ? None : some(5));
// r4 = 9;
let r5 = r4(r2);

// foldOption
let r6 = foldOption(append)(() => 3);
// r6 = 4;

// invertOptions
let r7 = invertOptions([some(2), some("a"), None]);
let r8 = invertOptions([None, None]);
let r9 = invertOptions([None, some(3)]);
let r10 = invertOptions([some(3), None]);
// r7 = {};
