export {
  concatTypedArrays,
  concatBuffers,
  concatBytes,
  areTypedArraysEqual,
  convertUint8ArrayToHex,
  convertHexToUint8Array,
  convertBase64ToUint8Array,
  convertUint8ArrayToBase64,
}

// https://stackoverflow.com/questions/33702838/how-to-append-bytes-multi-bytes-and-buffer-to-arraybuffer-in-javascript

// You can create a new TypedArray with a new ArrayBuffer, but you can't change the
// size of an existing buffer
function concatTypedArrays(a, b) {
  // a, b TypedArray of same type
  const c = new a.constructor(a.length + b.length)
  c.set(a, 0)
  c.set(b, a.length)
  return c
}

// If you want to use different types, go via Uint8Array as the smallest unit is a byte, i.e.
function concatBuffers(a, b) {
  return concatTypedArrays(
    new Uint8Array(a.buffer || a),
    new Uint8Array(b.buffer || b)
  ).buffer
}

// This means .length will work as expected, you could now convert this to your typed
// array of choice (make sure it's a type that would accept the .byteLength of the
// buffer though)

// From here, you could now implement any method you like for concatenating your data, e.g.
function concatBytes(ui8a, byte) {
  var b = new Uint8Array(1)
  b[0] = byte
  return concatTypedArrays(ui8a, b)
}

// compare TypedArrays
function areTypedArraysEqual(a, b) {
  if (a.byteLength !== b.byteLength) return false
  return a.every((el, i) => el === b[i])
}

function convertUint8ArrayToHex(uint8Array) {
  return uint8Array.reduce(
    (acc, el) => acc + el.toString(16).padStart(2, "0"),
    ""
  )
}

function convertHexToUint8Array(hex) {
  if (hex.length % 2 || !/^[0-9a-fA-F]+$/.test(hex))
    throw new TypeError("Invalid hex string.")
  return Uint8Array.from(hex.match(/.{2}/g).map(el => parseInt(el, 16)))
}

function convertBase64ToUint8Array(data) {
  var binString = window.atob(data)
  var size = binString.length
  var bytes = new Uint8Array(size)
  for (var i = 0; i < size; i++) {
    bytes[i] = binString.charCodeAt(i)
  }
  return bytes
}

// credit: https://gist.github.com/enepomnyaschih/72c423f727d395eeaa09697058238727
function convertUint8ArrayToBase64(bytes: Uint8Array): string {
  const base64abc = (() => {
    let abc = [],
      A = "A".charCodeAt(0),
      a = "a".charCodeAt(0),
      n = "0".charCodeAt(0)
    for (let i = 0; i < 26; ++i) {
      abc.push(String.fromCharCode(A + i))
    }
    for (let i = 0; i < 26; ++i) {
      abc.push(String.fromCharCode(a + i))
    }
    for (let i = 0; i < 10; ++i) {
      abc.push(String.fromCharCode(n + i))
    }
    abc.push("+")
    abc.push("/")
    return abc
  })()

  let result = "",
    i,
    l = bytes.length
  for (i = 2; i < l; i += 3) {
    result += base64abc[bytes[i - 2] >> 2]
    result += base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)]
    result += base64abc[((bytes[i - 1] & 0x0f) << 2) | (bytes[i] >> 6)]
    result += base64abc[bytes[i] & 0x3f]
  }
  if (i === l + 1) {
    // 1 octet missing
    result += base64abc[bytes[i - 2] >> 2]
    result += base64abc[(bytes[i - 2] & 0x03) << 4]
    result += "=="
  }
  if (i === l) {
    // 2 octets missing
    result += base64abc[bytes[i - 2] >> 2]
    result += base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)]
    result += base64abc[(bytes[i - 1] & 0x0f) << 2]
    result += "="
  }
  return result
}
