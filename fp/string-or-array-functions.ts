import { isString } from "./string-functions.ts";
import { isFunction } from "./higher-order-functions.ts";
import { isArray } from "./array-functions.ts";

type StringOrArray = string | unknown[];
type Predicate = (x: unknown) => boolean;
type StringOrArrayReturn = {
  <I>(input: I[]): I[];
  <I>(input: string): string;
};
type AReturn<T> = {
  <I>(input: T extends I ? I[] : never): I[];
  <I>(input: string): string;
};

export function nth(index: number) {
  return <I extends StringOrArray>(input: I): I[number] => input[index];
}

export function first<P extends Predicate>(
  predicateOrInput: P,
): <I extends StringOrArray>(input: I) => I[number] | null;
export function first<I extends StringOrArray>(predicateOrInput: I): I[number];
export function first<I extends StringOrArray | Predicate>(
  predicateOrInput: I,
) {
  if (isFunction(predicateOrInput)) {
    return <I extends StringOrArray>(input: I) => {
      for (let i = 0; i < input.length; i++) {
        const item = input[i];

        if (predicateOrInput(item)) {
          return item;
        }
      }
      return null;
    };
  } else {
    return (predicateOrInput as Exclude<I, Predicate>)[0];
  }
}

export function second<I extends StringOrArray>(input: I): I[number] {
  return input[1];
}

export function last<P extends Predicate>(
  predicateOrInput: P,
): <I extends StringOrArray>(input: I) => I[number] | null;
export function last<I extends StringOrArray>(predicateOrInput: I): I[number];
export function last<I extends StringOrArray | Predicate>(
  predicateOrInput: I,
) {
  if (isFunction(predicateOrInput)) {
    return <I extends StringOrArray>(input: I) => {
      for (let i = input.length - 1; i >= 0; i--) {
        const item = input[i];

        if (predicateOrInput(item)) {
          return item;
        }
      }

      return null;
    };
  } else {
    return (predicateOrInput as Exclude<I, Predicate>)[0];
  }
}

export function take(n: number) {
  return <I extends StringOrArray>(input: I): I => input.slice(0, n) as I;
}

export function takeFrom<I extends StringOrArray>(input: I) {
  return (n: number): I => take(n)(input);
}

export function takeLast(n: number) {
  return <I extends StringOrArray>(input: I): I =>
    input.slice(Math.max(input.length - n, 0)) as I;
}

export function takeLastFrom<I extends StringOrArray>(input: I) {
  return (n: number): I => takeLast(n)(input);
}

export function takeWhile(predicate: Predicate) {
  return <I extends StringOrArray>(input: I) => {
    const res: I[number][] = [];
    for (let i = 0; i < input.length; i++) {
      const item = input[i];
      if (!predicate(item)) {
        return res;
      }

      res.push(item);
    }

    return res;
  };
}

export function drop(n: number) {
  return <I extends StringOrArray>(input: I): I => input.slice(n) as I;
}

export function dropFrom<I extends StringOrArray>(input: I) {
  return (n: number): I => drop(n)(input);
}

export function dropLast(n: number): StringOrArrayReturn {
  return <I>(input: string | I[]): any => input.slice(0, -n);
}

export function dropLastFrom(input: string): (n: number) => string;
export function dropLastFrom<I>(input: I[]): (n: number) => I[];
export function dropLastFrom<I>(input: string | I[]): any {
  return (n: number) =>
    isString(input) ? dropLast(n)(input) : dropLast(n)(input);
}

export function dropWhile(predicate: Predicate): StringOrArrayReturn {
  return <I>(input: string | I[]): any => {
    let dropped = 0;
    while (dropped < input.length) {
      const item = input[dropped];
      if (predicate(item)) {
        dropped++;
      } else {
        break;
      }
    }
    return input.slice(dropped);
  };
}

export function append<T>(item: T): AReturn<T> {
  return <I>(input: string | I[]): any =>
    isString(input) ? input + item : [...input, item];
}

export function appendTo(input: string): (item: string) => string;
export function appendTo<I>(input: I[]): (item: I) => I[];
export function appendTo<I>(input: string | I[]) {
  return (item: string | I) => (
    isString(item) ? input + item : [...input, item]
  );
}

export function prepend<T>(item: T): AReturn<T> {
  return <I>(input: string | I[]): any =>
    isString(input) ? item + input : [item, ...input];
}

export function prependTo(input: string): (item: string) => string;
export function prependTo<I>(input: I[]): (item: I) => I[];
export function prependTo<I>(input: string | I[]) {
  return (item: string | I) =>
    isString(input) ? item + input : [item, ...input];
}

export function concat<R>(...items: string[] | [string[]]): string;
export function concat<R = unknown[]>(...items: unknown[][]): R;
export function concat<R>(...items: string[] | unknown[][]): any {
  if (items.length === 1) {
    const firstItem = items[0];

    if (isArray(firstItem)) {
      // 2D array with a single item
      if (firstItem.length === 1) {
        return firstItem[0];
      } else {
        return concat(...firstItem as any);
      }
    }
  }

  return isString(items[0])
    ? (items as string[]).reduce(
      (acc, s) => acc.concat(s),
      "",
    )
    : (items as any[][]).reduce(
      (acc, s) => acc.concat(s),
      [],
    );
}

export function isEmpty(input: StringOrArray): boolean {
  return input.length === 0;
}

export function isNotEmpty(input: StringOrArray): boolean {
  return input.length > 0;
}

export function isOfLength(length: number) {
  return (input: StringOrArray): boolean => input.length === length;
}

export const isOfLengthOne = isOfLength(1);

export function isShorterThan(length: number) {
  return (input: StringOrArray): boolean => input.length < length;
}

export function isLongerThan(length: number) {
  return (input: StringOrArray): boolean => input.length > length;
}

export function length(input: StringOrArray): number {
  return input.length;
}

export function reverse(input: string): string[];
export function reverse<I extends unknown>(input: I[]): I[];
export function reverse<I extends unknown>(input: string | I[]): any {
  const inputLength = input.length;
  const reversedArray = Array(inputLength);

  for (let i = 0; i < inputLength; i++) {
    reversedArray[i] = input[inputLength - i - 1];
  }

  return reversedArray;
}
