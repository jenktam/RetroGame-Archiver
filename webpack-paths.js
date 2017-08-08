'use strict'

const path = require('path')

//paths to be used throughout the webpack config
module.exports = {
  src: path.join(__dirname, 'client/src'),
  dist: path.join(__dirname, 'client/dist'),
  css: path.join(__dirname, 'client/dist/css')
}
