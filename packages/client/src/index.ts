import { IClientSdk, IMinimalSchema } from "./client-sdk";
import createRequestPayload, {
  IQueryInput,
  IBaseQueryType,
} from "./create-request-payload";
import postRequest from "./post-request";

export interface IGraphStackClientConfig {
  url: string;
  headers?: Record<string, string>;
  mappings: Record<string, Record<string, string>>;
}

const dynamicMethodCall = (
  cb: (queryName: string, value: IQueryInput) => void
) => {
  return new Proxy(
    {},
    {
      get: (obj, prop: string) => {
        return (input: IQueryInput) => {
          return cb(prop, input);
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
    const queryPayload = createRequestPayload(
      config.mappings,
      baseType,
      queryName,
      input
    );
    return postRequest(config, queryPayload);
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
