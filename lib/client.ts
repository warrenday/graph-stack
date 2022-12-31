import { DeepBoolean, DeepPartial, DeepExpand, DeepRemoveArray } from "./types";

interface IResolver {
  args: {};
  resolve: any;
}

type MinimalSchema = {
  Query: Record<string, IResolver>;
  Mutation: Record<string, IResolver>;
};

/**
 * Take the values passed to fields and all possible
 * resolvable fields then reduce the selection set.
 */
type ReduceResolvedFields<
  TSelectedFields extends any,
  TResolvableFields extends TSelectedFields
> = {
  [Key in keyof TSelectedFields]: TSelectedFields[Key] extends object
    ? ReduceResolvedFields<TSelectedFields[Key], TResolvableFields[Key]>
    : TResolvableFields[Key];
};

type BaseTypeResolvers<TBaseTypeSchema extends Record<string, IResolver>> = {
  [Key in keyof TBaseTypeSchema]: <
    TResolvableFields extends TBaseTypeSchema[Key]["resolve"],
    TSelectedFields extends DeepPartial<DeepBoolean<TResolvableFields>>
  >(input: {
    fields: DeepExpand<DeepRemoveArray<TSelectedFields>>;
    args: TBaseTypeSchema[Key]["args"];
  }) => Promise<
    DeepExpand<ReduceResolvedFields<TSelectedFields, TResolvableFields>>
  >;
};

type ClientSdk<TSchema extends MinimalSchema> = {
  query: BaseTypeResolvers<TSchema["Query"]>;
  mutation: BaseTypeResolvers<TSchema["Mutation"]>;
};

const createGraphStackClient = <
  Schema extends MinimalSchema
>(): ClientSdk<Schema> => {
  return {} as any;
};

export default createGraphStackClient;
