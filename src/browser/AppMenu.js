import Menu from 'menu';
import Handlebars from 'handlebars';
import _ from 'lodash';
import path from 'path';
import season from 'season';
import {EventEmitter} from 'events';
const debug = require('debug')('browser:AppMenu');

export default class AppMenu extends EventEmitter {
  constructor(options) {
    super();
    const menuFilePath = path.join(__dirname, '..', '..', 'menus',
      `${process.platform}`);
    const menuFile = season.resolve(menuFilePath);
    debug(menuFile);
    this.template = this.compileTemplate(season.readFileSync(menuFile).menu, options);
  }

  attachToWindow() {
    debug('attaching menu to window');
    this.menu = Menu.buildFromTemplate(_.cloneDeep(this.template));
    Menu.setApplicationMenu(this.menu);
  }

  wireUpCommand(item, command) {
    item.click = () => this.emit(command);
  }

  compileTemplate(items, options) {
    for (const item of items) {
      if (item.metadata === null) {
        item.metadata = {};
      }
      if (item.label) {
        const compiledLabel = Handlebars.compile(item.label)(options);
        debug(`compiled menu item ${item.label} to ${compiledLabel}`);
        item.label = compiledLabel;
      }
      if (item.command) {
        this.wireUpCommand(item, item.command);
      }
      if (item.submenu) {
        this.compileTemplate(item.submenu, options); // recurse
      }
    }
    return items;
  }
}
