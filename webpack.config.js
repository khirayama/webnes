const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (env = {}, argv = {}) => {
  const config = {
    entry: {
      mobile: './src/entry.ts',
    },
    output: {
      filename: 'bundle.js',
      path: __dirname + '/dist',
    },
    optimization: {
      minimize: (argv.mode === 'production') ? true : false,
    },
    module: {
      rules: [{
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.json',
          },
        },
      }],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify({
          NODE_ENV: process.env.NODE_ENV,
          API_SERVER_HOST: process.env.API_SERVER_HOST,
        }),
      }),
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: './tsconfig.json',
        }),
      ],
    }
  };

  return config;
};
