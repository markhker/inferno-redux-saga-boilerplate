const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractCSS = require('extract-text-webpack-plugin')
const root = path.join.bind(path, __dirname)

module.exports = {
  context: path.resolve(__dirname, 'src'),
  cache: true,
  devtool: 'source-map',
  entry: {
    bundle: [
      `webpack-dev-server/client?http://localhost:9000`,
      'webpack/hot/only-dev-server',
      path.join(__dirname, 'src/config/app.js')
    ]
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
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [
          root('src'),
          root('core')
        ],
        query: {
          cacheDirectory: false,
          presets: ['env'],
          plugins: [
            'transform-decorators-legacy',
            'transform-object-rest-spread',
            'transform-class-properties',
            'inferno'
          ]
        }
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
          include: [
            root('src/assets'),
            root('src/components')
          ]
        }
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
        test: /\.css$/,
        use: ExtractCSS.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            },
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractCSS.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true,
                importLoaders: 2,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            },
            'sass-loader'
          ]
        })
      }
    ]
  },
  output: {
    publicPath: 'http://localhost:9000/',
    libraryTarget: 'var',
    pathinfo: true,
    filename: 'bundle.js',
    path: root('build'),
    sourcePrefix: ''
  },
  resolve: {
    alias: {
      'core': root('core')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: root('core/index.html')
    }),
    new ExtractCSS({
      filename: 'bundle.css',
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.WatchIgnorePlugin([
      path.join(__dirname, 'core'),
      path.join(__dirname, 'build')
    ]),
    new webpack.EnvironmentPlugin({
      'DEV': true,
      'BROWSER': true,
      'NODE_ENV': JSON.stringify('development')
    })
  ],
  devServer: {
    publicPath: 'http://localhost:9000/',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Expose-Headers': 'SourceMap,X-SourceMap'
    },
    hot: true,
    open: true,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: false
    },
    stats: {
      colors: true,
      hash: false,
      timings: false,
      version: false,
      chunks: false,
      modules: false,
      children: false,
      chunkModules: false
    },
    port: 9000
  }
}
