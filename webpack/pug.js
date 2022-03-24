module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.pug$/,
          use: [
            {
              loader: 'simple-pug-loader',
              options: {
                pretty: true,
              },
            },
          ],
        },
      ],
    },
  };
};
