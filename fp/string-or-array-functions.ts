export function isOfLength<C>(length: number): Boolean {
  return (collection: C[]) => collection.length === length;
}

export function length<C>(collection: C[]): number {
  return collection.length;
}
