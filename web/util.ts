/**
 * Waits until the given predicate returns a truthy value. Calls and awaits the predicate
 * function at the given interval time. Can be used to poll until a certain condition is true.
 * @example
 * ```js
 * const element = await fixture(html`<my-element></my-element>`);
 * await waitUntil(() => return !!element.offsetParent, 'element should become ready');
 * ```
 */
export function waitUntil(
  predicate: () => boolean,
  { interval = 50, timeout = 2000, message }: {
    interval?: number;
    timeout?: number;
    message?: string;
  },
) {
  return new Promise((resolve, reject) => {
    let timeoutId: number;

    setTimeout(() => {
      clearTimeout(timeoutId);
      reject(
        new Error(message ? `Timeout: ${message}` : "waitUntil timed out"),
      );
    }, timeout);

    async function nextInterval() {
      try {
        if (await predicate()) {
          resolve(void 0);
        } else {
          timeoutId = setTimeout(() => {
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

// https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
export function handlePageVisibilityChange(
  onHidden: () => void,
  onVisible: () => void,
) {
  // Set the name of the hidden property and the change event for visibility
  let hidden: string = "";
  let visibilityChange: string = "";
  if (typeof document.hidden !== "undefined") {
    // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden";
    visibilityChange = "visibilitychange";
  } else if (typeof (document as any).msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
  } else if (typeof (document as any).webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
  }
  var videoElement = document.getElementById("videoElement");
  // If the page is hidden, pause the video;
  // if the page is shown, play the video
  function handleVisibilityChange() {
    if ((document as any)[hidden as any]) {
      onHidden();
    } else {
      onVisible();
    }
  }
  document.addEventListener(visibilityChange, handleVisibilityChange, false);

  return [hidden, visibilityChange];
}

export function makeElementEditableOnDblclick(element: HTMLElement) {
  element.ondblclick = (event: MouseEvent) => {
    element.contentEditable = "true";
    element.blur();
    element.focus();
    document.execCommand("selectAll", false, undefined);
    event.preventDefault();
    event.stopPropagation();
  };
  element.onclick = (
    event: MouseEvent,
  ) => ((event.target as any).contentEditable = "false");
}
