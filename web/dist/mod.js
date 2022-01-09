function changeInlineStyles(element, [property, value]) {
    if (property.slice(0, 2) === "--" && element.style.getPropertyValue(property) !== value) {
        element.style.setProperty(property, value);
    } else if (element.style[property] !== value) {
        element.style[property] = value;
    }
}
function changeCss(styles, ...elements) {
    Object.entries(styles).forEach((entry)=>elements.forEach((element)=>changeInlineStyles(element, entry)
        )
    );
}
function getComputedCssPropertyValue(property, element = document.body) {
    return getComputedStyle(element).getPropertyValue(property);
}
function appendStyleElement(cssString, parent) {
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = cssString;
    parent ? parent.appendChild(style) : document.getElementsByTagName("head")[0].appendChild(style);
}
function loadCss(path, target = document.head) {
    return new Promise(function(resolve, reject) {
        const link1 = document.createElement("link");
        link1.rel = "stylesheet";
        link1.href = path;
        target.appendChild(link1);
        link1.onload = ()=>resolve("CSS has loaded!")
        ;
    });
}
function addCssRules(styleElement, ruleSet) {
    return styleElement.sheet?.insertRule(ruleSet, styleElement.sheet.cssRules.length);
}
function logCssRulesText() {
    setTimeout(()=>[
            ...document.styleSheets[0].cssRules
        ].forEach((rule, i)=>console.log(i, rule.cssText)
        )
    , 300);
}
export { changeCss as changeCss };
export { getComputedCssPropertyValue as getComputedCssPropertyValue };
export { appendStyleElement as appendStyleElement };
export { loadCss as loadCss };
export { addCssRules as addCssRules };
export { logCssRulesText as logCssRulesText };
function createTemplate(html) {
    const template = document.createElement("template");
    template.innerHTML = html;
    return template;
}
function cloneTemplateIntoParent(template, parent, sibling) {
    if (sibling) parent.insertBefore(template.content.cloneNode(true), sibling);
    else parent.append(template.content.cloneNode(true));
    return template;
}
export { createTemplate as createTemplate };
export { cloneTemplateIntoParent as cloneTemplateIntoParent };
const wcReset = createTemplate(`<style>
  :host {
    display: block;
    box-sizing: border-box;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  p,
  ol,
  ul,
  li,
  blockquote,
  figure,
  textarea,
  pre,
  iframe,
  hr,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 100%;
    font-weight: normal;
  }
  ul {
    list-style: none;
  }
  button,
  input,
  select {
    margin: 0;
  }
  img,
  video {
    max-width: 100%;
    display:block;
  }
  picture {
    display: block;
  }
  </style>`);
const link = createTemplate(`<style>
  .link {
      padding:0;
      margin:0;
      color: var(--linkColor);
      font-weight: var(--fontWeight, 600);
      transition: 150ms cubic-bezier(0.215, 0.61, 0.355, 1);
      transition-property: all;
      text-decoration: none;
      outline: none;
      border-radius:2px;
    }

    .link:visited {
      color: var(--linkVisitedColor, var(--linkColor));
    }

    .link:hover {
      color: var(--linkHoverColor, var(--linkColor));
      cursor: pointer;
      opacity: var(--linkHoverOpacity, 1);
    }

    .link:focus-visible {
      box-shadow: var(--focusBoxShadow);
    }
</style>`);
const grid = createTemplate(`<style>#grid-container {
  --grid-color: grey;
  min-height: 100%;
  max-width: 1112px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  position: fixed;
  padding: 0 var(--columnPaddingNormal);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  pointer-events: none;
}

.grid-bg {
  width: 100%;
  min-height: 100%;
  border-color: grey !important;
  border-color: var(--grid-color, grey) !important;
  opacity: 0.13;
  border-right: 0.2px dashed;
}
.grid-bg:first-child {
  border-left: 0.1px solid;
  border-right: 0.1px solid;
}
.grid-bg:last-child {
  border-right: 0.1px solid;
  display: none;
}
.grid-bg:nth-child(2) {
  display: none;
}
.grid-bg:nth-child(3) {
  display: none;
}

@media (min-width: 670px) {
  .grid-bg {
    width: 50%;
  }
  .grid-bg:first-child {
    border-right: 0.1px dashed;
  }
  .grid-bg:last-child {
    display: block;
  }
}

@media (min-width: 880px) {
  .grid-bg {
    width: 25%;
  }
  .grid-bg:nth-child(2) {
    display: block;
  }
  .grid-bg:nth-child(3) {
    display: block;
  }
}</style>`);
export { wcReset as wcReset };
export { link as link };
export { grid as grid };
function isHTMLElement(element) {
    return element instanceof HTMLElement;
}
function createElementWithHtml(kind, html) {
    const element = document.createElement(kind);
    element.innerHTML = html.trim();
    return element;
}
export { isHTMLElement as isHTMLElement };
export { createElementWithHtml as createElementWithHtml };
function getErrorPage(status, message) {
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Error</title>
    <link rel="icon" href="./media/favicon.ico" />
  </head>
  <body>
    <style>
      body {
        background: #33cc99;
        color: #fff;
        font-family: "Open Sans", sans-serif;
        max-height: 700px;
        overflow: hidden;
      }
      .c {
        text-align: center;
        display: block;
        position: relative;
        width: 80%;
        margin: 100px auto;
      }
      ._404 {
        font-size: 220px;
        position: relative;
        display: inline-block;
        z-index: 2;
        height: 250px;
        letter-spacing: 15px;
      }
      ._1 {
        text-align: center;
        display: block;
        position: relative;
        letter-spacing: 12px;
        font-size: 4em;
        line-height: 80%;
      }
      ._2 {
        text-align: center;
        display: block;
        position: relative;
        font-size: 20px;
      }
      .text {
        font-size: 70px;
        text-align: center;
        position: relative;
        display: inline-block;
        margin: 19px 0px 0px 0px;
        /* top: 256.301px; */
        z-index: 3;
        width: 100%;
        line-height: 1.2em;
        display: inline-block;
      }

      .btn {
        background-color: rgb(255, 255, 255);
        position: relative;
        display: inline-block;
        width: 358px;
        padding: 5px;
        z-index: 5;
        font-size: 25px;
        margin: 0 auto;
        color: #33cc99;
        text-decoration: none;
        margin-right: 10px;
      }
      .right {
        float: right;
        width: 60%;
      }

      hr {
        padding: 0;
        border: none;
        border-top: 5px solid #fff;
        color: #fff;
        text-align: center;
        margin: 0px auto;
        width: 420px;
        height: 10px;
        z-index: -10;
      }

      hr:after {
        content: "\\2022";
        display: inline-block;
        position: relative;
        top: -0.75em;
        font-size: 2em;
        padding: 0 0.2em;
        background: #33cc99;
      }

      .cloud {
        width: 350px;
        height: 120px;

        background: #fff;
        background: linear-gradient(top, #fff 100%);
        background: -webkit-linear-gradient(top, #fff 100%);
        background: -moz-linear-gradient(top, #fff 100%);
        background: -ms-linear-gradient(top, #fff 100%);
        background: -o-linear-gradient(top, #fff 100%);

        border-radius: 100px;
        -webkit-border-radius: 100px;
        -moz-border-radius: 100px;

        position: absolute;
        margin: 120px auto 20px;
        z-index: -1;
        transition: ease 1s;
      }

      .cloud:after,
      .cloud:before {
        content: "";
        position: absolute;
        background: #fff;
        z-index: -1;
      }

      .cloud:after {
        width: 100px;
        height: 100px;
        top: -50px;
        left: 50px;

        border-radius: 100px;
        -webkit-border-radius: 100px;
        -moz-border-radius: 100px;
      }

      .cloud:before {
        width: 180px;
        height: 180px;
        top: -90px;
        right: 50px;

        border-radius: 200px;
        -webkit-border-radius: 200px;
        -moz-border-radius: 200px;
      }

      .x1 {
        top: -50px;
        left: 100px;
        -webkit-transform: scale(0.3);
        -moz-transform: scale(0.3);
        transform: scale(0.3);
        opacity: 0.9;
        -webkit-animation: moveclouds 15s linear infinite;
        -moz-animation: moveclouds 15s linear infinite;
        -o-animation: moveclouds 15s linear infinite;
      }

      .x1_5 {
        top: -80px;
        left: 250px;
        -webkit-transform: scale(0.3);
        -moz-transform: scale(0.3);
        transform: scale(0.3);
        -webkit-animation: moveclouds 17s linear infinite;
        -moz-animation: moveclouds 17s linear infinite;
        -o-animation: moveclouds 17s linear infinite;
      }

      .x2 {
        left: 250px;
        top: 30px;
        -webkit-transform: scale(0.6);
        -moz-transform: scale(0.6);
        transform: scale(0.6);
        opacity: 0.6;
        -webkit-animation: moveclouds 25s linear infinite;
        -moz-animation: moveclouds 25s linear infinite;
        -o-animation: moveclouds 25s linear infinite;
      }

      .x3 {
        left: 250px;
        bottom: -70px;

        -webkit-transform: scale(0.6);
        -moz-transform: scale(0.6);
        transform: scale(0.6);
        opacity: 0.8;

        -webkit-animation: moveclouds 25s linear infinite;
        -moz-animation: moveclouds 25s linear infinite;
        -o-animation: moveclouds 25s linear infinite;
      }

      .x4 {
        left: 470px;
        botttom: 20px;

        -webkit-transform: scale(0.75);
        -moz-transform: scale(0.75);
        transform: scale(0.75);
        opacity: 0.75;

        -webkit-animation: moveclouds 18s linear infinite;
        -moz-animation: moveclouds 18s linear infinite;
        -o-animation: moveclouds 18s linear infinite;
      }

      .x5 {
        left: 200px;
        top: 300px;

        -webkit-transform: scale(0.5);
        -moz-transform: scale(0.5);
        transform: scale(0.5);
        opacity: 0.8;

        -webkit-animation: moveclouds 20s linear infinite;
        -moz-animation: moveclouds 20s linear infinite;
        -o-animation: moveclouds 20s linear infinite;
      }

      @-webkit-keyframes moveclouds {
        0% {
          margin-left: 1000px;
        }
        100% {
          margin-left: -1000px;
        }
      }
      @-moz-keyframes moveclouds {
        0% {
          margin-left: 1000px;
        }
        100% {
          margin-left: -1000px;
        }
      }
      @-o-keyframes moveclouds {
        0% {
          margin-left: 1000px;
        }
        100% {
          margin-left: -1000px;
        }
      }
    </style>
    <div id="clouds">
      <div class="cloud x1"></div>
      <div class="cloud x1_5"></div>
      <div class="cloud x2"></div>
      <div class="cloud x3"></div>
      <div class="cloud x4"></div>
      <div class="cloud x5"></div>
    </div>
    <div class="c">
      <div class="_404">${status}</div>
      <hr />
      <div class="_1">PAGE</div>
      <div class="_2">${message}</div>
      <a class="btn" href="/">BACK TO HOME</a>
    </div>
  </body>
</html>`;
}
export { getErrorPage as getErrorPage };
function escape1(unescapedHtml) {
    const matchHtmlRegExp = /["'&<>]/;
    const str = "" + unescapedHtml;
    const match = matchHtmlRegExp.exec(str);
    if (!match) {
        return str;
    }
    let escape1;
    let html = "";
    let index = 0;
    let lastIndex = 0;
    for(index = match.index; index < str.length; index++){
        switch(str.charCodeAt(index)){
            case 34:
                escape1 = "&quot;";
                break;
            case 38:
                escape1 = "&amp;";
                break;
            case 39:
                escape1 = "&#39;";
                break;
            case 60:
                escape1 = "&lt;";
                break;
            case 62:
                escape1 = "&gt;";
                break;
            default:
                continue;
        }
        if (lastIndex !== index) {
            html += str.substring(lastIndex, index);
        }
        lastIndex = index + 1;
        html += escape1;
    }
    return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
}
export { escape1 as escape };
function dispatchCustomEvent(eventName, element, { bubbles =true , composed =true , detail =null  } = {}) {
    return element.dispatchEvent(new CustomEvent(eventName, {
        bubbles,
        composed,
        detail: detail === null ? {
            id: element.id
        } : detail
    }));
}
function isInEventPath(event, element) {
    return event.composedPath().some((eventTarget)=>eventTarget === element
    );
}
function findElementInEventPath(event, selector) {
    const result = event.composedPath().find((eventTarget)=>eventTarget instanceof HTMLElement ? eventTarget.matches(selector) : false
    );
    return result ?? null;
}
function findElementInEventPathByInnerHtml(event, selector, ...innerHtml) {
    const element = findElementInEventPath(event, selector);
    return element ? innerHtml.includes(element.innerHTML) ? element : null : null;
}
function waitForEventOnce(eventTarget, eventName) {
    return new Promise((resolve)=>{
        function listener(event) {
            resolve(event);
            eventTarget.removeEventListener(eventName, listener);
        }
        eventTarget.addEventListener(eventName, listener);
    });
}
function waitForImages(images) {
    return Promise.all(images.map((img)=>{
        if (img.complete) {
            return Promise.resolve(img);
        } else {
            return new Promise((resolve, reject)=>{
                function listener(event) {
                    if (event.type === "load") {
                        resolve(img);
                    } else reject(event);
                    img.removeEventListener("load", listener);
                    img.removeEventListener("error", listener);
                }
                img.addEventListener("load", listener);
                img.addEventListener("error", listener);
            });
        }
    }));
}
export { dispatchCustomEvent as dispatchCustomEvent };
export { isInEventPath as isInEventPath };
export { findElementInEventPath as findElementInEventPath };
export { findElementInEventPathByInnerHtml as findElementInEventPathByInnerHtml };
export { waitForEventOnce as waitForEventOnce };
export { waitForImages as waitForImages };
function h(type, attributes, ...children) {
    const element = document.createElement(type);
    for(let key in attributes){
        if (key in element) {
            element[key] = attributes[key];
        } else {
            attributes[key] ? element.setAttribute(key, attributes[key]) : element.removeAttribute(key);
        }
    }
    for (const child of children){
        if (typeof child === "string") {
            element.appendChild(document.createTextNode(child));
        } else {
            [
                child
            ].flat(1).forEach((c)=>element.appendChild(c)
            );
        }
    }
    return element;
}
function mount(node, view) {
    let currentApp;
    return function renderView(state) {
        const evaluatedView = view(state);
        currentApp ? node.replaceChild(evaluatedView, currentApp) : node.appendChild(evaluatedView);
        return currentApp = evaluatedView;
    };
}
export { h as h };
export { mount as mount };
function getViewportSize() {
    return [
        document.documentElement.clientWidth || window.innerWidth,
        document.documentElement.clientHeight || window.innerHeight, 
    ];
}
function reachedScrollingYEnd(element) {
    return Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) <= 3;
}
function reachedScrollingXEnd(element) {
    return Math.abs(element.scrollWidth - element.scrollLeft - element.clientWidth) <= 3;
}
function getCursorPositionRelativeToElement(event) {
    const rect = event.target.getBoundingClientRect();
    return [
        event.clientX - rect.left,
        event.clientY - rect.top
    ];
}
function surroundCursorWithElement(pageX, pageY, element) {
    return [
        pageX - (pageXOffset + element.offsetParent.getBoundingClientRect().left) - element.offsetWidth / 2,
        pageY - (pageYOffset + element.offsetParent.getBoundingClientRect().top) - element.offsetHeight / 2, 
    ];
}
function observe(elements, callback, options = {}) {
    let isDone = false;
    const observer = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            if (isDone !== true) isDone = callback(entry);
            if (isDone === true) observer.disconnect();
        });
    }, {
        root: options.root === undefined ? null : options.root,
        rootMargin: options.rootMargin === undefined ? "0px" : options.rootMargin,
        threshold: options.threshold === undefined ? [
            1
        ] : options.threshold
    });
    if (Array.isArray(elements)) elements.forEach((el)=>observer.observe(el)
    );
    else observer.observe(elements);
    return observer;
}
export { getViewportSize as getViewportSize };
export { reachedScrollingYEnd as reachedScrollingYEnd };
export { reachedScrollingXEnd as reachedScrollingXEnd };
export { getCursorPositionRelativeToElement as getCursorPositionRelativeToElement };
export { surroundCursorWithElement as surroundCursorWithElement };
export { observe as observe };
function lerp(v0, v1, t) {
    return (1 - t) * v0 + t * v1;
}
function getPosition(element, [start, end]) {
    const viewportHeight = document.documentElement.clientHeight || window.innerHeight;
    const elementHeight = element.clientHeight;
    const totalRange = Math.max(1, viewportHeight - elementHeight);
    const elementDistanceFromTop = totalRange - Math.max(0, element.getBoundingClientRect().top);
    const result = lerp(start, end, elementDistanceFromTop / totalRange) + "%";
    return result;
}
function getListener(config) {
    return ()=>{
        Object.entries(config.style).forEach(([styleProp, range])=>{
            if (range) {
                config.targetElement.style[styleProp] = getPosition(config.observedElement, range);
            }
        });
    };
}
function observerCallback(configs) {
    return (entry)=>{
        configs.forEach((config)=>{
            if (entry.target === config.observedElement) {
                if (entry.isIntersecting) {
                    config.listener = getListener(config);
                    window.addEventListener("scroll", config.listener);
                } else {
                    if (typeof config.listener === "function") {
                        window.removeEventListener("scroll", config.listener);
                    }
                    if (entry.boundingClientRect.top < 0) {
                        Object.entries(config.style).forEach(([styleProp, range])=>{
                            if (range) {
                                config.targetElement.style[styleProp] = getPosition(config.observedElement, range);
                            }
                        });
                    }
                }
            }
        });
        return false;
    };
}
function moveElementsAlongScrolling(configs) {
    return observe(configs.map((config)=>config.observedElement
    ), observerCallback(configs), {
        threshold: [
            1
        ]
    });
}
export { moveElementsAlongScrolling as moveElementsAlongScrolling };
function getSiblingByClass(element, className) {
    const result = [
        ...element.parentNode?.children ?? []
    ].find((el)=>el.classList.contains(className)
    );
    return result ?? null;
}
function getIndexOfElement(element) {
    const result = [
        ...element.parentNode?.children ?? []
    ].indexOf(element);
    return result === -1 ? null : result;
}
function getKeyboardFocusableElements(element = document) {
    return [
        ...element.querySelectorAll('a, button, input:not([type="hidden"], textarea, select, details,[tabindex]:not([tabindex="-1"])')
    ].filter((el)=>!el.hasAttribute("disabled")
    );
}
function getChildren(parentElement) {
    return [
        ...parentElement.children
    ];
}
export { getSiblingByClass as getSiblingByClass };
export { getIndexOfElement as getIndexOfElement };
export { getKeyboardFocusableElements as getKeyboardFocusableElements };
export { getChildren as getChildren };
function convertCamelCaseToDash(str) {
    return str.replace(/([a-zA-Z])(?=[A-Z])/g, "$1-").toLowerCase();
}
function convertDashToCamelCase(str) {
    return str.replace(/-([a-z])/g, function(g) {
        return g[1].toUpperCase();
    });
}
function concatWithSpace(...strings) {
    return strings.join(" ");
}
function replaceCharAt(str, index, replace) {
    return str.substring(0, index) + replace + str.substring(index + 1);
}
function insert(str, index, newStr) {
    return str.slice(0, index) + newStr + str.slice(index);
}
function searchAndInsert(baseString, pattern, str) {
    const index = baseString.search(pattern);
    return baseString.slice(0, index) + str + baseString.slice(index);
}
function hasWhiteSpace(str) {
    return /\s/g.test(str);
}
function getTag(string, tag) {
    const regexp = new RegExp(`<${tag}\\b[^>]*>(.*?)<\/${tag}>`, "gs");
    return [
        ...s1.matchAll(regexp)
    ];
}
function convertStringToBase64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}
function convertBase64ToString(str) {
    return decodeURIComponent(escape(window.atob(str)));
}
function addPaddingToBase64url(base64url) {
    if (base64url.length % 4 === 2) return base64url + "==";
    if (base64url.length % 4 === 3) return base64url + "=";
    if (base64url.length % 4 === 1) {
        throw new TypeError("Illegal base64url string!");
    }
    return base64url;
}
function convertBase64urlToBase64(base64url) {
    return addPaddingToBase64url(base64url).replace(/\-/g, "+").replace(/_/g, "/");
}
function convertBase64ToBase64url(base64) {
    return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
export { convertCamelCaseToDash as convertCamelCaseToDash };
export { convertDashToCamelCase as convertDashToCamelCase };
export { concatWithSpace as concatWithSpace };
export { replaceCharAt as replaceCharAt };
export { insert as insert };
export { searchAndInsert as searchAndInsert };
export { hasWhiteSpace as hasWhiteSpace };
export { getTag as getTag };
export { convertStringToBase64 as convertStringToBase64 };
export { convertBase64ToString as convertBase64ToString };
export { addPaddingToBase64url as addPaddingToBase64url };
export { convertBase64urlToBase64 as convertBase64urlToBase64 };
export { convertBase64ToBase64url as convertBase64ToBase64url };
function waitUntil(predicate, { interval =50 , timeout =2000 , message  }) {
    return new Promise((resolve, reject)=>{
        let timeoutId;
        setTimeout(()=>{
            clearTimeout(timeoutId);
            reject(new Error(message ? `Timeout: ${message}` : "waitUntil timed out"));
        }, timeout);
        async function nextInterval() {
            try {
                if (await predicate()) {
                    resolve(void 0);
                } else {
                    timeoutId = setTimeout(()=>{
                        nextInterval();
                    }, interval);
                }
            } catch (error) {
                reject(error);
            }
        }
        nextInterval();
    });
}
function handlePageVisibilityChange(onHidden, onVisible) {
    let hidden = "";
    let visibilityChange = "";
    if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }
    document.getElementById("videoElement");
    function handleVisibilityChange() {
        if (document[hidden]) {
            onHidden();
        } else {
            onVisible();
        }
    }
    document.addEventListener(visibilityChange, handleVisibilityChange, false);
    return [
        hidden,
        visibilityChange
    ];
}
function makeElementEditableOnDblclick(element) {
    element.ondblclick = (event)=>{
        element.contentEditable = "true";
        element.blur();
        element.focus();
        document.execCommand("selectAll", false, undefined);
        event.preventDefault();
        event.stopPropagation();
    };
    element.onclick = (event)=>event.target.contentEditable = "false"
    ;
}
export { waitUntil as waitUntil };
export { handlePageVisibilityChange as handlePageVisibilityChange };
export { makeElementEditableOnDblclick as makeElementEditableOnDblclick };

