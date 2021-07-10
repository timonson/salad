// const foo: Array<number | null | string> = [2, 3, null, "a", 4];
// const bar = foo.filter(not<string>(isString)); // (number | null)[]
export function not<N>(predicate: (x: unknown) => Boolean) {
  return <T>(x: T | N): x is T => !predicate(x);
}

export function anyPass<X>(predicates: ((x: X) => Boolean)[]) {
  return (x: X): Boolean => {
    for (let i_p = 0; i_p < predicates.length; i_p++) {
      if (predicates[i_p](x)) {
        return true;
      }
    }

    return false;
  };
}

export function allPass<X>(predicates: ((x: X) => Boolean)[]) {
  return (x: X): Boolean => {
    for (let i_p = 0; i_p < predicates.length; i_p++) {
      if (!predicates[i_p](x)) {
        return false;
      }
    }

    return true;
  };
}

export function isBoolean(input: unknown): input is Boolean {
  return input === true || input === false;
}

export function isNull(input: unknown): input is null {
  return input === null;
}

export function isUndefined(input: unknown): input is undefined {
  return input === undefined;
}

/*
 * https://github.com/robertmassaioli/ts-is-present/blob/master/src/index.ts
 * Removes falsey values:
 * const foo: Array<number | null> = [2,3, null, 4];
 * const bar = foo.filter(isPresent); // number[]
 */
export function isPresent<T>(t: T | undefined | null | void): t is T {
  return t !== undefined && t !== null;
}

export function isDefined<T>(t: T | undefined): t is T {
  return t !== undefined;
}

export function isNotNull<T>(t: T | null): t is T {
  return t !== null;
}

export function isTrue(input: unknown): input is true {
  return input === true;
}

export function isFalse(input: unknown): input is false {
  return input === false;
}

export function equals<B>(b: B) {
  return (a: unknown): a is B => a === b;
}

export function isObjectWide(obj: unknown): obj is Record<string, unknown> {
  return (
    obj !== null && typeof obj === "object" && Array.isArray(obj) === false
  );
}

export function isObject(obj: unknown): obj is object {
  return (
    obj !== null && typeof obj === "object" && Array.isArray(obj) === false
  );
}

export function hasProperty<K extends string>(key: K) {
  return (obj: object): obj is { [key in K]: unknown } => key in obj;
}

export function isObjectAndHasProp<K extends string>(key: K) {
  return (obj: object) => isObject(obj) && hasProperty(key)(obj);
}

// https://stackoverflow.com/a/46181
export function isEmail(value: unknown): value is string {
  const regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return typeof value === "string" && regex.test(value.toLowerCase());
}

/**
 * https://github.com/robertmassaioli/ts-is-present/blob/master/src/index.ts
 * Returns a function that can be used to filter down objects
 * to the ones that have a defined non-null value under the key `k`.
 *
 * @example
 * ```ts
 * const filesWithUrl = files.filter(file => file.url);
 * files[0].url // In this case, TS might still treat this as undefined/null
 *
 * const filesWithUrl = files.filter(hasPresentKey("url"));
 * files[0].url // TS will know that this is present
 * ```
 *
 * See https://github.com/microsoft/TypeScript/issues/16069
 * why is that useful.
 */
export function hasPresentKey<K extends string | number | symbol>(k: K) {
  return function <T, V>(
    a: T & { [k in K]?: V | null },
  ): a is T & { [k in K]: V } {
    return a[k] !== undefined && a[k] !== null;
  };
}

/**
 * https://github.com/robertmassaioli/ts-is-present/blob/master/src/index.ts
 * Returns a function that can be used to filter down objects
 * to the ones that have a specific value V under a key `k`.
 *
 * @example
 * ```ts
 * type File = { type: "image", imageUrl: string } | { type: "pdf", pdfUrl: string };
 * const files: File[] = [];
 *
 * const imageFiles = files.filter(file => file.type === "image");
 * files[0].type // In this case, TS will still treat it  as `"image" | "pdf"`
 *
 * const filesWithUrl = files.filter(hasValueAtKey("type", "image" as const));
 * files[0].type // TS will now know that this is "image"
 * files[0].imageUrl // TS will know this is present, because already it excluded the other union members.
 *
 * Note: the cast `as const` is necessary, otherwise TS will only know that type is a string.
 * ```
 *
 * See https://github.com/microsoft/TypeScript/issues/16069
 * why is that useful.
 */
export function hasValueAtKey<K extends string | number | symbol, V>(
  k: K,
  v: V,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function <T>(a: T & { [k in K]: any }): a is T & { [k in K]: V } {
    return a[k] === v;
  };
}
