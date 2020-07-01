export {
  convertCamelCaseToDash,
  convertDashToCamelCase,
  concatWithSpace,
  replaceCharAt,
  searchAndPaste,
  getWordCnt,
  highlight,
  convertStringToBase64,
  convertBase64ToString,
  convertBase64urlToBase64,
  convertBase64ToBase64url,
  addPaddingToBase64url,
  hasWhiteSpace,
  reverseString,
}


function convertCamelCaseToDash(str) {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, "$1-").toLowerCase()
}

function convertDashToCamelCase(str) {
  return str.replace(/-([a-z])/g, function(g) {
    return g[1].toUpperCase()
  })
}

function concatWithSpace(...strings) {
  return strings.join(" ")
}
function replaceCharAt(str, index, replace) {
  return str.substring(0, index) + replace + str.substring(index + 1)
}

function searchAndPaste(baseString, pattern, str) {
  const index = baseString.search(pattern)
  return baseString.slice(0, index) + str + baseString.slice(index)
}

// The function returns an array with nested key/value pairs, where the unique key
// represents a word and the value the amount of the word's appearances:

// Example:
// let text = "Hello World, hello Sun!"
// const words = getWordCnt2(text) // [ [ "Hello", 2 ], [ "World", 1 ], [ "Sun", 1 ] ]
// const strings = words.map(
// ([key, value]) => `The word '${key}' appears ${value} time(s)`
// )

function getWordCnt(text) {
  return Object.entries(
    text
      .toLowerCase()
      .split(/\W+/)
      .filter(line => !!line)
      .reduce((acc, el) => {
        acc[el] = acc[el] + 1 || 1
        return acc
      }, {})
  )
}

// Alternative:
// function getWordCnt2(text) {
// return Object.entries(
// text
// .toLowerCase()
// .match(/\w+/g)
// .reduce((acc, el) => {
// acc[el] = acc[el] + 1 || 1
// return acc
// }, {})
// )
// }

// include text between different patterns:
// https://stackoverflow.com/questions/17280497/simple-syntax-highlighting-using-javascript
// highlight('foo *bar"baz"qux* "foobar" qux') // "foo <span class="b">*bar"baz"qux*</span> <span class="a">"foobar"</span> qux"
function highlight(text) {
  return text.replace(/([*"]).*?\1|<[^<>]*>/g, function (match, p1) {
    // 'match' contains the whole match
    // 'ch' contains the first capture-group
    if (p1 === '"') {
      return '<span class="a">' + match + "</span>"
    } else if (p1 === "*") {
      return '<span class="b">' + match + "</span>"
    } else {
      return match
    }
  })
}

function getTag(string, tag) {
  const regexp = new RegExp(`<${tag}\\b[^>]*>(.*?)<\/${tag}>`, "gs")
  return [...s1.matchAll(regexp)]
}

// Usage:
// utoa('✓ à la mode'); // 4pyTIMOgIGxhIG1vZGU=
// atou('4pyTIMOgIGxhIG1vZGU='); // "✓ à la mode"
// utoa('I \u2661 Unicode!'); // SSDimaEgVW5pY29kZSE=
// atou('SSDimaEgVW5pY29kZSE='); // "I ♡ Unicode!"

// ucs-2 string to base64 encoded ascii
function convertStringToBase64(str) {
  return window.btoa(unescape(encodeURIComponent(str)))
}
// base64 encoded ascii to ucs-2 string
function convertBase64ToString(str) {
  return decodeURIComponent(escape(window.atob(str)))
}

function addPaddingToBase64url(base64url) {
  if (base64url.length % 4 === 2) return base64url + "=="
  if (base64url.length % 4 === 3) return base64url + "="
  if (base64url.length % 4 === 1)
    throw new TypeError("Illegal base64url string!")
  return base64url
}
function convertBase64urlToBase64(base64url) {
  return addPaddingToBase64url(base64url).replace(/\-/g, "+").replace(/_/g, "/")
}
function convertBase64ToBase64url(base64) {
  return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}

// check if a string has whitespaces:
function hasWhiteSpace(str) {
  return /\s/g.test(str)
}

function reverseString(input) {
  if (!input) return ""
  return reverseString(input.substr(1)) + input.charAt(0)
}
