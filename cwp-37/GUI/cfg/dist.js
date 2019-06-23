"use strict";

let path = require("path");
let webpack = require("webpack");

let baseConfig = require("./base");
let defaultSettings = require("./defaults");

// Add needed plugins here
let BowerWebpackPlugin = require("bower-webpack-plugin");
//const ExtractTextPlugin = require("extract-text-webpack-plugin");
//var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
//const ExtractTextPlugin = require("extract-text-webpack-plugin");
//const ExtractTextPlugin = require("extract-text-webpack-plugin");
//const extractCSS = new ExtractTextPlugin('bundle.min.css')
//const extractCSS = new ExtractTextPlugin("./dist/[name].css");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

let config = Object.assign({}, baseConfig, {
  entry: {
    app: path.join(__dirname, "../src/index"),
    vendor: [
      "axios",
      "react-notifications",
      "react-confirm-alert",
      "react",
      "react-dom",
      'immutable'
    ] // added to vendor.js,
  },
  cache: false,
  devtool: "sourcemap",
  plugins: [
    new BrowserSyncPlugin({
      // browse to http://localhost:8000/ during development,
      // ./public directory is being served
      host: "localhost",
      port: 8000,
      server: { baseDir: ["public"] }
    }),
    //new ExtractTextPlugin("app.css"),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"), // added to vendor.js
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"'
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: "babel",
  include: [].concat(config.additionalPaths, [path.join(__dirname, "/../src")])
});

module.exports = config;
