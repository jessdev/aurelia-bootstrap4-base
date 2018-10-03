const path = require("path");
const webpack = require("webpack");
const {
  AureliaPlugin,
  GlobDependenciesPlugin,
  ModuleDependenciesPlugin,
} = require("aurelia-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const extractCSS = new ExtractTextPlugin("vendor.css");
const bundleOutputDir = "./app/dist";

module.exports = (env, argv) => {
  const isDevBuild = !(env && env.prod);
  if (isDevBuild) {
    console.log("webpack is dev build");
  }
  const cssLoader = {
    loader: isDevBuild ? "css-loader" : "css-loader?minimize",
  };
  return [
    {
      target: "web",
      mode: isDevBuild ? "development" : "production",
      entry: { app: ["es6-promise/auto", "aurelia-bootstrapper"] },
      resolve: {
        extensions: [".ts", ".js"],
        modules: ["src-front", "node_modules"],
      },
      output: {
        path: path.resolve(bundleOutputDir),
        publicPath: "dist/",
        filename: "[name].js",
        chunkFilename: "[name].js",
      },
      module: {
        rules: [
          {
            test: /\.(png|gif|jpg|eot|ttf|svg|woff|woff2)(\?|$)/,
            loader: "url-loader?limit=100000",
          },
          {
            test: /\.ts$/i,
            include: [/src-front/, /node_modules/],
            use: "ts-loader",
          },
          { test: /\.html$/i, use: "html-loader" },
          {
            test: /\.css(\?|$)/,
            include: [/node_modules/],
            loader: extractCSS.extract([
              isDevBuild ? "css-loader" : "css-loader?minimize",
            ]),
          },
          {
            test: /\.css$/i,
            exclude: [/node_modules/],
            issuer: /\.html$/i,
            use: cssLoader,
          },
          {
            test: /\.css$/i,
            exclude: [/node_modules/],
            issuer: [{ not: [{ test: /\.html$/i }] }],
            use: ["style-loader", cssLoader],
          },
          //{
          //  // this is necessary for Istanbul to report coverage of Karma testing
          //  test: /\.[jt]s$/i,
          //  loader: "istanbul-instrumenter-loader",
          //  include: path.resolve(__dirname, "src-front"),
          //  exclude: [/\.{spec,test}\.[jt]s$/i],
          //  enforce: "post",
          //  options: { esModules: true },
          //},
        ],
      },
      optimization: {
        splitChunks: {
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendor",
              chunks: "all",
            },
          },
        },
      },
      devtool: isDevBuild ? "inline-source-map" : false,
      plugins: [
        new CleanWebpackPlugin([bundleOutputDir]),
        new webpack.DefinePlugin({ IS_DEV_BUILD: JSON.stringify(isDevBuild) }),
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          "window.jQuery": "jquery",
          moment: "moment",
        }),
        new AureliaPlugin({ aureliaApp: "main" }),
        new GlobDependenciesPlugin({ main: ["src-front/**/*.{ts,html}"] }),
        new ModuleDependenciesPlugin({}),
        extractCSS,
      ],
    },
  ];
};
