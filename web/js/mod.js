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
function getMousePositionRelativeToElement(event) {
    const rect = event.target.getBoundingClientRect();
    return [
        event.clientX - rect.left,
        event.clientY - rect.top
    ];
}
function surroundMouseWithElement(pageX, pageY, element) {
    return [
        pageX - (pageXOffset + element.offsetParent.getBoundingClientRect().left) - element.offsetWidth / 2,
        pageY - (pageYOffset + element.offsetParent.getBoundingClientRect().top) - element.offsetHeight / 2, 
    ];
}
function observe(elements, callback, options = {
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
const mod = function() {
    return {
        getViewportSize: getViewportSize,
        reachedScrollingYEnd: reachedScrollingYEnd,
        reachedScrollingXEnd: reachedScrollingXEnd,
        getMousePositionRelativeToElement: getMousePositionRelativeToElement,
        surroundMouseWithElement: surroundMouseWithElement,
        observe: observe
    };
}();
function mix(a, b, amount) {
    return (1 - amount) * a + amount * b;
}
function getOffset(value, biggestValue, actualLength) {
    return value / biggestValue * actualLength;
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
function moveElementsAlongScrolling(configs) {
    return observe(configs.map((config)=>config.observedElement
    ), observerCallback(configs), {
        threshold: [
            1
        ]
    });
}
const mod1 = function() {
    return {
        mix: mix,
        getOffset: getOffset,
        moveElementsAlongScrolling: moveElementsAlongScrolling
    };
}();
function getErrorPage(status, message) {
    return `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <title>Error</title>\n    <link rel="icon" href="./media/favicon.ico" />\n  </head>\n  <body>\n    <style>\n      body {\n        background: #33cc99;\n        color: #fff;\n        font-family: "Open Sans", sans-serif;\n        max-height: 700px;\n        overflow: hidden;\n      }\n      .c {\n        text-align: center;\n        display: block;\n        position: relative;\n        width: 80%;\n        margin: 100px auto;\n      }\n      ._404 {\n        font-size: 220px;\n        position: relative;\n        display: inline-block;\n        z-index: 2;\n        height: 250px;\n        letter-spacing: 15px;\n      }\n      ._1 {\n        text-align: center;\n        display: block;\n        position: relative;\n        letter-spacing: 12px;\n        font-size: 4em;\n        line-height: 80%;\n      }\n      ._2 {\n        text-align: center;\n        display: block;\n        position: relative;\n        font-size: 20px;\n      }\n      .text {\n        font-size: 70px;\n        text-align: center;\n        position: relative;\n        display: inline-block;\n        margin: 19px 0px 0px 0px;\n        /* top: 256.301px; */\n        z-index: 3;\n        width: 100%;\n        line-height: 1.2em;\n        display: inline-block;\n      }\n\n      .btn {\n        background-color: rgb(255, 255, 255);\n        position: relative;\n        display: inline-block;\n        width: 358px;\n        padding: 5px;\n        z-index: 5;\n        font-size: 25px;\n        margin: 0 auto;\n        color: #33cc99;\n        text-decoration: none;\n        margin-right: 10px;\n      }\n      .right {\n        float: right;\n        width: 60%;\n      }\n\n      hr {\n        padding: 0;\n        border: none;\n        border-top: 5px solid #fff;\n        color: #fff;\n        text-align: center;\n        margin: 0px auto;\n        width: 420px;\n        height: 10px;\n        z-index: -10;\n      }\n\n      hr:after {\n        content: "\\2022";\n        display: inline-block;\n        position: relative;\n        top: -0.75em;\n        font-size: 2em;\n        padding: 0 0.2em;\n        background: #33cc99;\n      }\n\n      .cloud {\n        width: 350px;\n        height: 120px;\n\n        background: #fff;\n        background: linear-gradient(top, #fff 100%);\n        background: -webkit-linear-gradient(top, #fff 100%);\n        background: -moz-linear-gradient(top, #fff 100%);\n        background: -ms-linear-gradient(top, #fff 100%);\n        background: -o-linear-gradient(top, #fff 100%);\n\n        border-radius: 100px;\n        -webkit-border-radius: 100px;\n        -moz-border-radius: 100px;\n\n        position: absolute;\n        margin: 120px auto 20px;\n        z-index: -1;\n        transition: ease 1s;\n      }\n\n      .cloud:after,\n      .cloud:before {\n        content: "";\n        position: absolute;\n        background: #fff;\n        z-index: -1;\n      }\n\n      .cloud:after {\n        width: 100px;\n        height: 100px;\n        top: -50px;\n        left: 50px;\n\n        border-radius: 100px;\n        -webkit-border-radius: 100px;\n        -moz-border-radius: 100px;\n      }\n\n      .cloud:before {\n        width: 180px;\n        height: 180px;\n        top: -90px;\n        right: 50px;\n\n        border-radius: 200px;\n        -webkit-border-radius: 200px;\n        -moz-border-radius: 200px;\n      }\n\n      .x1 {\n        top: -50px;\n        left: 100px;\n        -webkit-transform: scale(0.3);\n        -moz-transform: scale(0.3);\n        transform: scale(0.3);\n        opacity: 0.9;\n        -webkit-animation: moveclouds 15s linear infinite;\n        -moz-animation: moveclouds 15s linear infinite;\n        -o-animation: moveclouds 15s linear infinite;\n      }\n\n      .x1_5 {\n        top: -80px;\n        left: 250px;\n        -webkit-transform: scale(0.3);\n        -moz-transform: scale(0.3);\n        transform: scale(0.3);\n        -webkit-animation: moveclouds 17s linear infinite;\n        -moz-animation: moveclouds 17s linear infinite;\n        -o-animation: moveclouds 17s linear infinite;\n      }\n\n      .x2 {\n        left: 250px;\n        top: 30px;\n        -webkit-transform: scale(0.6);\n        -moz-transform: scale(0.6);\n        transform: scale(0.6);\n        opacity: 0.6;\n        -webkit-animation: moveclouds 25s linear infinite;\n        -moz-animation: moveclouds 25s linear infinite;\n        -o-animation: moveclouds 25s linear infinite;\n      }\n\n      .x3 {\n        left: 250px;\n        bottom: -70px;\n\n        -webkit-transform: scale(0.6);\n        -moz-transform: scale(0.6);\n        transform: scale(0.6);\n        opacity: 0.8;\n\n        -webkit-animation: moveclouds 25s linear infinite;\n        -moz-animation: moveclouds 25s linear infinite;\n        -o-animation: moveclouds 25s linear infinite;\n      }\n\n      .x4 {\n        left: 470px;\n        botttom: 20px;\n\n        -webkit-transform: scale(0.75);\n        -moz-transform: scale(0.75);\n        transform: scale(0.75);\n        opacity: 0.75;\n\n        -webkit-animation: moveclouds 18s linear infinite;\n        -moz-animation: moveclouds 18s linear infinite;\n        -o-animation: moveclouds 18s linear infinite;\n      }\n\n      .x5 {\n        left: 200px;\n        top: 300px;\n\n        -webkit-transform: scale(0.5);\n        -moz-transform: scale(0.5);\n        transform: scale(0.5);\n        opacity: 0.8;\n\n        -webkit-animation: moveclouds 20s linear infinite;\n        -moz-animation: moveclouds 20s linear infinite;\n        -o-animation: moveclouds 20s linear infinite;\n      }\n\n      @-webkit-keyframes moveclouds {\n        0% {\n          margin-left: 1000px;\n        }\n        100% {\n          margin-left: -1000px;\n        }\n      }\n      @-moz-keyframes moveclouds {\n        0% {\n          margin-left: 1000px;\n        }\n        100% {\n          margin-left: -1000px;\n        }\n      }\n      @-o-keyframes moveclouds {\n        0% {\n          margin-left: 1000px;\n        }\n        100% {\n          margin-left: -1000px;\n        }\n      }\n    </style>\n    <div id="clouds">\n      <div class="cloud x1"></div>\n      <div class="cloud x1_5"></div>\n      <div class="cloud x2"></div>\n      <div class="cloud x3"></div>\n      <div class="cloud x4"></div>\n      <div class="cloud x5"></div>\n    </div>\n    <div class="c">\n      <div class="_404">${status}</div>\n      <hr />\n      <div class="_1">PAGE</div>\n      <div class="_2">${message}</div>\n      <a class="btn" href="/">BACK TO HOME</a>\n    </div>\n  </body>\n</html>`;
}
const mod2 = function() {
    return {
        getErrorPage: getErrorPage
    };
}();
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
const mod3 = function() {
    return {
        escape: escape1
    };
}();
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
function appendCss(cssString, parent) {
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = cssString;
    parent ? parent.appendChild(style) : document.getElementsByTagName("head")[0].appendChild(style);
}
function loadCss(path, target = document.head) {
    return new Promise(function(resolve, reject) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = path;
        target.appendChild(link);
        link.onload = ()=>resolve("CSS has loaded!")
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
const mod4 = function() {
    return {
        changeCss: changeCss,
        appendCss: appendCss,
        loadCss: loadCss,
        addCssRules: addCssRules,
        logCssRulesText: logCssRulesText
    };
}();
function dispatchCustomEvent(eventName, element, { bubbles =true , composed =true , detail =null  } = {
}) {
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
const mod5 = function() {
    return {
        dispatchCustomEvent: dispatchCustomEvent,
        isInEventPath: isInEventPath,
        findElementInEventPath: findElementInEventPath,
        findElementInEventPathByInnerHtml: findElementInEventPathByInnerHtml,
        waitForEventOnce: waitForEventOnce,
        waitForImages: waitForImages
    };
}();
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
const mod6 = function() {
    return {
        getSiblingByClass: getSiblingByClass,
        getIndexOfElement: getIndexOfElement,
        getKeyboardFocusableElements: getKeyboardFocusableElements
    };
}();
function createTemplate(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template;
}
function cloneTemplateIntoParent(template, parent, sibling) {
    if (sibling) parent.insertBefore(template.content.cloneNode(true), sibling);
    else parent.append(template.content.cloneNode(true));
    return template;
}
const mod7 = function() {
    return {
        createTemplate: createTemplate,
        cloneTemplateIntoParent: cloneTemplateIntoParent
    };
}();
function isHTMLElement(element) {
    return element instanceof HTMLElement;
}
function createElementWithHtml(kind, html) {
    const element = document.createElement(kind);
    element.innerHTML = html.trim();
    return element;
}
const mod8 = function() {
    return {
        isHTMLElement: isHTMLElement,
        createElementWithHtml: createElementWithHtml
    };
}();
const wcCssReset = createTemplate(`<style>\n  :host {\n    display: block;\n    box-sizing: border-box;\n    cursor: default;\n    word-break: break-word;\n    overflow-x: hidden;\n  }\n  *,\n  *::before,\n  *::after {\n    box-sizing: inherit;\n    color: inherit;\n  }\n  p,\n  ol,\n  ul,\n  li,\n  dl,\n  dt,\n  dd,\n  blockquote,\n  figure,\n  fieldset,\n  legend,\n  textarea,\n  pre,\n  iframe,\n  hr,\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6 {\n    margin: 0;\n    padding: 0;\n  }\n\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6 {\n    font-size: 100%;\n    font-weight: normal;\n  }\n\n  p {\n    line-height: 1.555;\n  }\n\n  ul {\n    list-style: none;\n  }\n\n  button,\n  input,\n  select {\n    margin: 0;\n  }\n\n  img,\n  video {\n    height: auto;\n    max-width: 100%;\n  }\n  </style>`);
const mod9 = function() {
    return {
        wcCssReset: wcCssReset
    };
}();
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
const mod10 = function() {
    return {
        waitUntil: waitUntil,
        handlePageVisibilityChange: handlePageVisibilityChange,
        makeElementEditableOnDblclick: makeElementEditableOnDblclick
    };
}();
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
const mod11 = function() {
    return {
        convertCamelCaseToDash: convertCamelCaseToDash,
        convertDashToCamelCase: convertDashToCamelCase,
        concatWithSpace: concatWithSpace,
        replaceCharAt: replaceCharAt,
        insert: insert,
        searchAndInsert: searchAndInsert,
        hasWhiteSpace: hasWhiteSpace,
        getTag: getTag,
        convertStringToBase64: convertStringToBase64,
        convertBase64ToString: convertBase64ToString,
        addPaddingToBase64url: addPaddingToBase64url,
        convertBase64urlToBase64: convertBase64urlToBase64,
        convertBase64ToBase64url: convertBase64ToBase64url
    };
}();
function h(type, attributes, children) {
    const element = document.createElement(type);
    for(let key in attributes){
        if (key in element) {
            element[key] = attributes[key];
        } else {
            attributes[key] ? element.setAttribute(key, attributes[key]) : element.removeAttribute(key);
        }
    }
    if (typeof children === "string") {
        element.appendChild(document.createTextNode(children));
    } else if (children) {
        Array.isArray(children) ? children.forEach((child)=>element.appendChild(child)
        ) : element.appendChild(children);
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
const mod12 = function() {
    return {
        h: h,
        mount: mount
    };
}();
export { mod1 as movement };
export { mod as position };
export { mod2 as errorPage };
export { mod3 as escape };
export { mod4 as cssFunctions };
export { mod5 as events };
export { mod6 as selection };
export { mod7 as templates };
export { mod8 as util };
export { mod9 as wcReset };
export { mod10 as tools };
export { mod11 as stringFunctions };
export { mod12 as hFunction };

