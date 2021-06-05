function changeInlineStyles(element, [property, value]) {
    if (property.slice(0, 2) === "--" && element.style.getPropertyValue(property) !== value) {
        element.style.setProperty(property, value);
    } else if (element.style[property] !== value) {
        element.style[property] = value;
    }
}
function changeCss1(styles, ...elements) {
    Object.entries(styles).forEach((entry)=>elements.forEach((element)=>changeInlineStyles(element, entry)
        )
    );
}
function appendStyleElement1(cssString, parent) {
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = cssString;
    parent ? parent.appendChild(style) : document.getElementsByTagName("head")[0].appendChild(style);
}
function loadCss1(path, target = document.head) {
    return new Promise(function(resolve, reject) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = path;
        target.appendChild(link);
        link.onload = ()=>resolve("CSS has loaded!")
        ;
    });
}
function addCssRules1(styleElement, ruleSet) {
    return styleElement.sheet?.insertRule(ruleSet, styleElement.sheet.cssRules.length);
}
function logCssRulesText1() {
    setTimeout(()=>[
            ...document.styleSheets[0].cssRules
        ].forEach((rule, i)=>console.log(i, rule.cssText)
        )
    , 300);
}
export { changeCss1 as changeCss };
export { appendStyleElement1 as appendStyleElement };
export { loadCss1 as loadCss };
export { addCssRules1 as addCssRules };
export { logCssRulesText1 as logCssRulesText };
function createTemplate1(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template;
}
function cloneTemplateIntoParent1(template, parent, sibling) {
    if (sibling) parent.insertBefore(template.content.cloneNode(true), sibling);
    else parent.append(template.content.cloneNode(true));
    return template;
}
export { createTemplate1 as createTemplate };
export { cloneTemplateIntoParent1 as cloneTemplateIntoParent };
const wcReset1 = createTemplate1(`<style>\n  :host {\n    display: block;\n    box-sizing: border-box;\n  }\n  *,\n  *::before,\n  *::after {\n    box-sizing: inherit;\n  }\n  p,\n  ol,\n  ul,\n  li,\n  blockquote,\n  figure,\n  textarea,\n  pre,\n  iframe,\n  hr,\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6 {\n    margin: 0;\n    padding: 0;\n  }\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6 {\n    font-size: 100%;\n    font-weight: normal;\n  }\n  ul {\n    list-style: none;\n  }\n  button,\n  input,\n  select {\n    margin: 0;\n  }\n  img,\n  video {\n    max-width: 100%;\n    display:block;\n  }\n  picture {\n    display: block;\n  }\n  </style>`);
const link1 = createTemplate1(`<style>.link {\n  font-family: inherit;\n  margin: 0;\n  padding: 0;\n  border: none;\n  outline: none;\n  background: none;\n  text-decoration: none;\n  transition: 150ms cubic-bezier(0.215, 0.61, 0.355, 1);\n  transition-property: background-color, opacity;\n  display: block;\n  white-space: nowrap;\n  user-select: none;\n  font-weight: inherit;\n  color: inherit;\n}\n\nlink.:hover {\n  background-color: var(--linkHoverBackgroundColor);\n  opacity: var(--linkHoverOpacity, 0.6);\n}</style>`);
const center1 = createTemplate1(`<style>.center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}</style>`);
const grid1 = createTemplate1(`<style>#grid-container {\n  --grid-color: grey;\n  min-height: 100%;\n  max-width: 1112px;\n  margin: 0 auto;\n  padding: 0 16px;\n  display: flex;\n  position: fixed;\n  padding: 0 var(--columnPaddingNormal);\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 2;\n  pointer-events: none;\n}\n\n.grid-bg {\n  width: 100%;\n  min-height: 100%;\n  border-color: grey !important;\n  border-color: var(--grid-color, grey) !important;\n  opacity: 0.13;\n  border-right: 0.2px dashed;\n}\n.grid-bg:first-child {\n  border-left: 0.1px solid;\n  border-right: 0.1px solid;\n}\n.grid-bg:last-child {\n  border-right: 0.1px solid;\n  display: none;\n}\n.grid-bg:nth-child(2) {\n  display: none;\n}\n.grid-bg:nth-child(3) {\n  display: none;\n}\n\n@media (min-width: 670px) {\n  .grid-bg {\n    width: 50%;\n  }\n  .grid-bg:first-child {\n    border-right: 0.1px dashed;\n  }\n  .grid-bg:last-child {\n    display: block;\n  }\n}\n\n@media (min-width: 880px) {\n  .grid-bg {\n    width: 25%;\n  }\n  .grid-bg:nth-child(2) {\n    display: block;\n  }\n  .grid-bg:nth-child(3) {\n    display: block;\n  }\n}</style>`);
export { wcReset1 as wcReset };
export { link1 as link };
export { center1 as center };
export { grid1 as grid };
function isHTMLElement1(element) {
    return element instanceof HTMLElement;
}
function createElementWithHtml1(kind, html) {
    const element = document.createElement(kind);
    element.innerHTML = html.trim();
    return element;
}
export { isHTMLElement1 as isHTMLElement };
export { createElementWithHtml1 as createElementWithHtml };
function getErrorPage1(status, message) {
    return `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <title>Error</title>\n    <link rel="icon" href="./media/favicon.ico" />\n  </head>\n  <body>\n    <style>\n      body {\n        background: #33cc99;\n        color: #fff;\n        font-family: "Open Sans", sans-serif;\n        max-height: 700px;\n        overflow: hidden;\n      }\n      .c {\n        text-align: center;\n        display: block;\n        position: relative;\n        width: 80%;\n        margin: 100px auto;\n      }\n      ._404 {\n        font-size: 220px;\n        position: relative;\n        display: inline-block;\n        z-index: 2;\n        height: 250px;\n        letter-spacing: 15px;\n      }\n      ._1 {\n        text-align: center;\n        display: block;\n        position: relative;\n        letter-spacing: 12px;\n        font-size: 4em;\n        line-height: 80%;\n      }\n      ._2 {\n        text-align: center;\n        display: block;\n        position: relative;\n        font-size: 20px;\n      }\n      .text {\n        font-size: 70px;\n        text-align: center;\n        position: relative;\n        display: inline-block;\n        margin: 19px 0px 0px 0px;\n        /* top: 256.301px; */\n        z-index: 3;\n        width: 100%;\n        line-height: 1.2em;\n        display: inline-block;\n      }\n\n      .btn {\n        background-color: rgb(255, 255, 255);\n        position: relative;\n        display: inline-block;\n        width: 358px;\n        padding: 5px;\n        z-index: 5;\n        font-size: 25px;\n        margin: 0 auto;\n        color: #33cc99;\n        text-decoration: none;\n        margin-right: 10px;\n      }\n      .right {\n        float: right;\n        width: 60%;\n      }\n\n      hr {\n        padding: 0;\n        border: none;\n        border-top: 5px solid #fff;\n        color: #fff;\n        text-align: center;\n        margin: 0px auto;\n        width: 420px;\n        height: 10px;\n        z-index: -10;\n      }\n\n      hr:after {\n        content: "\\2022";\n        display: inline-block;\n        position: relative;\n        top: -0.75em;\n        font-size: 2em;\n        padding: 0 0.2em;\n        background: #33cc99;\n      }\n\n      .cloud {\n        width: 350px;\n        height: 120px;\n\n        background: #fff;\n        background: linear-gradient(top, #fff 100%);\n        background: -webkit-linear-gradient(top, #fff 100%);\n        background: -moz-linear-gradient(top, #fff 100%);\n        background: -ms-linear-gradient(top, #fff 100%);\n        background: -o-linear-gradient(top, #fff 100%);\n\n        border-radius: 100px;\n        -webkit-border-radius: 100px;\n        -moz-border-radius: 100px;\n\n        position: absolute;\n        margin: 120px auto 20px;\n        z-index: -1;\n        transition: ease 1s;\n      }\n\n      .cloud:after,\n      .cloud:before {\n        content: "";\n        position: absolute;\n        background: #fff;\n        z-index: -1;\n      }\n\n      .cloud:after {\n        width: 100px;\n        height: 100px;\n        top: -50px;\n        left: 50px;\n\n        border-radius: 100px;\n        -webkit-border-radius: 100px;\n        -moz-border-radius: 100px;\n      }\n\n      .cloud:before {\n        width: 180px;\n        height: 180px;\n        top: -90px;\n        right: 50px;\n\n        border-radius: 200px;\n        -webkit-border-radius: 200px;\n        -moz-border-radius: 200px;\n      }\n\n      .x1 {\n        top: -50px;\n        left: 100px;\n        -webkit-transform: scale(0.3);\n        -moz-transform: scale(0.3);\n        transform: scale(0.3);\n        opacity: 0.9;\n        -webkit-animation: moveclouds 15s linear infinite;\n        -moz-animation: moveclouds 15s linear infinite;\n        -o-animation: moveclouds 15s linear infinite;\n      }\n\n      .x1_5 {\n        top: -80px;\n        left: 250px;\n        -webkit-transform: scale(0.3);\n        -moz-transform: scale(0.3);\n        transform: scale(0.3);\n        -webkit-animation: moveclouds 17s linear infinite;\n        -moz-animation: moveclouds 17s linear infinite;\n        -o-animation: moveclouds 17s linear infinite;\n      }\n\n      .x2 {\n        left: 250px;\n        top: 30px;\n        -webkit-transform: scale(0.6);\n        -moz-transform: scale(0.6);\n        transform: scale(0.6);\n        opacity: 0.6;\n        -webkit-animation: moveclouds 25s linear infinite;\n        -moz-animation: moveclouds 25s linear infinite;\n        -o-animation: moveclouds 25s linear infinite;\n      }\n\n      .x3 {\n        left: 250px;\n        bottom: -70px;\n\n        -webkit-transform: scale(0.6);\n        -moz-transform: scale(0.6);\n        transform: scale(0.6);\n        opacity: 0.8;\n\n        -webkit-animation: moveclouds 25s linear infinite;\n        -moz-animation: moveclouds 25s linear infinite;\n        -o-animation: moveclouds 25s linear infinite;\n      }\n\n      .x4 {\n        left: 470px;\n        botttom: 20px;\n\n        -webkit-transform: scale(0.75);\n        -moz-transform: scale(0.75);\n        transform: scale(0.75);\n        opacity: 0.75;\n\n        -webkit-animation: moveclouds 18s linear infinite;\n        -moz-animation: moveclouds 18s linear infinite;\n        -o-animation: moveclouds 18s linear infinite;\n      }\n\n      .x5 {\n        left: 200px;\n        top: 300px;\n\n        -webkit-transform: scale(0.5);\n        -moz-transform: scale(0.5);\n        transform: scale(0.5);\n        opacity: 0.8;\n\n        -webkit-animation: moveclouds 20s linear infinite;\n        -moz-animation: moveclouds 20s linear infinite;\n        -o-animation: moveclouds 20s linear infinite;\n      }\n\n      @-webkit-keyframes moveclouds {\n        0% {\n          margin-left: 1000px;\n        }\n        100% {\n          margin-left: -1000px;\n        }\n      }\n      @-moz-keyframes moveclouds {\n        0% {\n          margin-left: 1000px;\n        }\n        100% {\n          margin-left: -1000px;\n        }\n      }\n      @-o-keyframes moveclouds {\n        0% {\n          margin-left: 1000px;\n        }\n        100% {\n          margin-left: -1000px;\n        }\n      }\n    </style>\n    <div id="clouds">\n      <div class="cloud x1"></div>\n      <div class="cloud x1_5"></div>\n      <div class="cloud x2"></div>\n      <div class="cloud x3"></div>\n      <div class="cloud x4"></div>\n      <div class="cloud x5"></div>\n    </div>\n    <div class="c">\n      <div class="_404">${status}</div>\n      <hr />\n      <div class="_1">PAGE</div>\n      <div class="_2">${message}</div>\n      <a class="btn" href="/">BACK TO HOME</a>\n    </div>\n  </body>\n</html>`;
}
export { getErrorPage1 as getErrorPage };
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
            default: continue;
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
function dispatchCustomEvent1(eventName, element, { bubbles =true , composed =true , detail =null  } = {
}) {
    return element.dispatchEvent(new CustomEvent(eventName, {
        bubbles,
        composed,
        detail: detail === null ? {
            id: element.id
        } : detail
    }));
}
function isInEventPath1(event, element) {
    return event.composedPath().some((eventTarget)=>eventTarget === element
    );
}
function findElementInEventPath1(event, selector) {
    const result = event.composedPath().find((eventTarget)=>eventTarget instanceof HTMLElement ? eventTarget.matches(selector) : false
    );
    return result ?? null;
}
function findElementInEventPathByInnerHtml1(event, selector, ...innerHtml) {
    const element = findElementInEventPath1(event, selector);
    return element ? innerHtml.includes(element.innerHTML) ? element : null : null;
}
function waitForEventOnce1(eventTarget, eventName) {
    return new Promise((resolve)=>{
        function listener(event) {
            resolve(event);
            eventTarget.removeEventListener(eventName, listener);
        }
        eventTarget.addEventListener(eventName, listener);
    });
}
function waitForImages1(images) {
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
export { dispatchCustomEvent1 as dispatchCustomEvent };
export { isInEventPath1 as isInEventPath };
export { findElementInEventPath1 as findElementInEventPath };
export { findElementInEventPathByInnerHtml1 as findElementInEventPathByInnerHtml };
export { waitForEventOnce1 as waitForEventOnce };
export { waitForImages1 as waitForImages };
function h1(type, attributes, ...children) {
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
function mount1(node, view) {
    let currentApp;
    return function renderView(state) {
        const evaluatedView = view(state);
        currentApp ? node.replaceChild(evaluatedView, currentApp) : node.appendChild(evaluatedView);
        return currentApp = evaluatedView;
    };
}
export { h1 as h };
export { mount1 as mount };
function getViewportSize1() {
    return [
        document.documentElement.clientWidth || window.innerWidth,
        document.documentElement.clientHeight || window.innerHeight, 
    ];
}
function reachedScrollingYEnd1(element) {
    return Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) <= 3;
}
function reachedScrollingXEnd1(element) {
    return Math.abs(element.scrollWidth - element.scrollLeft - element.clientWidth) <= 3;
}
function getCursorPositionRelativeToElement1(event) {
    const rect = event.target.getBoundingClientRect();
    return [
        event.clientX - rect.left,
        event.clientY - rect.top
    ];
}
function surroundCursorWithElement1(pageX, pageY, element) {
    return [
        pageX - (pageXOffset + element.offsetParent.getBoundingClientRect().left) - element.offsetWidth / 2,
        pageY - (pageYOffset + element.offsetParent.getBoundingClientRect().top) - element.offsetHeight / 2, 
    ];
}
function observe1(elements, callback, options = {
}) {
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
export { getViewportSize1 as getViewportSize };
export { reachedScrollingYEnd1 as reachedScrollingYEnd };
export { reachedScrollingXEnd1 as reachedScrollingXEnd };
export { getCursorPositionRelativeToElement1 as getCursorPositionRelativeToElement };
export { surroundCursorWithElement1 as surroundCursorWithElement };
export { observe1 as observe };
function mix(v0, v1, t) {
    return (1 - t) * v0 + t * v1;
}
function getPosition(element, [start, end]) {
    const viewportHeight = document.documentElement.clientHeight || window.innerHeight;
    const elementHeight = element.clientHeight;
    const totalRange = Math.max(1, viewportHeight - elementHeight);
    const elementDistanceFromTop = totalRange - Math.max(0, element.getBoundingClientRect().top);
    const result = mix(start, end, elementDistanceFromTop / totalRange) + "%";
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
function moveElementsAlongScrolling1(configs) {
    return observe1(configs.map((config)=>config.observedElement
    ), observerCallback(configs), {
        threshold: [
            1
        ]
    });
}
export { moveElementsAlongScrolling1 as moveElementsAlongScrolling };
function getSiblingByClass1(element, className) {
    const result = [
        ...element.parentNode?.children ?? []
    ].find((el)=>el.classList.contains(className)
    );
    return result ?? null;
}
function getIndexOfElement1(element) {
    const result = [
        ...element.parentNode?.children ?? []
    ].indexOf(element);
    return result === -1 ? null : result;
}
function getKeyboardFocusableElements1(element = document) {
    return [
        ...element.querySelectorAll('a, button, input:not([type="hidden"], textarea, select, details,[tabindex]:not([tabindex="-1"])')
    ].filter((el)=>!el.hasAttribute("disabled")
    );
}
function getChildren1(parentElement) {
    return [
        ...parentElement.children
    ];
}
export { getSiblingByClass1 as getSiblingByClass };
export { getIndexOfElement1 as getIndexOfElement };
export { getKeyboardFocusableElements1 as getKeyboardFocusableElements };
export { getChildren1 as getChildren };
function convertCamelCaseToDash1(str) {
    return str.replace(/([a-zA-Z])(?=[A-Z])/g, "$1-").toLowerCase();
}
function convertDashToCamelCase1(str) {
    return str.replace(/-([a-z])/g, function(g) {
        return g[1].toUpperCase();
    });
}
function concatWithSpace1(...strings) {
    return strings.join(" ");
}
function replaceCharAt1(str, index, replace) {
    return str.substring(0, index) + replace + str.substring(index + 1);
}
function insert1(str, index, newStr) {
    return str.slice(0, index) + newStr + str.slice(index);
}
function searchAndInsert1(baseString, pattern, str) {
    const index = baseString.search(pattern);
    return baseString.slice(0, index) + str + baseString.slice(index);
}
function hasWhiteSpace1(str) {
    return /\s/g.test(str);
}
function getTag1(string, tag) {
    const regexp = new RegExp(`<${tag}\\b[^>]*>(.*?)<\/${tag}>`, "gs");
    return [
        ...s1.matchAll(regexp)
    ];
}
function convertStringToBase641(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}
function convertBase64ToString1(str) {
    return decodeURIComponent(escape(window.atob(str)));
}
function addPaddingToBase64url1(base64url) {
    if (base64url.length % 4 === 2) return base64url + "==";
    if (base64url.length % 4 === 3) return base64url + "=";
    if (base64url.length % 4 === 1) {
        throw new TypeError("Illegal base64url string!");
    }
    return base64url;
}
function convertBase64urlToBase641(base64url) {
    return addPaddingToBase64url1(base64url).replace(/\-/g, "+").replace(/_/g, "/");
}
function convertBase64ToBase64url1(base64) {
    return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
export { convertCamelCaseToDash1 as convertCamelCaseToDash };
export { convertDashToCamelCase1 as convertDashToCamelCase };
export { concatWithSpace1 as concatWithSpace };
export { replaceCharAt1 as replaceCharAt };
export { insert1 as insert };
export { searchAndInsert1 as searchAndInsert };
export { hasWhiteSpace1 as hasWhiteSpace };
export { getTag1 as getTag };
export { convertStringToBase641 as convertStringToBase64 };
export { convertBase64ToString1 as convertBase64ToString };
export { addPaddingToBase64url1 as addPaddingToBase64url };
export { convertBase64urlToBase641 as convertBase64urlToBase64 };
export { convertBase64ToBase64url1 as convertBase64ToBase64url };
function waitUntil1(predicate, { interval =50 , timeout =2000 , message  }) {
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
function handlePageVisibilityChange1(onHidden, onVisible) {
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
    var videoElement = document.getElementById("videoElement");
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
function makeElementEditableOnDblclick1(element) {
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
export { waitUntil1 as waitUntil };
export { handlePageVisibilityChange1 as handlePageVisibilityChange };
export { makeElementEditableOnDblclick1 as makeElementEditableOnDblclick };

