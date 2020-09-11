import {
  serve,
  serveTLS,
  ServerRequest,
  Response,
  HTTPOptions,
  HTTPSOptions,
} from "https://deno.land/std/http/server.ts";
import { extname } from "https://deno.land/std/path/mod.ts";
import { exists } from "https://deno.land/std/fs/mod.ts";

type Opts = Record<string, unknown>;
type RequestHandlers = {
  handleGetRequest?: (req: ServerRequest, opts: Opts) => Promise<Response>;
  handlePostRequest?: (req: ServerRequest, opts: Opts) => Promise<Response>;
};

async function runServer(
  addr: string | HTTPOptions | HTTPSOptions,
  callbacks: RequestHandlers = {},
  opts: Opts = {}
) {
  console.log(`Listening to ${addr}`);
  if (Opts.isSecure) {
    for await (const req of serveTLS(addr)) {
      req.respond(await makeResponseInput(req, callbacks, opts));
    }
  } else {
    for await (const req of serve(addr)) {
      req.respond(await makeResponseInput(req, callbacks, opts));
    }
  }
}

async function makeResponseInput(
  req: ServerRequest,
  callbacks: RequestHandlers,
  opts: Opts
): Promise<Response> {
  switch (req.method) {
    case "GET":
      return callbacks.handleGetRequest
        ? getContentTypeFromUrl(
            req.url.slice(-1) === "/" ? "./index.html" : "." + req.url
          )
          ? await handleFileRequest(req)
          : await callbacks.handleGetRequest(req, opts)
        : await handleFileRequest(req);
      break;
    case "POST":
      return callbacks.handlePostRequest
        ? await callbacks.handlePostRequest(req, opts)
        : { status: 200 };
      break;
    default:
      return { status: 200 };
  }
}

async function handleFileRequest(req: ServerRequest): Promise<Response> {
  // if url is a directory search for index file
  const pathname = req.url.slice(-1) === "/" ? "./index.html" : "." + req.url;
  if (!(await exists(pathname))) return { status: 404 };
  const headers = new Headers();
  headers.set("Content-type", getContentTypeFromUrl(pathname) || "text/plain");
  return Deno.readFile(pathname)
    .then(
      (data: Uint8Array): Response => ({
        body: data,
        headers: headers,
        status: 200,
      })
    )
    .catch((err) => ({ status: 404 }));
}

function getContentTypeFromUrl(pathname: string): string | null {
  const fileTypes = new Map([
    [".ico", "image/x-icon"],
    [".html", "text/html"],
    [".js", "text/javascript"],
    [".json", "application/json"],
    [".css", "text/css"],
    [".png", "image/png"],
    [".jpg", "image/jpeg"],
    [".wav", "audio/wav"],
    [".mp3", "audio/mpeg"],
    [".svg", "image/svg+xml"],
    [".pdf", "application/pdf"],
    [".doc", "application/msword"],
  ]);
  return fileTypes.get(extname(pathname)) || null;
}

export {
  runServer,
  ServerRequest,
  Response,
  Opts,
  handleFileRequest,
  getContentTypeFromUrl,
};
