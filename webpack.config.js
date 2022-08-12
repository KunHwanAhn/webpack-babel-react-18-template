const { resolve } = require('path');

const { DefinePlugin, HotModuleReplacementPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ESLintPlugin = require('eslint-webpack-plugin');

const MODE_PRODUCTION = 'production';
const MODE_DEVELOPMENT = 'development';

const isProduction = process.env.NODE_ENV === MODE_PRODUCTION;

const config = {
  mode: MODE_DEVELOPMENT,
  target: ['web', 'es5'],
  entry: resolve(__dirname, './src/main.jsx'),
  output: {
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new ESLintPlugin(),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: isProduction ? `"${MODE_PRODUCTION}"` : `"${MODE_DEVELOPMENT}"`,
      },
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, './public/index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        include: [
          resolve(__dirname, 'src'),
        ],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                useBuiltIns: 'usage',
                corejs: 3,
                shippedProposals: true,
              }],
            ],
          },
        },
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              // eslint-disable-next-line global-require
              implementation: require('sass'),
            },
          },
        ],
      },
    ],
  },
};

if (isProduction) {
  config.mode = MODE_PRODUCTION;
} else {
  config.devtool = 'source-map';

  config.plugins = [
    ...config.plugins,
    new HotModuleReplacementPlugin({}),
  ];

  config.devServer = {
    compress: true,
    host: '0.0.0.0',
    port: 8080,
    hot: true,
    liveReload: false,
    historyApiFallback: true,
    static: [
      {
        directory: resolve(__dirname, './assets'),
      },
    ],
    client: {
      overlay: {
        errors: true,
        warnings: true,
      },
    },
  };
}

module.exports = config;
