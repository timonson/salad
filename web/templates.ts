export function createTemplate(html: string): HTMLTemplateElement {
  const template = document.createElement("template");
  template.innerHTML = html.trim(); // Never return a text node of whitespace as the result
  return template;
}

/**
 * Appends an HTMLTemplateElement as element to a parent.
 * If you pass an optional sibling it will insert the new element before it.
 */
export function cloneTemplateIntoParent(
  template: HTMLTemplateElement,
  parent: HTMLElement | ShadowRoot,
  sibling?: HTMLElement,
): HTMLTemplateElement {
  if (sibling) parent.insertBefore(template.content.cloneNode(true), sibling);
  else parent.append(template.content.cloneNode(true));
  return template;
}
