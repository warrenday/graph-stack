import { test } from "vitest";
import { z } from "zod";
import createGraphStackClient from "../../lib/client";
import { createGraphStackServer } from "../../lib/server";

const Address = z.object({ street: z.string(), postcode: z.number() });

const User = z.object({
  firstName: z.string(),
  age: z.number(),
  address: Address,
});

const gs = createGraphStackServer({
  Address,
  User,
});

const schema = gs.resolvers({
  User: {
    address: gs
      .type("Address")
      .args()
      .resolver(() => {
        return {
          street: "111",
        };
      }),
  },
  Query: {
    user: gs
      .type("User")
      .args(z.object({ id: z.string() }))
      .resolver((args) => {
        return {
          firstName: "",
          age: 2,
        };
      }),
  },
  Mutation: {},
});

const client = createGraphStackClient<typeof schema>({
  url: "http://localhost:3000/graphql",
});

test("Executes a simple request using the client sdk", async () => {
  const res = await client.query.user({
    args: { id: "1" },
    fields: { firstName: true },
  });

  console.log(res);
});
