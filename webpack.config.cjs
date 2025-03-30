const path = require("path");

const common = {
  entry: "./src/index.ts",
  mode: "production",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  externals: {
    react: "react",
    "@rjsf/core": "@rjsf/core",
    "@rjsf/utils": "@rjsf/utils",
    "@blueprintjs/core": "@blueprintjs/core",
    "@blueprintjs/select": "@blueprintjs/select",
    "@rjsf/validator-ajv8": "@rjsf/validator-ajv8",
  },
};

const output = {
  filename: "index.js",
  globalObject: "this",
  clean: true,
};

const cjsConfig = {
  ...common,
  output: {
    ...output,
    path: path.resolve(__dirname, "dist/cjs"),
    library: {
      type: "commonjs2",
    },
  },
  target: "node",
};

const esmConfig = {
  ...common,
  output: {
    ...output,
    path: path.resolve(__dirname, "dist/esm"),
    library: {
      type: "module",
    },
  },
  experiments: {
    outputModule: true,
  },
};

module.exports = [cjsConfig, esmConfig];
