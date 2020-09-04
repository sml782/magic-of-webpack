const path = require("path");
module.exports = {
  mode:'development',//开发模式
  devtool:false,//不生成 sourcemap
  entry: "./src/app.js",//入口文件
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          },
        },
        include: path.join(__dirname, "src"),
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [],
  devServer: {},
};
