import { dirname, join } from "https://deno.land/std/path/mod.ts";
import { ServerRequest } from "https://deno.land/std/http/server.ts";

export function createStaticFilePath(
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

export function importMetaResolve(
  modulePath: string,
  filePath: string,
): string {
  return new URL(filePath, modulePath).pathname;
}

function createUrlObj(req: ServerRequest, proto = "http") {
  return new URL(req.url, `${proto}://${req.headers.get("host")}`);
}
