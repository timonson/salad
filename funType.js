export { makeArray, getTrueType, checkTypes, isNumber, isPromise, isNull, get }

// getArrayFromValuesAndArrays(1, 'string', [3, 4, 5])
function makeArray(...arg) {
  return [].concat(...arg)
}

// https://gomakethings.com/true-type-checking-with-vanilla-js/
// toString() can be used with every object and allows you to get its class
// console.log(getTrueType(null))
function getTrueType(arg) {
  return Object.prototype.toString
    .call(arg)
    .slice(8, -1)
    .toLowerCase()
}

// function foo(a, b, c) {
// checkTypes(arguments, ["string", "number", "array"])
// return "foo"
// }
// console.log(foo("a", 1, [2])) //=> foo
function checkTypes(args, types) {
  args = [].slice.call(args)
  for (var i = 0; i < types.length; ++i) {
    const typeReceived = getTrueType(args[i])
    if (typeReceived != types[i]) {
      throw new TypeError(
        `param ${i} must be of type ${types[i]}, but received type ${typeReceived}!`
      )
    }
  }
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

function isPromise(promise) {
  return typeof promise.then === "function"
}

function isNull(value) {
  return !value && typeof value === "object"
}

function isUndefined(value) {
  return typeof value === "undefined"
}

function get(object) {
  return (props = "") =>
    props.split(".").reduce((acc, prop) => {
      return acc && !isNull(acc[prop]) && !isUndefined(acc[prop])
        ? acc[prop]
        : null
    }, object)
}
