import { z } from "zod";
import { createGraphStackServer } from "../lib/server";
import { Address, User } from "./types";

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
          // postcode: 123,
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
  Mutation: {
    createUser: gs
      .type("User")
      .args(z.object({ firstName: z.string(), age: z.number() }))
      .resolver((args) => {
        return {
          firstName: "",
          age: 2,
        };
      }),
  },
});

export type Schema = typeof schema;
