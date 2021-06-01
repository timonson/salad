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

/**
  * https://github.com/microsoft/TypeScript/issues/1897
  */
export type JsonPrimitive = string | number | boolean | null;
export type JsonObject = { [member: string]: JsonValue };
export type JsonArray = JsonValue[];
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

export type NotFunction<T> = T extends Function ? never : T;
export type NotArray<T> = T extends unknown[] ? never : T;
