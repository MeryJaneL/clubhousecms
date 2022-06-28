const path = require('path');
const glob = require('glob');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: glob.sync('./src/module/bundles/**.bundle.tsx').reduce(function (obj, el) {
    obj[path.parse(el).name] = el;
    return obj;
  }, {}),
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: 'tsconfig-for-webpack-config.json',
        },
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          // name: "[hash].[ext]",
          outputPath: 'assets',
          publicPath: '/assets',
        },
      },
    ],
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    libraryTarget: 'commonjs',
    filename: '[name].js',
    path: path.resolve(__dirname, '.hosting/dist'),
  },
  externals: {
    react: 'react',
  },
};
