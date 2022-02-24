const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const styles = require('./webpack/style');
const typeScript = require('./webpack/typeScript');
const devServer = require('./webpack/devServer');
const devtool = require('./webpack/devtool');

let mode = 'development';

let templatePath = path.resolve(__dirname, 'demo');

let entryPoints = {
  app: './app.ts',
  demoPage: './demo-page/demo-page.ts',
};

let plugins = [
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './demo-page/demo-page.html',
    chunks: 'app.ts',
    inject: 'body',
  }),
];

if (process.env.NODE_ENV === 'production') {
  mode = 'production';

  templatePath = path.resolve(__dirname, 'dist');

  entryPoints = {
    app: './app.ts',
  };

  plugins = [new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
  })];
}

const common = merge([
  {
    mode,
    context: path.resolve(__dirname, 'src'),
    entry: entryPoints,
    output: {
      filename: '[name].[contenthash].js',
      path: templatePath,
      clean: true,
    },
    resolve: {
      extensions: ['.ts', '.js', '.scss', '.css'],
    },
    plugins,
  },
  devServer(),
  styles(),
  devtool(),
  typeScript(),
]);

module.exports = function () {
  return common;
};