/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 *
 * Main lit-html module.
 *
 * Main exports:
 *
 * -  [[html]]
 * -  [[svg]]
 * -  [[render]]
 *
 * @module lit-html
 * @preferred
 */

/**
 * Do not remove this comment; it keeps typedoc from misplacing the module
 * docs.
 */
import { defaultTemplateProcessor } from "./lib/default-template-processor.ts"
import { SVGTemplateResult, TemplateResult } from "./lib/template-result.ts"

export {
  DefaultTemplateProcessor,
  defaultTemplateProcessor,
} from "./lib/default-template-processor.ts"
export { directive, DirectiveFn, isDirective } from "./lib/directive.ts"
// TODO(justinfagnani): remove line when we get NodePart moving methods
export { removeNodes, reparentNodes } from "./lib/dom.ts"
export { noChange, nothing, Part } from "./lib/part.ts"
export {
  AttributeCommitter,
  AttributePart,
  BooleanAttributePart,
  EventPart,
  isIterable,
  isPrimitive,
  NodePart,
  PropertyCommitter,
  PropertyPart,
} from "./lib/parts.ts"
export { RenderOptions } from "./lib/render-options.ts"
export { parts, render } from "./lib/render.ts"
export { templateCaches, templateFactory } from "./lib/template-factory.ts"
export { TemplateInstance } from "./lib/template-instance.ts"
export { TemplateProcessor } from "./lib/template-processor.ts"
export { SVGTemplateResult, TemplateResult } from "./lib/template-result.ts"
export { createMarker, isTemplatePartActive, Template } from "./lib/template.ts"

declare global {
  interface Window {
    litHtmlVersions: string[]
  }
}

// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time
if (typeof window !== "undefined") {
  ;(window["litHtmlVersions"] || (window["litHtmlVersions"] = [])).push("1.2.1")
}

/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */
export const html = (strings: TemplateStringsArray, ...values: unknown[]) =>
  new TemplateResult(strings, values, "html", defaultTemplateProcessor)

/**
 * Interprets a template literal as an SVG template that can efficiently
 * render to and update a container.
 */
export const svg = (strings: TemplateStringsArray, ...values: unknown[]) =>
  new SVGTemplateResult(strings, values, "svg", defaultTemplateProcessor)
