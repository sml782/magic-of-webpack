const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },
  resolveLoader: {
    modules: ['node_modules', './cusom-loader'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'js-loader/4.validate-param.js',
            options: {
              total: '7',
            },
          },
          {
            loader: 'js-loader/3.param.js',
            options: {
              title: '随便写个标题怎么样',
            },
          },
          'js-loader/2.async.js',
          'js-loader/1.sync.js',
        ],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'lessLoader'],
      },
    ],
  },
};
