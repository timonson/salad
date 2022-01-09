/**
 * https://stackoverflow.com/questions/47914536/use-partial-in-nested-property-with-typescript/47914631
 */
export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type PartialExcept<T, K extends keyof T> =
  & RecursivePartial<T>
  & Pick<T, K>;

export type RecursiveRequired<T> = {
  [P in keyof T]-?: RecursiveRequired<T[P]>;
};

export type NotFunction<T> = T extends Function ? never : T;
export type NotArray<T> = T extends unknown[] ? never : T;
