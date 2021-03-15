import { createTemplate } from "./templates.ts";

export const wcCssReset = createTemplate(`<style>
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
