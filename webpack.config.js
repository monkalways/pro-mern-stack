const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.jsx',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0, // This is example is too small to create commons chunks
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true,
        },
      },
    },
  },
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: 8000,
    contentBase: 'static',
    publicPath: '/',
    proxy: {
      '/api': 'http://localhost:3000',
    },
    historyApiFallback: true,
  },
  devtool: 'source-map',
};
