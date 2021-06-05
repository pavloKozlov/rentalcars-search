const webpack = require('webpack');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common');
const paths = require('../paths');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 5000;

const config = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: {
      disableDotRule: true,
    },
    port: DEFAULT_PORT,
    compress: true,
    contentBase: paths.appPublic,
    watchContentBase: true,
    publicPath: paths.publicOutput,
    watchOptions: {
      ignored: /node_modules/,
    },
    overlay: { error: true, warning: true },
    open: true,
    hot: true,
  },
  target: 'web',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
};

module.exports = merge(commonConfig, config);
