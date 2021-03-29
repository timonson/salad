import { isRested2dArray } from "./boolean-functions.ts";

export function split(separator: string) {
  return (s: string): string[] => s.split(separator);
}

export function join(separator: string) {
  return (...items: string[] | [string[]]): string => {
    if (isRested2dArray(items)) {
      return join(separator)(...items[0]);
    }

    return (items).join(separator);
  };
}
