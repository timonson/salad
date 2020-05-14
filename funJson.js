export { stringifyKeysInOrder }

function stringifyKeysInOrder(data) {
  function recursivelyOrderKeys(unordered) {
    // If it's an array - recursively order any
    // dictionary items within the array
    if (Array.isArray(unordered)) {
      unordered.forEach(function(item, index) {
        unordered[index] = recursivelyOrderKeys(item)
      })
      return unordered
    }
    // If it's an object - let's order the keys
    if (typeof unordered === "object") {
      const ordered = {}
      Object.keys(unordered)
        .sort()
        .forEach(function(key) {
          ordered[key] = recursivelyOrderKeys(unordered[key])
        })
      return ordered
    }
    return unordered
  }
  return JSON.stringify(recursivelyOrderKeys(data), null, 2)
}
