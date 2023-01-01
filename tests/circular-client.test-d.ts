import { z } from "zod";
import { test, assertType } from "vitest";
import createGraphStackClient from "../lib/client";
import { createGraphStackServer } from "../lib/server";

interface IAddress {
  street: string;
  postcode: number;
  user: IUser;
}

interface IUser {
  firstName: string;
  age: number;
  address: IAddress;
}

const Address: z.ZodType<IAddress> = z.lazy(() =>
  z.object({ street: z.string(), postcode: z.number(), user: User })
);

const User: z.ZodType<IUser> = z.lazy(() =>
  z.object({
    firstName: z.string(),
    age: z.number(),
    address: Address,
  })
);

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

test("Returns the correct filtered return type for a circular graph", () => {
  const res = client.query.user({
    fields: {
      firstName: true,
      address: {
        street: true,
        user: {
          firstName: true,
          address: {
            postcode: true,
          },
        },
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
        user: {
          firstName: string;
          address: {
            postcode: number;
          };
        };
      };
    }>
  >(res);
});
