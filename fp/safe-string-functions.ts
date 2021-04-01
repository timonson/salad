import { None, Option, some } from "./option.ts";

export function safeMatch(regExp: RegExp) {
  return (s: string): Option<string> => {
    const r = s.match(regExp);
    return r === null ? None : some(r[0]);
  };
}
