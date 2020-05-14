export { generateModuleUrl }

function generateModuleUrl(path) {
  return new URL(path, import.meta.url).pathname
}
