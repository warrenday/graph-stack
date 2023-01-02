import capitalize from "../utils/capitalize";
import { IClientSdk, IMinimalSchema } from "./client-sdk";
import createRequest, { IQueryInput, IBaseQueryType } from "./create-request";

interface IGraphStackClientConfig {
  url: string;
}

const dynamicMethodCall = (
  cb: (queryName: string, value: IQueryInput) => void
) => {
  return new Proxy(
    {},
    {
      get: (obj, prop: string) => {
        return (input: IQueryInput) => {
          cb(prop, input);
        };
      },
    }
  );
};

const requestHandler = (
  config: IGraphStackClientConfig,
  baseType: IBaseQueryType
) => {
  return dynamicMethodCall((queryName, input) => {
    console.log({ queryName, input });

    console.log(createRequest(baseType, queryName, input));
  });
};

const createGraphStackClient = <Schema extends IMinimalSchema>(
  config: IGraphStackClientConfig
): IClientSdk<Schema> => {
  return {
    query: requestHandler(config, "query"),
    mutation: requestHandler(config, "mutate"),
  } as any;
};

export default createGraphStackClient;
