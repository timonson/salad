/**
 * Hyperscript function
 * @example
 * function getRandomItem(array) {
 *   return array[Math.floor(array.length * Math.random())];
 * }
 *
 * function view(state) {
 *   return h("div", null, [
 *     h("h1", null, "Hello, vDOM!"),
 *     h(
 *       "ul",
 *       null,
 *       [
 *         getRandomItem(emojis),
 *         getRandomItem(emojis),
 *         getRandomItem(emojis),
 *       ].map((item) => h("li", null, item)),
 *     ),
 *     h("button", { onclick: () => render(state + 1) }, "Click"),
 *     h("spam", { style: "margin:10px" }, `${state}`),
 *   ]);
 * }
 *
 * const emojis = ["🥳", "👻", "🤕", "💋", "😧", "👣", "🥗", "🤗", "🤡"];
 * const render = mount(document.getElementById("app"), view);
 * render(0);
 */
export function h(type, attributes, ...children) {
  const element = document.createElement(type);
  for (let key in attributes) {
    if (key in element) {
      element[key] = attributes[key];
    } else {
      attributes[key]
        ? element.setAttribute(key, attributes[key])
        : element.removeAttribute(key);
    }
  }
  for (const child of children) {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else {
      [child].flat(1).forEach((c) => element.appendChild(c));
    }
  }
  return element;
}

export function mount(node, view) {
  let currentApp;
  return function renderView(state) {
    const evaluatedView = view(state);
    currentApp
      ? node.replaceChild(evaluatedView, currentApp)
      : node.appendChild(evaluatedView);
    return (currentApp = evaluatedView);
  };
}
