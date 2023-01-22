import { GraphQLObjectType, GraphQLSchema } from "graphql";
import prettier from "prettier";

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const createQueriesAsString = (
  queries: GraphQLObjectType<any, any>,
  baseType: "Query" | "Mutation"
): string => {
  if (!queries) {
    return "";
  }

  const fields = queries.getFields() || {};
  return Object.keys(fields)
    .map((fieldName) => {
      const field = fields[fieldName];
      const argTypeName = `${baseType}${capitalize(fieldName)}Args`;
      const args = field.args.length ? `args: ${argTypeName},` : "";
      return `${fieldName}: { ${args} resolve: ${baseType}['${fieldName}'] },`;
    })
    .join("\n");
};

const createClientSDKTypes = (schema: GraphQLSchema) => {
  const queries = schema.getQueryType()!;
  const mutations = schema.getMutationType()!;

  return `
      export type ClientSDK = {
        Query: {
          ${createQueriesAsString(queries, "Query")}
        },
        Mutation: {
          ${createQueriesAsString(mutations, "Mutation")}
        },
      } 
    `;
};

const createArgsMap = (schema: GraphQLSchema) => {
  const queries = schema.getQueryType()!;
  const fields = queries.getFields();

  const obj: Record<string, Record<string, string>> = {};
  for (const fieldName in fields) {
    const field = fields[fieldName];
    const args = field.args.reduce((acc, arg) => {
      acc[arg.name] = arg.type.toString();
      return acc;
    }, {} as Record<string, string>);
    obj[fieldName] = args;
  }

  // TODO: add mutations
  return `
    export const clientSdkArgMap = ${JSON.stringify(obj, null, 2)}
  `;
};

const CustomPlugin = {
  plugin(schema: GraphQLSchema) {
    const sdkTypes = createClientSDKTypes(schema);
    const argsMap = createArgsMap(schema);
    const output = sdkTypes + "\n" + argsMap;
    return prettier.format(output, { printWidth: 1000 });
  },
};

export = CustomPlugin;
