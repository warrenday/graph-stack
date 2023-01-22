import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["./vitest-setup.js"],
    outputDiffMaxSize: 1000,
    outputDiffMaxLines: 1000,
    outputTruncateLength: 1000,
    outputDiffLines: 1000,
  },
});
