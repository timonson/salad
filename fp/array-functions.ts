export function isArray<T = unknown>(a: unknown): a is T[] {
  return Array.isArray(a);
}

type NotArray<T> = T extends unknown[] ? never : T;

export function is2DArray<T>(
  input: NotArray<T>[] | [NotArray<T>[]],
): input is [NotArray<T>[]] {
  return Array.isArray(input) && Array.isArray(input[0]);
}
