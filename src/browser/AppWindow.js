import {EventEmitter} from 'events';
import BrowserWindow from 'browser-window';
import path from 'path';
import url from 'url';
import _ from 'lodash';
const debug = require('debug')('browser:AppWindow');

export default class AppWindow extends EventEmitter {
  constructor(options) {
    super();
    this.loadSettings = {
      bootstrapScript: require.resolve('../renderer/main'),
    };
    _.extend(this.loadSettings, options);
    const windowOpts = {
      'web-preferences': {
        'subpixel-font-scaling': true,
        'direct-write': true,
      },
    };
    _.extend(windowOpts, this.loadSettings);
    this.window = new BrowserWindow(windowOpts);
  }

  show() {
    const targetPath = path.join(__dirname, '..', '..', 'static', 'index.html');
    const targetUrl = url.format({
      protocol: 'file',
      pathname: targetPath,
      slashes: true,
      query: {
        loadSettings: JSON.stringify(this.loadSettings),
      },
    });
    this.window.loadURL(targetUrl);
    this.window.show();
  }
}
