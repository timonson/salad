import { None, some } from "./option.ts";

export function safeProperty<O extends {}>(key: keyof O) {
  return (obj: O) => obj.hasOwnProperty(key) ? some(obj[key]) : None;
}

export function safePropertyOf<O extends {}>(obj: O) {
  return (key: keyof O) => safeProperty(key)(obj);
}
