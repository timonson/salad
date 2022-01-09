export function getSiblingByClass(
  element: HTMLElement,
  className: string,
): HTMLElement | null {
  const result = [...element.parentNode?.children ?? []].find((el) =>
    el.classList.contains(className)
  );
  return (result as HTMLElement | undefined) ?? null;
}

export function getIndexOfElement(element: HTMLElement): number | null {
  const result = [...element.parentNode?.children ?? []].indexOf(element);
  return result === -1 ? null : result;
}

export function getKeyboardFocusableElements(
  element: HTMLElement | Document | ShadowRoot = document,
): Element[] {
  return [...element.querySelectorAll(
    'a, button, input:not([type="hidden"], textarea, select, details,[tabindex]:not([tabindex="-1"])',
  )]
    .filter((el) => !el.hasAttribute("disabled"));
}

/**
 * Can be used for the slot elements of a Custom Element
 */
export function getChildren(parentElement: Element) {
  return [...parentElement.children] as HTMLElement[];
}
