export function getViewportSize() {
  return [
    document.documentElement.clientWidth || window.innerWidth,
    document.documentElement.clientHeight || window.innerHeight,
  ];
}

export function reachedScrollingYEnd(element: HTMLElement) {
  return (
    Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) <=
      3.0 // buffer
  );
}

export function reachedScrollingXEnd(element: HTMLElement) {
  return (
    Math.abs(element.scrollWidth - element.scrollLeft - element.clientWidth) <=
      3.0
  );
}

export function getCursorPositionRelativeToElement(event: MouseEvent) {
  const rect = (event.target as HTMLElement).getBoundingClientRect();
  return [event.clientX - rect.left, event.clientY - rect.top];
}

export function surroundCursorWithElement(
  pageX: number,
  pageY: number,
  element: HTMLElement,
) {
  return [
    pageX -
    (pageXOffset + element.offsetParent!.getBoundingClientRect().left) -
    element.offsetWidth / 2,
    pageY -
    (pageYOffset + element.offsetParent!.getBoundingClientRect().top) -
    element.offsetHeight / 2,
  ];
}

export function observe(
  elements: HTMLElement | HTMLElement[],
  callback: (entry: IntersectionObserverEntry) => boolean,
  options: IntersectionObserverInit = {},
) {
  let isDone: any = false;
  const observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (isDone !== true) isDone = callback(entry);
        // Stop watching the element
        if (isDone === true) observer.disconnect();
      });
    },
    {
      // relative to document viewport
      root: options.root === undefined ? null : options.root,
      // margin around root. Unitless values not allowed
      rootMargin: options.rootMargin === undefined ? "0px" : options.rootMargin,
      // visible amount of item shown in relation to root
      threshold: options.threshold === undefined ? [1] : options.threshold,
    },
  );
  // Start watching the element
  if (Array.isArray(elements)) elements.forEach((el) => observer.observe(el));
  else observer.observe(elements);
  return observer;
}
