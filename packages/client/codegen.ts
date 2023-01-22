import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://gql.dev.createtotally.io/graphql",
  generates: {
    "./output.ts": {
      plugins: ["typescript", "my-plugin.js"],
    },
  },
};

export default config;
