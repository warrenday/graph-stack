import { parse } from "graphql";
import { print } from "graphql/language/printer";
import capitalize from "../utils/capitalize";

export interface IQueryInput {
  fields: Record<string, any>;
  args: Record<string, any>;
}

export type IBaseQueryType = "query" | "mutate";

const formatQueryString = (query: string) => {
  const document = parse(query);
  return print(document);
};

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
  baseType: IBaseQueryType,
  queryName: string,
  input: IQueryInput
) => {
  const variableName = capitalize([queryName, baseType, "input"]);
  const queryString = `
    ${baseType} ${queryName}($input: ${variableName}!) {
      ${queryName}(input: $input) {
        ${generateGraphqlFieldsString(input.fields)}
      }
    }
  `;
  return formatQueryString(queryString);
};

const createRequest = (
  baseType: IBaseQueryType,
  queryName: string,
  input: IQueryInput
) => {
  return {
    query: generateGraphqlQueryString(baseType, queryName, input),
    variables: {
      input: input.args,
    },
  };
};

export default createRequest;
