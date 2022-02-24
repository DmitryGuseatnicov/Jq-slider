module.exports = function () {
  return {
    devServer: {
      static: './demo',
      open: '/index.html',
      hot: false,
    },
  };
};
