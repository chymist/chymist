/* eslint no-var:0 */
var app = require('app');
var path = require('path');
var fs = require('fs');

var argv = require('minimist')(process.argv.slice(2));
var devMode = argv.debug || argv.d;

var cachePath = path.join(__dirname, '..', '..', 'cache');

app.on('ready', function appReady() {
  if (fs.statSyncNoException(cachePath) && !devMode) {
    require('electron-compile').initForProduction(cachePath);
  } else {
    require('electron-compile').init();
  }
  require('./app');
});
