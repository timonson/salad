export function insert(arr, index, ...newItems) {
  return [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted items
    ...newItems,
    // part of the array after the specified index
    ...arr.slice(index),
  ];
}

export function makeEntriesFromAdjacentElements(array) {
  return array.reduce((acc, el, i) => {
    i % 2 === 0 ? acc.push([el]) : acc[acc.length - 1].push(el);
    return acc;
  }, []);
}

export function stringifyAndJoinTwoAdjacentElements(array) {
  return array.reduce((acc, el, i) => {
    i % 2 === 0
      ? acc.push(el)
      : (acc[acc.length - 1] = acc[acc.length - 1] + el.toString());
    return acc;
  }, []);
}

// console.log(addAverageOfAdjacentElements([10, 30, 50, 70, 200]));
export function addAverageOfAdjacentElements(array) {
  return array.reduce((acc, el, i, arr) => {
    if (i === 0) return acc;
    acc.push([arr[i - 1], (el + arr[i - 1]) / 2, el]);
    return acc;
  }, []);
}

export function addThreeAveragesOfAdjacentElements(array) {
  function getAverage(a, b) {
    return (a + b) / 2;
  }
  return array.reduce((acc, el, i, arr) => {
    if (i === 0) return acc;
    const firstAverage = getAverage(el, arr[i - 1]);
    const secondAverage = getAverage(arr[i - 1], firstAverage);
    const thirdAverage = getAverage(firstAverage, el);
    acc.push([arr[i - 1], secondAverage, firstAverage, thirdAverage, el]);
    return acc;
  }, []);
}
