const path = require('path');
const webpack = require('webpack');

module.exports = {
  // ...existing code...
  resolve: {
    // ...existing code...
    fallback: {
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
      // añade otros fallbacks si el build los pide (crypto, util, etc.)
    },
  },
  plugins: [
    // ...existing code...
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
};