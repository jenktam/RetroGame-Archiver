'use strict'

const merge = require('webpack-merge')

const PATHS = require('./webpack-paths')
const loaders = require('./webpack-loaders')

//common configuation set up, which defines common properties for development(using webpack-dev-server) and build(using bundle served by Node.js)
const common = {
  entry: { //entry file index.js in /client/src
    app: ['babel-polyfill', PATHS.src]
  },
  output: { //output defines where bundle output gets created
    path: PATHS.dist,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      loaders.babel, //Transpiler
      loaders.css, //our bundle will contain the css
      loaders.font, //load fonts
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'] //extensions to resolve
  }
}

let config

//switch defines different configuration as development requires webpack-dev-server
switch(process.env.NODE_ENV) {
  //run our bundle served by Node.
  case 'build':
    config = merge(
      common,
      { devtool: 'source-map'} //SourceMaps on separate file
    )
    break

  //development runs webpack-dev-server to better debug info inside our sourceMap thanks to eval-source-map
  case 'development':
    config = merge(
      common,
      { devtool: 'eval-source-map' }, //default value
      loaders.devServer({
        host: process.env.host,
        post: 3000
      })
    )
}

//export the config
module.exports = config
