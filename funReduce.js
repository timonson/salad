function makeEntriesFromAdjacentElements(array) {
  return array.reduce((acc, el, i) => {
    i % 2 === 0 ? acc.push([el]) : acc[acc.length - 1].push(el)
    return acc
  }, [])
}

function stringifyAndJoinTwoAdjacentElements(array) {
  return array.reduce((acc, el, i) => {
    i % 2 === 0
      ? acc.push(el)
      : (acc[acc.length - 1] = acc[acc.length - 1] + el.toString())
    return acc
  }, [])
}

function addAverageOfAdjacentElements(array) {
  return array.reduce((acc, el, i, arr) => {
    if (i === 0) return [el]
    acc.push([arr[i - 1], (el + arr[i - 1]) / 2, el])
    return acc
  }, [])
}

function addThreeAveragesOfAdjacentElements(array) {
  return array.reduce((acc, el, i, arr) => {
    function getAverage(a, b) {
      return (a + b) / 2
    }
    if (i === 0) return []
    const firstAverage = getAverage(el, arr[i - 1])
    const secondAverage = getAverage(arr[i - 1], firstAverage)
    const thirdAverage = getAverage(firstAverage, el)
    acc.push([arr[i - 1], secondAverage, firstAverage, thirdAverage, el])
    return acc
  }, [])
}

export {
  makeEntriesFromAdjacentElements,
  stringifyAndJoinTwoAdjacentElements,
  addAverageOfAdjacentElements,
  addThreeAveragesOfAdjacentElements,
}
