export function createHtmlTemplate(html: string): HTMLTemplateElement {
  const template = document.createElement("template");
  template.innerHTML = html.trim(); // Never return a text node of whitespace as the result
  return template;
}

export function cloneTemplateIntoParent(
  template: HTMLTemplateElement,
  parent: HTMLElement | ShadowRoot,
  sibling?: HTMLElement,
) {
  if (sibling) parent.insertBefore(template.content.cloneNode(true), sibling);
  else parent.append(template.content.cloneNode(true));
  return template;
}

export function findElementInEventPath(
  event: Event,
  selector: string,
): HTMLElement | null {
  function predicate(eventTarget: EventTarget, selector: string) {
    return eventTarget instanceof HTMLElement
      ? eventTarget.matches(selector)
      : false;
  }
  const foundElement = event
    .composedPath()
    .find((eventTarget: EventTarget): eventTarget is HTMLElement =>
      predicate(eventTarget, selector)
    );
  return foundElement ? foundElement : null;
}

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

export function observeScroll(
  element: HTMLElement,
  callback: (entry: IntersectionObserverEntry) => boolean,
  options: IntersectionObserverInit = {},
  isDisconnecting = true,
) {
  const observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (callback(entry) === false) return;
        // Stop watching the element
        if (isDisconnecting) observer.disconnect();
      });
    },
    {
      root: options.root === undefined ? null : options.root, // relative to document viewport
      rootMargin: options.rootMargin === undefined ? "0px" : options.rootMargin, // margin around root. Unitless values not allowed
      threshold: options.threshold === undefined ? [1] : options.threshold, // visible amount of item shown in relation to root
    },
  );
  // Start watching the element
  observer.observe(element);
}

export function nextFrame() {
  return new Promise<void>((resolve) =>
    requestAnimationFrame(() => resolve(void 0))
  );
}

export function getKeyboardFocusableElements(
  element: HTMLElement | Document | ShadowRoot = document,
) {
  return [...element.querySelectorAll(
    'a, button, input:not([type="hidden"], textarea, select, details,[tabindex]:not([tabindex="-1"])',
  )]
    .filter((el) => !el.hasAttribute("disabled"));
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
export function waitForEvent(eventTarget: EventTarget, eventName: string) {
  return new Promise((resolve) => {
    function listener(event: Event) {
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
