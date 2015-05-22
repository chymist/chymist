window.onload = function () {
  try {
    var startTime = Date.now();
    // parse url-encoded loadSettings. skip first 14 chars, they're just `?loadSettings=`.
    var loadSettings = JSON.parse(decodeURIComponent(location.search.substr(14)))

    if (loadSettings.devMode) {
      require('coffee-script').register();
    }

    if (!loadSettings.devMode) {
      require('coffee-script').register();
    }

    window.loadSettings = loadSettings;

    require(loadSettings.bootstrapScript);
    require('ipc').sendChannel('window-command', 'window:loaded');
  } catch (e) {
    var currentWindow = require('remote').getCurrentWindow();
    currentWindow.setSize(800, 600);
    currentWindow.center();
    currentWindow.show();
    currentWindow.openDevTools();

    console.error(e.stack || e);
  }
};
