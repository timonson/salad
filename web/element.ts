/**
 * Returns true if the passed value is an HTMLTemplateElement. Otherwise it
 * returns false.
 */
export function isHTMLElement(element: unknown): element is HTMLElement {
  return element instanceof HTMLElement;
}

export function createElementWithHtml<E extends HTMLElement = HTMLElement>(
  kind: string,
  html: string,
): E {
  const element = document.createElement(kind);
  element.innerHTML = html.trim();
  return element as E;
}
