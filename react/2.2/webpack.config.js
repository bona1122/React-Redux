const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    compress: true,
    port: 9999,
  },

  module: {
    rules: [
      {
        exclude: /node_modules/, // node_modules 폴더는 제외하고
        test: /\.js$/, // 이 정규식에 매칭되는 애들만 로더를 적용하겠다.
        use: {
          loader: "babel-loader",
          options: {
            // 각 로더마다 옵션 주기
            presets: ["@babel/preset-env", "@babel/preset-react"], // preset-env: es6 -> es5
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "2.3 setup webpack & babel",
      template: "index.html",
    }),
  ],
};
// entry -> module -> plugins -> output
