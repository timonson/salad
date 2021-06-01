import { is2DArray } from "./array-functions.ts";

export function split(separator: string) {
  return (s: string): string[] => s.split(separator);
}

export function join(separator: string) {
  return (...items: string[] | [string[]]): string => {
    if (is2DArray(items)) {
      return join(separator)(...items[0]);
    }

    return (items).join(separator);
  };
}

export function surroundWith(beginning: string) {
  return (end: string) => (str: string) => beginning + str + end;
}

export function lower(input: string) {
  return input.toLowerCase();
}

export function upper(input: string) {
  return input.toUpperCase();
}

export function capitalize(input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}
export function trim(input: string) {
  return input.trim();
}

export function containsSubstring(substring: string) {
  return (candidate: string) => candidate.includes(substring);
}

export function isSubstringOf(text: string) {
  return (candidate: string) => containsSubstring(candidate)(text);
}

export function isString(input: unknown): input is string {
  return typeof input === "string";
}
