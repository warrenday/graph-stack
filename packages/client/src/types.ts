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

export type DeepBoolean<T> = {
  [Key in keyof T]: T[Key] extends object ? DeepBoolean<T[Key]> : boolean;
};

export type RemoveArray<T> = T extends any[] ? T[0] : T;

export type DeepRemoveArray<T> = {
  [Key in keyof T]: T[Key] extends object
    ? RemoveArray<DeepRemoveArray<T[Key]>>
    : RemoveArray<T[Key]>;
};
