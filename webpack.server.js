const path = require('path');
const webpack = require('webpack');
const slsw = require('serverless-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',

  entry: slsw.lib.entries,

  target: 'node',

  externals: [
    'aws-sdk',
  ],

  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, 'build/server'),
    filename: '[name].js',
  },

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
      { test: /\.mjs$/, type: 'javascript/auto', use: [] },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __STAGE__: JSON.stringify(process.env.STAGE),
    }),
    new CopyWebpackPlugin([{
      from: './next.config.js',
    }], { copyUnmodified: true }),
  ],
};
