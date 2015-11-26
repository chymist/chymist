import {EventEmitter} from 'events';
import AppWindow from './AppWindow';
import path from 'path';
const debug = require('debug')('browser:Application');

export default class Application extends EventEmitter {
  constructor(options = {}) {
    super();
    this.pkgJson = require(path.join(__dirname, '..', '..', 'package.json'));
    this.windows = [];
    this.options = options;
  }

  /**
   * Opens up a new application window
   */
  open() {
    const newWindow = this.createNewWindow(this.options);
    this.addWindow(newWindow);
    newWindow.show();
    newWindow.on('closed', () => {
      this.removeWindow(newWindow);
    });
  }

  /**
   * Performs the raw window creation logic
   */
  createNewWindow(options) {
    const iconPath = path.join(__dirname, '..', '..', 'resources', 'icon.png');
    const appWindow = new AppWindow({
      title: this.pkgJson.productName,
      icon: iconPath,
      width: 1024,
      height: 700,
    });
    return appWindow;
  }

  /**
   * Add a window to the the array of windows.
   *
   * @param {AppWindow} appWindow The window to add to the array
   */
  addWindow(appWindow) {
    this.windows.push(appWindow);
  }

  /**
   * Remove a window from the array of windows.
   *
   * @param {AppWindow} appWindow The window to remove
   */
  removeWindow(appWindow) {
    this.windows.forEach((win, index) => {
      if (win === appWindow) {
        this.windows.splice(index, 1);
      }
    });
  }
}
