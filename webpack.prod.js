const path = require('path')
const ExtractCSS = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const root = path.join.bind(path, __dirname)
const webpack = require('webpack')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const buildPath = path.join(__dirname, 'build')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  cache: false,
  entry: {
    bundle: path.join(__dirname, 'src/config/app.js')
  },
  node: {
    global: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  performance: {
    hints: false
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          root('src'),
          root('core')
        ],
        query: {
          cacheDirectory: false,
          presets: [],
          plugins: [
            'transform-decorators-legacy',
            'transform-object-rest-spread',
            'transform-class-properties',
            'inferno'
          ]
        }
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: 'url-loader?limit=100000',
        include: [
          root('src/assets'),
          root('src/components')
        ]
      },
      {
        test: /\.(ttf|otf|eot|woff2?)$/,
        use: 'file-loader',
        include: [
          root('src/assets'),
          root('src/components')
        ]
      },
      {
        test: /\.(css|scss)?$/,
        use: ExtractCSS.extract(['css-loader?sourceMap', 'sass-loader?sourceMap']),
        include: [
          root('src/assets'),
          root('src/components')
        ]
      }
    ]
  },

  output: {
    filename: 'bundle.js',
    sourcePrefix: '',
    path: buildPath,
    publicPath: '/build/'
  },

  resolve: {
    alias: {
      'core': root('core')
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: root('core/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: false,
        minifyCSS: false,
        minifyURLs: true
      }
    }),
    new ExtractCSS({
      filename: 'bundle.css',
      allChunks: false
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new MinifyPlugin({ evaluate: false }, { comments: false }),
    new webpack.EnvironmentPlugin({
      'DEV': false,
      'BROWSER': true,
      'NODE_ENV': JSON.stringify('production')
    })
  ]
}
