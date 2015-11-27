/* eslint no-var:0, vars-on-top:0, func-names:0 */
window.onload = function() {
  // Skip over "?loadSettings="
  var loadSettings = JSON.parse(decodeURIComponent(window.location.search.substr(14)));
  window.loadSettings = loadSettings;
  try {
    require('vm-compatibility-layer');
    require(loadSettings.bootstrapScript); // load render script
    require('ipcRenderer').send('window-command', 'window:loaded');
  } catch (error) {
    console.error(error);
    if (loadSettings.debug) {
      var currentWindow = require('remote').getCurrentWindow();
      currentWindow.center();
      currentWindow.show();
      currentWindow.openDevTools();
    }
  }
};
