// https://github.com/diegohaz/arc/wiki/Webpack
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')
const HappyPack = require('happypack')
const mergeWith = require('lodash/mergeWith')
const isArray = require('lodash/isArray')


const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 4200
const sourceDir = process.env.SOURCE || 'src'
const publicPath = `/${process.env.PUBLIC_PATH || ''}/`.replace('//', '/')
const sourcePath = path.join(process.cwd(), sourceDir)
const outputPath = path.join(process.cwd(), 'dist')

function customizer(objValue, srcValue) {
  if (isArray(objValue)) {
    return objValue.concat(srcValue)
  }
  return undefined
}

const wpConfig = {
  base: {
    module: {
      rules: [
        { test: /\.jsx?$/, exclude: /node_modules/, use: 'happypack/loader' },
        { test: /\.(png|jpe?g|svg|woff2?|ttf|eot)$/, loader: 'url-loader?limit=8000' },
        { test: /\.svg$/i, use: 'raw-loader' },
        {
          test: /\.css$/i,
          loader: 'css-loader',
          options: {
            // Using `local` value has same effect like using `modules: true`
            modules: 'global',
          },
        },
      ],
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(process.cwd(), 'public/index.html'),
      }),
      new HappyPack({
        loaders: ['babel-loader'],
      }),
      new webpack.DefinePlugin({
        NODE_ENV: process.env.NODE_ENV,
        PUBLIC_PATH: publicPath.replace(/\/$/, ''),
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      modules: [].concat(sourceDir, ['node_modules']),
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
    },
    entry: {
      app: [sourcePath],
    },
    output: {
      filename: '[name].js',
      path: outputPath,
      publicPath,
    },
  },
  development: {
    mode: 'development',
    plugins: [
      new webpack.HotModuleReplacementPlugin({
        fullBuildTimeout: 200,
      }),
    ],
    entry: {
      app: ['webpack/hot/only-dev-server'],
    },
    devtool: 'cheap-module-source-map',
    devServer: {
      hot: true,
      inline: true,
      historyApiFallback: { index: publicPath },
      contentBase: 'public',
      headers: { 'Access-Control-Allow-Origin': '*' },
      host,
      port,
      stats: 'errors-only',
      public: host,
    },
    optimization: {
      namedModules: true,
    },
  },
  production: {
    mode: 'production',
    plugins: [
      new WebpackMd5Hash(),
    ],
    output: {
      filename: '[name].[chunkhash].js',
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: false,
          parallel: true,
          sourceMap: true,
          extractComments: true,
        }),
      ],
      splitChunks: {
        name: 'vendor',
        minChunks: 2,
      },
    },
  },
}

const config = mergeWith(
  {},
  wpConfig.base,
  wpConfig[process.env.NODE_ENV],
  customizer,
)

module.exports = config
