export function getBasename(path) {
  return path.replace(/.*\//, "")
}

export function getDirname(path) {
  return path.match(/.*\//)?.[0].slice(0, -1) || "."
}

export function getFileExtension(filename) {
  const i = filename.lastIndexOf(".")
  return i < 0 ? "" : filename.slice(i + 1)
}
