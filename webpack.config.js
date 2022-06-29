const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const styles = require('./webpack/style');
const typeScript = require('./webpack/typeScript');
const devServer = require('./webpack/devServer');
const devtool = require('./webpack/devtool');
const images = require('./webpack/images')
const pug = require('./webpack/pug');

let mode = 'development';

let templatePath = path.resolve(__dirname, 'demo');

let entryPoints = {
  jqSlider: './app.ts',
  demoPage: './demo-page/demo-page.ts',
};

let plugins = [
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './demo-page/demo-page.pug',
    chunks: 'app.ts',
    inject: 'body',
  }),
];

if (process.env.NODE_ENV === 'production') {
  mode = 'production';

  templatePath = path.resolve(__dirname, 'dist');

  entryPoints = {
    jqSlider: './app.ts',
  };

  plugins = [new MiniCssExtractPlugin({
    filename: '[name].css',
  })];
}

const common = merge([
  {
    mode,
    context: path.resolve(__dirname, 'src'),
    entry: entryPoints,
    output: {
      filename: '[name].js',
      path: templatePath,
      clean: true,
    },
    resolve: {
      extensions: ['.ts', '.js', '.scss', '.css'],
      alias: {
        'components': path.resolve(__dirname, './src/components'),
        'utils': path.resolve(__dirname, './src/utils'),
        'types': path.resolve(__dirname, './src/types'),
      },
    },
    plugins,
  },
  devServer(),
  styles(),
  pug(),
  devtool(),
  images(),
  typeScript(),
]);

module.exports = function () {
  return common;
};
