import { dirname, join, normalize } from "https://deno.land/std/path/mod.ts";

export function createFileUrl(
  { moduleUrl, reqUrl, root = "", entry = "index.html" }: {
    moduleUrl: string;
    reqUrl: string;
    root?: string;
    entry?: string;
  },
): string {
  const normalizedUrl = normalize(reqUrl);
  return normalizedUrl === "/"
    ? join(dirname(moduleUrl), "/", root, normalize(reqUrl), entry)
    : join(dirname(moduleUrl), "/", root, normalize(reqUrl));
}
