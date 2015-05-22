window.onload = function () {
  try {
    /* foo */
  } catch (e) {
    var currentWindow = require('remote').getCurrentWindow();
    currentWindow.setSize(800, 600);
    currentWindow.center();
    currentWindow.show();
    currentWindow.openDevTools();

    console.error(e.stack || e);
  }
};
