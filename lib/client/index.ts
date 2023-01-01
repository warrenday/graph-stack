import { IClientSdk, IMinimalSchema } from "./client-sdk";

interface IGraphStackClientConfig {
  url: string;
}

const createGraphStackClient = <Schema extends IMinimalSchema>(
  config: IGraphStackClientConfig
): IClientSdk<Schema> => {
  return {} as any;
};

export default createGraphStackClient;
