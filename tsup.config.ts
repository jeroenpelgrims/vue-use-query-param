import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts", "./src/converters/index.ts"],
  format: ["cjs", "esm"],
  dts: {
    resolve: true,
    entry: ["./src/index.ts", "./src/converters/index.ts"],
    compilerOptions: {
      moduleResolution: "node",
    },
  },
  // splitting: false,
  sourcemap: true,
  clean: true,
});
