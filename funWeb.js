export {
  getSiblingThroughClass,
  getIndexOfElement,
  h,
  mount,
  createCss,
  loadCss,
  makeCanvasContext,
  createHtmlTemplate,
  cloneTemplateIntoParent,
  requestString,
  requestStringSync,
  convertCamelCaseToDash,
  convertDashToCamelCase,
  coupleSettersAndGettersToAttributes,
  handlePageVisibilityChange,
  makeElementEditableOnDblclick,
  getMousePositionRelativeToElement,
  surroundMouseWithElement,
  waitForEvent,
  findElementInEventPath,
}

function getSiblingThroughClass(element, className) {
  return [...element.parentNode.children].find(el =>
    el.classList.contains(className)
  )
}

function getIndexOfElement(element) {
  return [...element.parentNode.children].indexOf(element)
}

/*
 * // Example:
 *
 * function getRandomItem(array) {
 *   return array[Math.floor(array.length * Math.random())]
 * }
 *
 * function view(state) {
 *   return h("div", null, [
 *     h("h1", null, "Hello, vDOM!"),
 *     h(
 *       "ul",
 *       null,
 *       [getRandomItem(emojis), getRandomItem(emojis), getRandomItem(emojis)].map(
 *         item => h("li", null, item)
 *       )
 *     ),
 *     h("button", { onclick: `render(${state + 1})` }, "Click"),
 *     h("spam", { style: "margin:10px" }, `${state}`),
 *   ])
 * }
 *
 * const emojis = ["🥳", "👻", "🤕", "💋", "😧", "👣", "🥗", "🤗", "🤡"]
 * const render = mount(document.getElementById("app"), view)
 *
 * // setInterval(() => render(0), 1000)
 * render(0)
 */

function h(type, attributes, children) {
  const element = document.createElement(type)
  for (let key in attributes) {
    if (key in element) {
      element[key] = attributes[key]
    } else
      attributes[key]
        ? element.setAttribute(key, attributes[key])
        : element.removeAttribute(key)
  }
  if (typeof children === "string")
    element.appendChild(document.createTextNode(children))
  else if (children)
    Array.isArray(children)
      ? children.forEach(child => element.appendChild(child))
      : element.appendChild(children)

  return element
}

function mount(node, view) {
  let currentApp
  return function renderView(state) {
    const evaluatedView = view(state)
    currentApp
      ? node.replaceChild(evaluatedView, currentApp)
      : node.appendChild(evaluatedView)
    return (currentApp = evaluatedView)
  }
}

function createCss(cssString) {
  const style = document.createElement("style")
  style.type = "text/css"
  style.innerHTML = cssString
  document.getElementsByTagName("head")[0].appendChild(style)
}

function loadCss(path, target = document.head) {
  return new Promise(function(resolve, reject) {
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = path
    target.appendChild(link)
    link.onload = () => resolve("CSS has loaded!")
  })
}

// addCssRules(document.querySelector("style"), `h1 { background-color:blue; }`)
function addCssRules(styleElement, ruleSet) {
  return styleElement.sheet.insertRule(
    ruleSet,
    styleElement.sheet.cssRules.length
  )
}

function makeCanvasContext(canvas, sizeX, sizeY, ctxType = "2d") {
  if (!canvas.getContext)
    return console.error(`Could not create ctx on element ${canvas}!`)
  if (sizeX) canvas.width = sizeX
  if (sizeY) canvas.height = sizeY
  const ctx = canvas.getContext(ctxType)
  ctx.width = canvas.width
  ctx.height = canvas.height
  return ctx
}

function requestString(filePath) {
  return fetch(filePath).then(response => response.text())
}

function requestStringSync(filePath) {
  var request = new XMLHttpRequest()
  request.open("GET", filePath, false) // `false` makes the request synchronous
  request.send(null)
  return request.status === 200 ? request.responseText : null
}

/**
 * @param {String} HTML representing a single element
 * @return {HTMLTemplateElement}
 */
function createHtmlTemplate(html) {
  var template = document.createElement("template")
  template.innerHTML = html.trim() // Never return a text node of whitespace as the result
  return template
}

function cloneTemplateIntoParent(template, parent) {
  parent.append(template.content.cloneNode(true))
  return template
}

function convertCamelCaseToDash(str) {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, "$1-").toLowerCase()
}

function convertDashToCamelCase(str) {
  return str.replace(/-([a-z])/g, function(g) {
    return g[1].toUpperCase()
  })
}

function coupleSettersAndGettersToAttributes(thisObj, camelCasePropsAsStrings) {
  function camelCaseToDash(str) {
    return str.replace(/([a-zA-Z])(?=[A-Z])/g, "$1-").toLowerCase()
  }
  for (const propertyName of camelCasePropsAsStrings) {
    Object.defineProperty(thisObj, propertyName, {
      get: function() {
        return this.getAttribute(camelCaseToDash(propertyName))
      },
      set: function(value) {
        return value
          ? this.setAttribute(camelCaseToDash(propertyName), value)
          : this.removeAttribute(camelCaseToDash(propertyName))
      },
    })
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
function handlePageVisibilityChange(onHidden, onVisible) {
  // Set the name of the hidden property and the change event for visibility
  var hidden, visibilityChange
  if (typeof document.hidden !== "undefined") {
    // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden"
    visibilityChange = "visibilitychange"
  } else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden"
    visibilityChange = "msvisibilitychange"
  } else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden"
    visibilityChange = "webkitvisibilitychange"
  }
  var videoElement = document.getElementById("videoElement")
  // If the page is hidden, pause the video;
  // if the page is shown, play the video
  function handleVisibilityChange() {
    if (document[hidden]) {
      onHidden()
    } else {
      onVisible()
    }
  }
  // Warn if the browser doesn't support addEventListener or the Page Visibility API
  if (typeof document.addEventListener === "undefined" || hidden === undefined)
    console.log(
      "This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API."
    )
  // Handle page visibility change
  else
    document.addEventListener(visibilityChange, handleVisibilityChange, false)

  return [hidden, visibilityChange]
}

function makeElementEditableOnDblclick(element) {
  element.ondblclick = event => {
    element.contentEditable = "true"
    element.blur()
    element.focus()
    document.execCommand("selectAll", false, undefined)
    event.preventDefault()
    event.stopPropagation()
  }
  element.onclick = event => (event.target.contentEditable = "false")
}

function getMousePositionRelativeToElement(event) {
  const rect = event.target.getBoundingClientRect()
  return [event.clientX - rect.left, event.clientY - rect.top]
}
function surroundMouseWithElement(pageX, pageY, element) {
  return [
    pageX -
      (pageXOffset + element.offsetParent.getBoundingClientRect().left) -
      element.offsetWidth / 2,
    pageY -
      (pageYOffset + element.offsetParent.getBoundingClientRect().top) -
      element.offsetHeight / 2,
  ]
}

/**
 * Listens for one event and resolves with this event object after it was fired.
 *
 * @example
 * setTimeout(() => el.fireDone());
 * await waitForEvent(el, 'done');
 * expect(el.done).to.be.true;
 *
 * @param {EventTarget} eventTarget Target of the event, usually an Element
 * @param {string} eventName Name of the event
 * @returns {Promise<CustomEvent>} Promise to await until the event has been fired
 */
function waitForEvent(eventTarget, eventName) {
  return new Promise(resolve => {
    function listener(event) {
      resolve(event)
      eventTarget.removeEventListener(eventName, listener)
    }
    eventTarget.addEventListener(eventName, listener)
  })
}

function reachedScrollingYEnd(element) {
  return (
    Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) <=
    3.0 // buffer
  )
}

function reachedScrollingXEnd(element) {
  return (
    Math.abs(element.scrollWidth - element.scrollLeft - element.clientWidth) <=
    3.0
  )
}

function findElementInEventPath(event, selector) {
  function predicate(eventTarget, selector) {
    if (eventTarget instanceof HTMLElement) return eventTarget.matches(selector)
    else return false
  }
  const foundElement = event
    .composedPath()
    .find(eventTarget => predicate(eventTarget, selector))
  return foundElement ? foundElement : null
}