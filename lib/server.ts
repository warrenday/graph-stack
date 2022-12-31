import { z } from "zod";
import { DeepPartial } from "./types";

type TypeDefs = z.ZodObject<z.ZodRawShape>;

interface ITypeInput {
  typeDefs: TypeDefs;
}

const createType = <T extends TypeDefs>(type: { typeDefs: T }) => {
  return type["typeDefs"];
};

const createGraphStackServer = <
  TTypeDefs extends Record<string, ITypeInput["typeDefs"]>
>(
  schema: Readonly<TTypeDefs>
) => {
  return {
    resolvers: <TResolvers>(res: TResolvers): TResolvers => {
      return "" as any;
    },
    type: <TTypeName extends keyof TTypeDefs>(typeName: TTypeName) => {
      return {
        args: <TValidator extends TypeDefs>(validator?: TValidator) => {
          return {
            resolver: <
              TResolveValue extends z.infer<TTypeDefs[TTypeName]>,
              TParsedValue extends z.infer<TTypeDefs[TTypeName]>,
              TArgs = z.infer<TValidator>
            >(
              fn: (args: TArgs) => DeepPartial<TResolveValue>
            ) => {
              // validator?.parse({}
              fn({} as any);

              return {
                args: {} as TArgs,
                resolve: {} as TParsedValue,
              };
            },
          };
        },
      };
    },
  };
};

export { createType, createGraphStackServer };
