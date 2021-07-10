export function isArray<T>(a: T[] | unknown): a is T[] {
  return Array.isArray(a);
}

export function is2DArray<T>(
  input: unknown | T[][],
): input is T[][] {
  return Array.isArray(input) && Array.isArray(input[0]);
}
