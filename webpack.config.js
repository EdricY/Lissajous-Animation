
const path = require('path');

module.exports = [
  {
    mode: 'development',
    entry: './src/main.js',
    output: {
      path: path.resolve('dist'),
      filename: 'lissajous.js',
      publicPath: '/dist/'
    },
    resolve: {
      extensions: ['.js'],
    },
    devServer: {
      contentBase: path.join(__dirname, '.'),
      compress: true,
      port: 8000
    }
  
  },
  {
    mode: 'development',
    entry: './src/main.js',
    output: {
      path: path.resolve('dist'),
      filename: 'lissajous.es.js',
      libraryTarget: 'commonjs2',
      libraryExport: 'default',
    },
    resolve: {
      extensions: ['.js'],
    },
  },
]