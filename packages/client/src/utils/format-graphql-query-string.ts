import { parse } from "graphql";
import { print } from "graphql/language/printer";

const formatGraphQLQueryString = (query: string) => {
  const document = parse(query);
  return print(document);
};

export default formatGraphQLQueryString;
