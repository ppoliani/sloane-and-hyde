const webpack = require('webpack');
const path = require('path');
const DotenvPlugin = require('webpack-dotenv-plugin');

const sourcePath = path.join(__dirname, './');
const distPath = path.join(__dirname, './dist');

module.exports = () => {
  const isProd = process.env.NODE_ENV === 'production';

  const plugins = [
    new webpack.DefinePlugin({
      WEB3_HTTP_PROVIDER: JSON.stringify(process.env.WEB3_HTTP_PROVIDER),
      DATA_TO_SIGN: JSON.stringify(process.env.DATA_TO_SIGN),
      API_URL: JSON.stringify(process.env.API_URL),
      ACCESS_TOKEN_KEY: JSON.stringify(process.env.ACCESS_TOKEN_KEY),
      ACCOUNT_DATA_KEY: JSON.stringify(process.env.ACCOUNT_DATA_KEY),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),
    new webpack.NamedModulesPlugin()
  ];

  if(!isProd) {
    plugins.push(
      new webpack.HotModuleReplacementPlugin()
    )
  }

  return {
    devtool: isProd ? 'source-map' : 'source-map',
    context: sourcePath,

    entry: {
      app: [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://localhost:${process.env.PORT}`,
        'webpack/hot/only-dev-server',
        'babel-polyfill',
        './src/view/Index.jsx'
      ],
      vendor: [
        'react',
        'react-dom',
        'react-redux',
        'immutable',
        'whatwg-fetch'
      ]
    },

    output: {
      path: distPath,
      publicPath: '/',
      filename: '[name].bundle.js',
    },

    module: {
      rules: [
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: {
            loader: 'file-loader',
            query: {
              name: '[name].[ext]'
            },
          },
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader',
          include: /node_modules/
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader'
          ],
        },
      ]
    },

    resolve: {
      extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
      modules: [
        path.resolve(__dirname, 'node_modules'),
        sourcePath
      ],
    },

    plugins,

    performance: isProd && {
      maxAssetSize: 100,
      maxEntrypointSize: 300,
      hints: 'warning',
    },

    stats: {
      colors: {
        green: '\u001b[32m',
      },
      errorDetails: true,
    },

    devServer: {
      contentBase: path.resolve(__dirname, './'),
      historyApiFallback: true,
      port: process.env.PORT,
      compress: false,
      inline: true,
      hot: true,
      stats: {
        assets: true,
        children: false,
        chunks: false,
        hash: false,
        modules: false,
        publicPath: true,
        timings: true,
        version: false,
        warnings: true,
        colors: {
          green: '\u001b[32m',
        }
      }
    }
  };
};
