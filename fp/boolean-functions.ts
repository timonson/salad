export function isBoolean(input: unknown): input is Boolean {
  return input === true || input === false;
}

export function equals(b: unknown) {
  return (a: unknown): Boolean => a === b;
}

export function greaterThan(value: number) {
  return (x: number): Boolean => x > value;
}

export function lessThan(value: number) {
  return (x: number): Boolean => x < value;
}

export function not<X>(predicate: (x: X) => Boolean) {
  return (x: X): Boolean => !predicate(x);
}

export function anyPass<X>(predicates: ((x: X) => Boolean)[]) {
  return (x: X): Boolean => {
    for (let i_p = 0; i_p < predicates.length; i_p++) {
      if (predicates[i_p](x)) {
        return true;
      }
    }

    return false;
  };
}

export function allPass<X>(predicates: ((x: X) => Boolean)[]) {
  return (x: X): Boolean => {
    for (let i_p = 0; i_p < predicates.length; i_p++) {
      if (!predicates[i_p](x)) {
        return false;
      }
    }

    return true;
  };
}
