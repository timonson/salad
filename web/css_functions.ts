/**
 * Adds or changes specific inline styles to an element without altering other
 * style values. CSS custom properties (variables) are allowed.
 */
function changeInlineStyles(
  element: HTMLElement,
  [property, value]: [stylePropertyOrVariable: string, styleValues: string],
) {
  if (
    property.slice(0, 2) === "--" &&
    element.style.getPropertyValue(property) !== value
  ) {
    element.style.setProperty(property, value);
  } else if (element.style[property as any] !== value) {
    element.style[property as any] = value;
  }
}

/**
   * Takes a JavaScript style object and an optional selector (default is the 
   * custom element itself) and adds or changes specific inline styles to the 
   * element matching the selector without altering other style values.
   * CSS custom properties (variables) are allowed.
 */
export function changeCss(
  styles: Record<string, string>,
  ...elements: (HTMLElement)[]
): void {
  Object.entries(styles).forEach((entry) =>
    elements.forEach((element) => changeInlineStyles(element, entry))
  );
}

export function appendStyleElement(cssString: string, parent?: HTMLElement) {
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = cssString;
  parent
    ? parent.appendChild(style)
    : document.getElementsByTagName("head")[0].appendChild(style);
}

export function loadCss(
  path: string,
  target: HTMLElement = document.head,
): Promise<string> {
  return new Promise(function (resolve, reject) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = path;
    target.appendChild(link);
    link.onload = () => resolve("CSS has loaded!");
  });
}

// addCssRules(document.querySelector("style"), `h1 { background-color:blue; }`)
export function addCssRules(styleElement: HTMLStyleElement, ruleSet: string) {
  return styleElement.sheet?.insertRule(
    ruleSet,
    styleElement.sheet!.cssRules.length,
  );
}

export function logCssRulesText() {
  setTimeout(
    () =>
      [...document.styleSheets[0].cssRules].forEach((rule, i) =>
        console.log(i, rule.cssText)
      ),
    300,
  );
}
