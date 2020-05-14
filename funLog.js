export default log
export {
  slog,
  pp,
  logDir,
  logWithColor,
  addLogger,
  logLine,
  logTime,
  logTicker,
  logProps,
  logCssRulesText,
}

// slog({obj})
function slog(obj) {
  Object.entries(obj).forEach(([key, value]) => console.log(key + ":", value))
}

// pp("my obj:", obj)
function pp(...objects) {
  function printPrettyObject(object) {
    return typeof object !== "object"
      ? console.log(object)
      : Object.entries(object).forEach(([key, value]) =>
          globalThis.Deno
            ? console.log(`${key}: ${Deno.inspect(value)}`)
            : console.log(`${key}:`, value)
        )
  }
  return objects.forEach(printPrettyObject)
}

function logDir(obj) {
  console.dir(obj, { depth: 6 })
}

function logWithColor(severity = "NORMAL") {
  return logText => {
    if (severity === "NORMAL")
      console.log("\x1b[32m%s\x1b[0m", severity, logText)
    if (severity === "WARNING")
      console.log("\x1b[31m%s\x1b[0m", severity, logText)
    if (severity === "ERROR")
      console.log("\x1b[36m%s\x1b[0m", severity, logText)
  }
}

function addLogger(fn, logger = console.log) {
  return (...args) => {
    logger(`entering ${fn.name}: ${args}`)
    try {
      const valueToReturn = fn(...args)
      logger(`exiting ${fn.name}: ${valueToReturn}`)
      return valueToReturn
    } catch (thrownError) {
      logger(`exiting ${fn.name}: threw ${thrownError}`)
      throw thrownError
    }
  }
}

function logLine() {
  console.log("-".repeat(40))
}

function logTime(name, action) {
  let start = Date.now() // Current time in milliseconds
  action()
  console.log(name, "took", Date.now() - start, "ms")
}

function logTicker(time = 1000) {
  return setInterval(() => console.log("tick"), time)
}

// traverse the prototype chain and then get the 'own'
// property names of each of those objects:
function logProps(obj) {
  var p = []
  for (; obj != null; obj = Object.getPrototypeOf(obj)) {
    //var op = Object.getOwnPropertyNames(obj);
    var op = Reflect.ownKeys(obj)
    for (var i = 0; i < op.length; i++) if (!p.includes(op[i])) p.push(op[i])
  }
  console.log(p)
}

// Obtaining properties by enumerability/ownership:
const propertyRetriever = {
  getOwnEnumerables: function(obj) {
    return this._getPropertyNames(obj, true, false, this._enumerable)
    // Or could use for..in filtered with hasOwnProperty or just this: return Object.keys(obj);
  },
  getOwnNonenumerables: function(obj) {
    return this._getPropertyNames(obj, true, false, this._notEnumerable)
  },
  getOwnEnumerablesAndNonenumerables: function(obj) {
    return this._getPropertyNames(
      obj,
      true,
      false,
      this._enumerableAndNotEnumerable
    )
    // Or just use: return Object.getOwnPropertyNames(obj);
  },
  getPrototypeEnumerables: function(obj) {
    return this._getPropertyNames(obj, false, true, this._enumerable)
  },
  getPrototypeNonenumerables: function(obj) {
    return this._getPropertyNames(obj, false, true, this._notEnumerable)
  },
  getPrototypeEnumerablesAndNonenumerables: function(obj) {
    return this._getPropertyNames(
      obj,
      false,
      true,
      this._enumerableAndNotEnumerable
    )
  },
  getOwnAndPrototypeEnumerables: function(obj) {
    return this._getPropertyNames(obj, true, true, this._enumerable)
    // Or could use unfiltered for..in
  },
  getOwnAndPrototypeNonenumerables: function(obj) {
    return this._getPropertyNames(obj, true, true, this._notEnumerable)
  },
  getOwnAndPrototypeEnumerablesAndNonenumerables: function(obj) {
    return this._getPropertyNames(
      obj,
      true,
      true,
      this._enumerableAndNotEnumerable
    )
  },
  // Private static property checker callbacks
  _enumerable: function(obj, prop) {
    return obj.propertyIsEnumerable(prop)
  },
  _notEnumerable: function(obj, prop) {
    return !obj.propertyIsEnumerable(prop)
  },
  _enumerableAndNotEnumerable: function(obj, prop) {
    return true
  },
  // Inspired by http://stackoverflow.com/a/8024294/271577
  _getPropertyNames: function getAllPropertyNames(
    obj,
    iterateSelfBool,
    iteratePrototypeBool,
    includePropCb
  ) {
    var props = []

    do {
      if (iterateSelfBool) {
        Object.getOwnPropertyNames(obj).forEach(function(prop) {
          if (props.indexOf(prop) === -1 && includePropCb(obj, prop)) {
            props.push(prop)
          }
        })
      }
      if (!iteratePrototypeBool) {
        break
      }
      iterateSelfBool = true
    } while ((obj = Object.getPrototypeOf(obj)))

    return props
  },
}

function logCssRulesText() {
  setTimeout(
    () =>
      [...document.styleSheets[0].cssRules].forEach((rule, i) =>
        console.log(i, rule.cssText)
      ),
    300
  )
}

function log(...input) {
  console.log(...input)
}
log.slog
log.withColor = logWithColor
log.addLogger = addLogger
log.line = logLine
log.time = logTime
log.ticker = logTicker
log.dir = logDir
log.props = logProps
log.pretty = pp
log.propertyRetriever = propertyRetriever
