export function convertCamelCaseToDash(str) {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, "$1-").toLowerCase();
}

export function convertDashToCamelCase(str) {
  return str.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
}

export function concatWithSpace(...strings) {
  return strings.join(" ");
}

export function replaceCharAt(str, index, replace) {
  return str.substring(0, index) + replace + str.substring(index + 1);
}

export function insert(str, index, newStr) {
  return str.slice(0, index) + newStr + str.slice(index);
}

export function searchAndInsert(baseString, pattern, str) {
  const index = baseString.search(pattern);
  return baseString.slice(0, index) + str + baseString.slice(index);
}

// check if a string has whitespaces:
export function hasWhiteSpace(str) {
  return /\s/g.test(str);
}

export function getTag(string, tag) {
  const regexp = new RegExp(`<${tag}\\b[^>]*>(.*?)<\/${tag}>`, "gs");
  return [...s1.matchAll(regexp)];
}

// Usage:
// utoa('✓ à la mode'); // 4pyTIMOgIGxhIG1vZGU=
// atou('4pyTIMOgIGxhIG1vZGU='); // "✓ à la mode"
// utoa('I \u2661 Unicode!'); // SSDimaEgVW5pY29kZSE=
// atou('SSDimaEgVW5pY29kZSE='); // "I ♡ Unicode!"

// ucs-2 string to base64 encoded ascii
export function convertStringToBase64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

// base64 encoded ascii to ucs-2 string
export function convertBase64ToString(str) {
  return decodeURIComponent(escape(window.atob(str)));
}

export function addPaddingToBase64url(base64url) {
  if (base64url.length % 4 === 2) return base64url + "==";
  if (base64url.length % 4 === 3) return base64url + "=";
  if (base64url.length % 4 === 1) {
    throw new TypeError("Illegal base64url string!");
  }
  return base64url;
}

export function convertBase64urlToBase64(base64url) {
  return addPaddingToBase64url(base64url).replace(/\-/g, "+").replace(
    /_/g,
    "/",
  );
}

export function convertBase64ToBase64url(base64) {
  return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
