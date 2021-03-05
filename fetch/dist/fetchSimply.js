class FetchSimplyError1 extends Error {
  constructor(message, status, statusText) {
    super(message);
    this.status = status;
    this.statusText = statusText;
  }
}
const fetchSimply1 = async (url, init) => {
  const res = await fetch(url, init);
  if (!res.ok) {
    throw new FetchSimplyError1(
      `${res.status} '${res.statusText}' received instead of 200-299 range`,
      res.status,
      res.statusText,
    );
  }
  const contentType = res.headers.get("content-type");
  const contentLength = res.headers.get("content-length");
  if (res.status === 204 || contentLength === "0") return undefined;
  switch (init?.bodyMethod) {
    case "arrayBuffer":
      return await res.arrayBuffer();
      break;
    case "blob":
      return await res.blob();
      break;
    case "formData":
      return await res.formData();
      break;
    case "json":
      return await res.json();
      break;
    case "text":
      return await res.text();
      break;
    case "uint8Array":
    default:
      return new Uint8Array(await res.arrayBuffer());
  }
};

export { fetchSimply1 as fetchSimply };
