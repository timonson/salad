type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;
type JsonObject = { [member: string]: JsonValue };
type JsonArray = JsonValue[];

export type BodyMethod =
  | "arrayBuffer"
  | "blob"
  | "formData"
  | "json"
  | "text"
  | "uint8Array";

export type FetchSimply = {
  (
    url: string,
    init?: RequestInit & { bodyMethod: "arrayBuffer" },
  ): Promise<ArrayBuffer | undefined>;
  (
    url: string,
    init?: RequestInit & { bodyMethod: "blob" },
  ): Promise<Blob | undefined>;
  (
    url: string,
    init?: RequestInit & { bodyMethod: "formData" },
  ): Promise<FormData | undefined>;
  (
    url: string,
    init?: RequestInit & { bodyMethod: "json" },
  ): Promise<JsonValue | undefined>;
  (
    url: string,
    init?: RequestInit & { bodyMethod: "text" },
  ): Promise<string | undefined>;
  (
    url: string,
    init?: RequestInit & { bodyMethod?: "uint8Array" },
  ): Promise<Uint8Array | undefined>;
};
