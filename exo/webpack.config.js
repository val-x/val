const path = require('path');

module.exports = {
  entry: './web/index.web.js', // Entry point for your web app
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Output directory for the bundled file
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web', // Alias for React Native
    },
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Ensure this includes .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel to transpile JavaScript
        },
      },
    ],
  },
  devtool: 'source-map', // Optional: for better debugging
};