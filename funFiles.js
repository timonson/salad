export { getBasename, getDirname, getFileExtension }
function getBasename(path) {
  return path.replace(/.*\//, "")
}

function getDirname(path) {
  return path.match(/.*\//)[0].slice(0, -1) || "."
}

function getFileExtension(filename) {
  const i = filename.lastIndexOf(".")
  return i < 0 ? "" : filename.slice(i + 1)
}

console.log(getDirname("./aaaa/ddd/cccc.md"))
