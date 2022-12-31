// Expand a type to show all fields in intellisense, rather
// than the less verbose type.
export type Expand<T> = T extends (...args: infer A) => infer R
  ? (...args: Expand<A>) => Expand<R>
  : T extends infer O
  ? { [K in keyof O]: O[K] }
  : never;

export type DeepExpand<T> = T extends (...args: infer A) => infer R
  ? (...args: DeepExpand<A>) => DeepExpand<R>
  : T extends object
  ? T extends infer O
    ? { [K in keyof O]: DeepExpand<O[K]> }
    : never
  : T;

export type DeepPartial<T> = {
  [Key in keyof T]?: T[Key] extends object ? DeepPartial<T[Key]> : T[Key];
};

export type DeepBoolean<ResolvableFields> = {
  [Key in keyof ResolvableFields]: ResolvableFields[Key] extends object
    ? DeepBoolean<ResolvableFields[Key]>
    : boolean;
};

export type DeepRemoveArray<T> = {
  [Key in keyof T]: T[Key] extends any[] ? DeepRemoveArray<T[Key][0]> : T[Key];
};
