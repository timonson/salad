import { createTemplate } from "./template.ts";

export const wcReset = createTemplate(`<style>
  :host {
    display: block;
    box-sizing: border-box;
    cursor: default;
    word-break: break-word;
    overflow-x: hidden;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
    color: inherit;
  }
  p,
  ol,
  ul,
  li,
  dl,
  dt,
  dd,
  blockquote,
  figure,
  fieldset,
  legend,
  textarea,
  pre,
  iframe,
  hr,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 100%;
    font-weight: normal;
  }

  p {
    line-height: 1.555;
  }

  ul {
    list-style: none;
  }

  button,
  input,
  select {
    margin: 0;
  }

  img,
  video {
    height: auto;
    max-width: 100%;
  }
  </style>`);

export const link = createTemplate(`<style>.link {
  font-family: inherit;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  background: none;
  text-decoration: none;
  transition: 150ms cubic-bezier(0.215, 0.61, 0.355, 1);
  transition-property: background-color, opacity;
  display: block;
  white-space: nowrap;
  user-select: none;
  font-size: 15px;
  line-height: 25px;
  font-weight: inherit;
  color: inherit;
}

link.:hover {
  background-color: var(--linkHoverBackgroundColor);
  opacity: var(--linkHoverOpacity, 0.6);
}</style>`);

export const center = createTemplate(`<style>.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}</style>`);
