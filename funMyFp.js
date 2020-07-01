export { zip, unzip, insert, insertMany }

// const array = [[10, 20, 30, 40], ["A", "B", "C", "D"], [1, 2, 3, 4]]
// zip(array) //==> [ [ 10, "A", 1 ], [ 20, "B", 2 ], [ 30, "C", 3 ], [ 40, "D", 4 ] ]
function zip(nestedArray) {
  return nestedArray[0].map((_, i) =>
    nestedArray.map(innerArray => innerArray[i])
  )
}

// const array = [[10, "A"], [20, "B"], [30, "C", 999], [40, "D"]]
// unzip(array) //==> [ [ 10, 20, 30, 40 ], [ "A", "B", "C", "D" ] ]

function unzip(array) {
  return array.reduce((acc, el) => {
    el.forEach((nestedEl, i) =>
      Array.isArray(acc[i]) ? acc[i].push(nestedEl) : acc.push([nestedEl])
    )
    return acc
  }, [])
}

// const items = [1, 2, 3, 4, 5]
// const result = insert(items, 1, 10) // [1, 10, 2, 3, 4, 5]
function insert(arr, index, newItem) {
  return [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index),
  ]
}

function insertMany(arr, index, ...newItems) {
  return [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted items
    ...newItems,
    // part of the array after the specified index
    ...arr.slice(index),
  ]
}
