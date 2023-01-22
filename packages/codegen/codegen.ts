import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://graphql-pokeapi.graphcdn.app",
  generates: {
    "./output.ts": {
      plugins: ["typescript", "dist/plugin.js"],
    },
  },
};

export default config;
