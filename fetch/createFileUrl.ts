import { dirname, join } from "https://deno.land/std/path/mod.ts";

export function createFileUrl(
  { moduleUrl, reqUrl, root = "", entry = "index.html" }: {
    moduleUrl: string;
    reqUrl: string;
    root?: string;
    entry?: string;
  },
): string {
  return reqUrl === "/"
    ? join(dirname(moduleUrl), "/", root, reqUrl, entry)
    : join(dirname(moduleUrl), "/", root, reqUrl);
}
