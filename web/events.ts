/**
 * Dispatch a CustomEvent which bubbles as default through the whole DOM.
 */
export function dispatchCustomEvent(
  eventName: string,
  element: HTMLElement,
  {
    bubbles = true,
    composed = true,
    detail = null,
  }: { bubbles?: boolean; composed?: boolean; detail?: unknown } = {},
): boolean {
  return element.dispatchEvent(
    new CustomEvent(eventName, {
      bubbles,
      composed,
      detail: detail === null ? { id: element.id } : detail,
    }),
  );
}

/**
 * Checks if an element matching the selector is in the event's `composedPath()`.
 * It takes an event and a selector as arguments.
 */
export function isInEventPath(event: Event, element: HTMLElement): boolean {
  return event
    .composedPath()
    .some((eventTarget: EventTarget) => eventTarget === element);
}

export function findElementInEventPath(
  event: Event,
  selector: string,
): HTMLElement | null {
  const result = event
    .composedPath()
    .find((eventTarget: EventTarget) =>
      eventTarget instanceof HTMLElement ? eventTarget.matches(selector) : false
    );
  return result as HTMLElement ?? null;
}

export function findElementInEventPathByInnerHtml(
  event: Event,
  selector: string,
  ...innerHtml: string[]
): HTMLElement | null {
  const element = findElementInEventPath(event, selector);
  return element
    ? innerHtml.includes(element.innerHTML) ? element : null
    : null;
}

/**
 * Listens for one event and resolves with this event object after it was fired.
 */
export function waitForEventOnce<E extends HTMLElement>(
  eventTarget: E,
  eventName: string,
) {
  return new Promise((resolve) => {
    function listener<E extends Event>(event: E) {
      resolve(event);
      eventTarget.removeEventListener(eventName, listener);
    }
    eventTarget.addEventListener(eventName, listener);
  });
}

export function waitForImages(images: HTMLImageElement[]) {
  return Promise.all(images.map((img) => {
    if (img.complete) {
      return Promise.resolve(img);
    } else {
      return new Promise((resolve, reject) => {
        function listener(event: Event) {
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
