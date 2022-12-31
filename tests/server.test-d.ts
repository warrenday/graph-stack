import { test, assertType } from "vitest";
import { createGraphStackServer, createType } from "../lib/server";
import { z } from "zod";

const Address = createType({
  typeDefs: z.object({ street: z.string(), postcode: z.number() }),
});

const User = createType({
  typeDefs: z.object({
    firstName: z.string(),
    age: z.number(),
    address: Address,
  }),
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
});

test("Server Types", () => {
  assertType<{
    User: {
      address: {
        args: {
          [x: string]: any;
        };
        resolve: {
          street: string;
          postcode: number;
        };
      };
    };
    Query: {
      user: {
        args: {
          id: string;
        };
        resolve: {
          firstName: string;
          age: number;
          address: {
            street: string;
            postcode: number;
          };
        };
      };
    };
  }>(schema);
});
