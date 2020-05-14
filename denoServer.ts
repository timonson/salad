import { serve } from "https://deno.land/std/http/server.ts"
export async function runServer(
  resBody: string,
  headerPairs: string[][] = [[]],
  status=200,
  processRequestBody:(reqBody: Request) => string
) {
  const s = serve("0.0.0.0:8000")
  const headers = new Headers()
  headerPairs.forEach(([key, value]) => key && headers.set(key, value))
  for await (const req of s) {
    const reqBody = JSON.parse(new TextDecoder().decode(await Deno.readAll(req.body)))
    console.log("reqBody:",reqBody)
    req.respond({
      body: new TextEncoder().encode(
        processRequestBody ? processRequestBody(reqBody) : resBody
      ),
      headers,
      status,
    })
  }
}

// runServer(JSON.stringify({ a: 10 }), [["content-type", "application/json"]])
