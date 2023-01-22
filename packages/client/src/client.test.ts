import { expect, test } from "vitest";
import createGraphStackClient from ".";
import { ClientSDK, clientSdkArgMap } from "../codegen-output";
import formatGraphQLQueryString from "./utils/format-graphql-query-string";

const client = createGraphStackClient<ClientSDK>({
  url: "http://localhost:3000/graphql",
  mappings: clientSdkArgMap,
});

test("Executes a simple request using the client sdk", async () => {
  fetchMock.mockOnce("{}");

  await client.query.berry({
    args: { berry: "Cherry" },
    fields: { response: true, status: true },
  });

  expect(fetch).toHaveBeenCalledWith("http://localhost:3000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: formatGraphQLQueryString(`
        query berry($berry: String!) {
          berry(berry: $berry) {
            response
            status
          }
        }
      `),
      variables: { berry: "Cherry" },
    }),
  });
});
