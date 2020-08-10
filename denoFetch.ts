export { runFetch };

function runFetch(url: string, fetchInit?: RequestInit) {
  return fetch(url, fetchInit).then((res: Response) => {
    if (!res.ok)
      return Promise.reject(
        new Deno.errors.Http(
          `${res.status} '${res.statusText}' received instead of 200-299 range`
        )
      );
    const contentType = res.headers.get("content-type");
    const contentLength = res.headers.get("content-length");
    if (res.status === 204 || contentLength === "0") return undefined;
    if (contentType?.includes("application/json")) {
      return res.json();
    } else if (contentType?.includes("text/")) {
      return res.text();
    } else {
      return res.arrayBuffer().then(p => new Uint8Array(p));
    }
  });
}
