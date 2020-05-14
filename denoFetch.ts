export { runFetch }

function runFetch(
  url: string,
  fetchInit?: RequestInit,
  handleUnsuccessfulResponse?: (resp: Response) => any
) {
  return fetch(url, fetchInit)
    .then((res: Response) => {
      if (res.ok) {
        const contentType = res.headers.get("content-type")
        const contentLength = res.headers.get("content-length")
        console.log("contentType:", contentType)
        console.log("contentLength:", contentLength)
        if (res.status === 204 || contentLength == "0") return undefined
        if (contentType?.includes("application/json")) {
          return res.json()
        } else if (contentType && contentType.includes("text/")) {
          return res.text()
        } else {
          return res.arrayBuffer().then(p => new Uint8Array(p))
        }
      } else if (handleUnsuccessfulResponse) {
        return handleUnsuccessfulResponse(res)
      } else {
        throw Error(`${res.statusText}: ${res.status}`)
      }
    })
    .catch(err => {
      return Promise.reject(Error("Error in fetch API: " + err.message))
    })
}

// try {
// const result = await runFetch("http://0.0.0.0:8000")
// console.log(result)
// } catch (err) {
// console.log(err)
// }
