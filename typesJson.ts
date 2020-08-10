export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;
export type JsonObject = { [member: string]: JsonValue };
export type JsonArray = JsonValue[];

export function isJsonStringifyable(input: unknown): input is JsonValue {
  return (
    Array.isArray(input) ||
    isObject(input) ||
    input === null ||
    typeof input === "number" ||
    typeof input === "string" ||
    typeof input === "boolean"
  );
}
