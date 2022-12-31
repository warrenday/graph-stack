import createGraphStackClient from "../lib/client";
import type { Schema } from "./server";

const client = createGraphStackClient<Schema>();

const execute = async () => {
  const res = await client.query.user({
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

  res.firstName;
  res.address.street;
  // res.address.postcode;
};
