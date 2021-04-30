import { observe } from "./position.ts";
import { mix } from "../math/linear_interpolation.ts";

function getPosition(
  element: HTMLElement,
  [start, end]: [number, number],
): string {
  const viewportHeight = document.documentElement.clientHeight ||
    window.innerHeight;
  const elementHeight = element.clientHeight;
  const totalRange = Math.max(1, viewportHeight - elementHeight);
  const elementDistanceFromTop = totalRange - Math.max(
    0,
    element.getBoundingClientRect().top,
  );

  const result = mix(start, end, elementDistanceFromTop / totalRange) + "%";
  return result;
}

function getListener(
  config: {
    observedElement: HTMLElement;
    targetElement: HTMLElement;
    style: {
      top?: [number, number];
      right?: [number, number];
      bottom?: [number, number];
      left?: [number, number];
    };
  },
) {
  return () => {
    Object.entries(config.style).forEach(
      (
        [styleProp, range]: [any, any],
      ) => {
        if (range) {
          config.targetElement.style[styleProp as any] = getPosition(
            config.observedElement,
            range,
          );
        }
      },
    );
  };
}

type Config = {
  observedElement: HTMLElement;
  targetElement: HTMLElement;
  style: {
    top?: [number, number];
    right?: [number, number];
    bottom?: [number, number];
    left?: [number, number];
  };
  listener?: (e: any) => any; // is used internally
};

function observerCallback(configs: Config[]) {
  return (entry: IntersectionObserverEntry) => {
    configs.forEach((config) => {
      if (entry.target === config.observedElement) {
        if (entry.isIntersecting) {
          config.listener = getListener(config);
          window.addEventListener("scroll", config.listener);
        } else {
          if (typeof config.listener === "function") {
            window.removeEventListener("scroll", config.listener);
          }
          if (entry.boundingClientRect.top < 0) {
            Object.entries(config.style).forEach(([styleProp, range]) => {
              if (range) {
                config.targetElement.style[styleProp as any] = getPosition(
                  config.observedElement,
                  range,
                );
              }
            });
          }
        }
      }
    });
    return false;
  };
}

export function moveElementsAlongScrolling(
  configs: Config[],
) {
  return observe(
    configs.map((config) => config.observedElement),
    observerCallback(configs),
    { threshold: [1] },
  );
}
