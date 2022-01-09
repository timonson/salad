export function importMetaResolve(
  filePath: string,
  moduleUrl: string,
): string {
  return new URL(filePath, moduleUrl).pathname;
}

/**
 * https://nodejs.org/en/knowledge/file-system/security/introduction/
 */
export function importMetaResolveAndProtect(
  userSuppliedFilename: string,
  moduleUrl: string,
  rootSuffix?: string,
) {
  if (
    typeof rootSuffix === "string" &&
    (rootSuffix.trim().slice(-1) !== "/" || rootSuffix.trim()[0] === "/")
  ) {
    throw new TypeError("Invalid 'rootSuffix'.");
  }
  if (userSuppliedFilename.indexOf("\0") !== -1) {
    throw new Error("Evil character in path.");
  }
  const rootDirectoryObj = new URL(rootSuffix ? rootSuffix : "./", moduleUrl);
  const path = new URL(userSuppliedFilename, rootDirectoryObj).pathname;
  if (!path.startsWith(rootDirectoryObj.pathname)) {
    throw new Error("Unallowed path reversal in path.");
  }

  return path;
}

export function createUrlFromRequest(req: Request, proto = "http") {
  return new URL(req.url, `${proto}://${req.headers.get("host")}`);
}

export function getFilename(filePath: string) {
  return filePath.split("/").pop();
}

export function getExtension(fileName: string) {
  return fileName.split(".").pop();
}

export function getDirname(path: string) {
  return path.slice(0, path.lastIndexOf("/"));
}
