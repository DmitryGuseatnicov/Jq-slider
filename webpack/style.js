
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: [
                        [   
                          "autoprefixer",
                          { 'overrideBrowserslist': ['> 1%', 'last 2 versions']},
                            "postcss-preset-env",
                        ],
                      ],
                    },
                  },
              },
              "resolve-url-loader",
              "sass-loader",
          ],
        },
      ],
    },
  };
};