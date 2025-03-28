const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  mode: "production",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    library: {
      type: "module",
    },
    globalObject: "this",
    clean: true,
  },
  experiments: {
    outputModule: true,
  },
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
    "react-dom": "react-dom",
    "@rjsf/core": "@rjsf/core",
    "@blueprintjs/core": "@blueprintjs/core",
    "@blueprintjs/select": "@blueprintjs/select",
    "react-is": "react-is",
    "css-loader": "css-loader",
    lodash: "lodash",
    "@rjsf/validator-ajv8": "@rjsf/validator-ajv8",
  },
};
