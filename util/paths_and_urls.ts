export function convertFileUrlToPath(url: URL) {
  return decodeURIComponent(
    url.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"),
  );
}

export function importMetaResolve(moduleUrl: string) {
  return (filePath: string) =>
    convertFileUrlToPath(new URL(filePath, moduleUrl));
}

/**
 * Adapted from https://nodejs.org/en/knowledge/file-system/security/introduction/
 * const resolveModule = importMetaResolve(import.meta.url);
 * const protectStatic = importMetaResolveAndProtect(resolveModule("../static/"));
 * const path = protectStatic("./foo.md");
 */
export function importMetaResolveAndProtect(rootDirectory: URL | string) {
  return (userSuppliedFilename: string) => {
    if (typeof rootDirectory === "string" && rootDirectory[0] !== "/") {
      throw new TypeError("The path of rootDirectory is not absolute.");
    }
    const rootDirectoryObj = rootDirectory instanceof URL
      ? rootDirectory
      : new URL("file://" + rootDirectory.trim());
    if ((rootDirectoryObj.pathname.slice(-1) !== "/")) {
      throw new TypeError("The path of rootDirectory is not a directory.");
    }
    if (userSuppliedFilename.indexOf("\0") !== -1) {
      throw new Error("Poison null byte in path.");
    }
    const path = convertFileUrlToPath(
      new URL(userSuppliedFilename, rootDirectoryObj),
    );
    if (!path.startsWith(convertFileUrlToPath(rootDirectoryObj))) {
      throw new Error("Unallowed path reversal in path.");
    }

    return path;
  };
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

export function removeExtension(fileName: string) {
  return fileName.split(".")[0];
}
