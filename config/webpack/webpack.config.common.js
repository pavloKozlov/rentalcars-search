const path = require('path');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = require('../paths');

const config = {
  context: paths.appSrc,
  entry: paths.appIndexJs,
  output: {
    path: paths.appBuild,
    filename: 'static/js/[name].[contenthash].js',
    publicPath: paths.publicOutput,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  // Globals & Plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(paths.appPublic, 'index.html'),
    }),
    new CleanWebpackPlugin(),
  ],
};

module.exports = config;
