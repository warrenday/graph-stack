import { IGraphStackClientConfig } from ".";
import formatGraphQLQueryString from "./utils/format-graphql-query-string";

export interface IQueryInput {
  fields: Record<string, any>;
  args: Record<string, any>;
}

export type IBaseQueryType = "query" | "mutate";

const generateGraphqlFieldsString = (fields: Record<string, any>): string => {
  return Object.keys(fields)
    .map((key) => {
      if (typeof fields[key] === "object") {
        return `${key} {
          ${generateGraphqlFieldsString(fields[key])}
        }`;
      }
      return key;
    })
    .join("\n");
};

const generateGraphqlQueryString = (
  mappings: IGraphStackClientConfig["mappings"],
  baseType: IBaseQueryType,
  queryName: string,
  input: IQueryInput
) => {
  const queryMappings = mappings[queryName];
  const queryArgsLevel1 = Object.keys(input.args)
    .map((argName) => {
      return `$${argName}: ${queryMappings[argName]}`;
    })
    .join(", ");
  const queryArgsLevel2 = Object.keys(input.args)
    .map((argName) => {
      return `${argName}: $${argName}`;
    })
    .join(", ");

  const queryString = `
    ${baseType} ${queryName}(${queryArgsLevel1}) {
      ${queryName}(${queryArgsLevel2}) {
        ${generateGraphqlFieldsString(input.fields)}
      }
    }
  `;
  return formatGraphQLQueryString(queryString);
};

const createRequestPayload = (
  mappings: IGraphStackClientConfig["mappings"],
  baseType: IBaseQueryType,
  queryName: string,
  input: IQueryInput
) => {
  return {
    query: generateGraphqlQueryString(mappings, baseType, queryName, input),
    variables: input.args,
  };
};

export default createRequestPayload;
