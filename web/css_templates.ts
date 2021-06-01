import { createTemplate } from "./template.ts";

export const wcReset = createTemplate(`<style>
  :host {
    display: block;
    box-sizing: border-box;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  p,
  ol,
  ul,
  li,
  blockquote,
  figure,
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
    max-width: 100%;
    display:block;
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

/**
  * <div id="grid-container">
  *     <div class="grid-bg"></div>
  *     <div class="grid-bg"></div>
  *     <div class="grid-bg"></div>
  *     <div class="grid-bg"></div>
  * </div>
  */
export const grid = createTemplate(`<style>#grid-container {
  --grid-color: grey;
  min-height: 100%;
  max-width: 1112px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  position: fixed;
  padding: 0 var(--columnPaddingNormal);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  pointer-events: none;
}

.grid-bg {
  width: 100%;
  min-height: 100%;
  border-color: grey !important;
  border-color: var(--grid-color, grey) !important;
  opacity: 0.13;
  border-right: 0.2px dashed;
}
.grid-bg:first-child {
  border-left: 0.1px solid;
  border-right: 0.1px solid;
}
.grid-bg:last-child {
  border-right: 0.1px solid;
  display: none;
}
.grid-bg:nth-child(2) {
  display: none;
}
.grid-bg:nth-child(3) {
  display: none;
}

@media (min-width: 670px) {
  .grid-bg {
    width: 50%;
  }
  .grid-bg:first-child {
    border-right: 0.1px dashed;
  }
  .grid-bg:last-child {
    display: block;
  }
}

@media (min-width: 880px) {
  .grid-bg {
    width: 25%;
  }
  .grid-bg:nth-child(2) {
    display: block;
  }
  .grid-bg:nth-child(3) {
    display: block;
  }
}</style>`);
