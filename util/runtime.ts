// @ts-ignore Don't worry about it
// deno-fmt-ignore
export const env = typeof Deno !== "undefined" ? "deno" : typeof process !== "undefined" ? "node" : typeof document !== "undefined" ? "browser" : "unknown";
