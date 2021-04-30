export type TypedArray =
  | Int8Array
  | Uint8Array
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Uint8ClampedArray
  | Float32Array
  | Float64Array;

/**
  * https://stackoverflow.com/questions/33702838/how-to-append-bytes-multi-bytes-and-buffer-to-arraybuffer-in-javascript
  * You can create a new TypedArray with a new ArrayBuffer, but you can't change the
  * size of an existing buffer
  */
export function concatTypedArrays<A extends TypedArray>(a: A, b: A): A {
  // a, b TypedArray of same type
  //@ts-ignore
  const c = new a.constructor(a.length + b.length);
  c.set(a, 0);
  c.set(b, a.length);
  return c;
}

/**
  * Concat bytes to TypedArray
  */
export function concatBytes<A extends TypedArray>(a: A, ...bytes: number[]): A {
  //@ts-ignore
  const b = new a.constructor(bytes);
  return concatTypedArrays(a, b);
}

/**
  * Compare TypedArrays
  */
export function areEqual<A extends TypedArray>(a: A, b: A): Boolean {
  if (a.byteLength !== b.byteLength) return false;
  return a.every((el: A[number], i: number) => el === b[i]);
}
