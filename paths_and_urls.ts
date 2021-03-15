import type { ServerRequest } from "https://deno.land/std@0.88.0/http/server.ts";

export function importMetaResolve(
  modulePath: string,
  filePath: string,
): string {
  return new URL(filePath, modulePath).pathname;
}

export function createUrlFromRequest(req: ServerRequest, proto = "http") {
  return new URL(req.url, `${proto}://${req.headers.get("host")}`);
}
