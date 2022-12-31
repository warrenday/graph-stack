import { z } from "zod";
import { test, assertType } from "vitest";
import createGraphStackClient from "../lib/client";
import { createGraphStackServer, createType } from "../lib/server";

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
  Mutation: {},
});

const client = createGraphStackClient<typeof schema>();

test("Client Types", async () => {
  assertType<
    (input: {
      args: { id: string };
      fields: {
        firstName?: boolean;
        age?: boolean;
        address?: {
          street?: boolean;
          postcode?: boolean;
        };
      };
    }) => Promise<{
      firstName?: string;
      age?: number;
      address?: {
        street?: string;
        postcode?: number;
      };
    }>
  >(client.query.user);
});

test("Returns the correct filtered return type", () => {
  const res = client.query.user({
    fields: {
      firstName: true,
      address: {
        street: true,
      },
    },
    args: {
      id: "1234",
    },
  });

  assertType<
    Promise<{
      firstName: string;
      address: {
        street: string;
      };
    }>
  >(res);
});
