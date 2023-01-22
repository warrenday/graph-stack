import dedent from "dedent";
import { expect, test } from "vitest";
import createRequest from "./create-request-payload";

test("Creates a basic request", () => {
  const request = createRequest("query", "user", {
    args: { id: "1" },
    fields: { firstName: true },
  });

  expect(request).toEqual({
    query: dedent(`
      query user($input: UserQueryInput!) {
        user(input: $input) {
          firstName
        }
      }
    `),
    variables: {
      input: {
        id: "1",
      },
    },
  });
});

test("Creates a request with deep request fields", () => {
  const request = createRequest("query", "user", {
    args: { id: "1" },
    fields: {
      firstName: true,
      orders: { id: true },
      address: {
        street: true,
        line2: true,
        city: true,
        country: { code: true },
      },
    },
  });

  expect(request).toEqual({
    query: dedent(`
      query user($input: UserQueryInput!) {
        user(input: $input) {
          firstName
          orders {
            id
          }
          address {
            street
            line2
            city
            country {
              code
            }
          }
        }
      }
    `),
    variables: {
      input: {
        id: "1",
      },
    },
  });
});

test("Creates a request with deep request arguments", () => {
  const request = createRequest("query", "user", {
    args: {
      data: { id: "1" },
      pagination: { limit: 10, offset: 0 },
    },
    fields: {
      firstName: true,
    },
  });

  expect(request).toEqual({
    query: dedent(`
      query user($input: UserQueryInput!) {
        user(input: $input) {
          firstName
        }
      }
    `),
    variables: {
      input: {
        data: { id: "1" },
        pagination: {
          limit: 10,
          offset: 0,
        },
      },
    },
  });
});
