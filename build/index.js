const path = require('path')
const { promisify } = require('util')
const webpack = require('webpack')
const { DefinePlugin, optimize: { UglifyJsPlugin } } = webpack

const startWebpack = promisify(webpack)

const entry = { 'quivy': './src' }

const outputUMD = {
  filename: '[name].js',
  path: path.resolve(__dirname, '../dist'),
  library: 'quivy',
  libraryTarget: 'umd',
  umdNamedDefine: true
}

const moduleES6 = {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: 'babel-loader'
    }
  ]
}

function buildUMD() {
  return startWebpack({
    entry,
    output: outputUMD,
    module: moduleES6,
    plugins: [
      new DefinePlugin({
        'process.env': {
          'NODE_ENV': '\'development\''
        }
      })
    ],
    target: 'web'
  })
}

function buildUMDMinified() {
  return startWebpack({
    entry,
    output: Object.assign({}, outputUMD, {
      filename: '[name].min.js'
    }),
    module: moduleES6,
    plugins: [
      new DefinePlugin({
        'process.env': {
          'NODE_ENV': '\'production\''
        }
      }),
      new UglifyJsPlugin({ mangle: false })
    ],
    target: 'web'
  })
}

Promise.all([
  buildUMD(),
  buildUMDMinified(),
]).then(() => console.log('Okay'))
