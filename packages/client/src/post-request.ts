import type { IGraphStackClientConfig } from ".";

const postRequest = (
  config: IGraphStackClientConfig,
  body: { query: string; variables: {} }
) => {
  return fetch(config.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
};

export default postRequest;
