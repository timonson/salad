export async function mkdirAndWrite(
  pathOrUrlObj: string | URL,
  data: Uint8Array | string
): Promise<Uint8Array | string> {
  const path =
    pathOrUrlObj instanceof URL ? pathOrUrlObj.pathname : pathOrUrlObj
  if (typeof path !== "string") throw TypeError("path is not a string")
  return await Deno.lstat(path)
    .catch(() =>
      Deno.mkdir(path.match(/.*\//)?.[0].slice(0, -1) || ".", {
        recursive: true,
      })
    )
    .then(() => {
      Deno.writeFile(
        path,
        typeof data === "string" ? new TextEncoder().encode(data) : data
      )
      return data
    })
}
