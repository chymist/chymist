import {EventEmitter} from 'events';

export default class Application extends EventEmitter {
  constructor(options = {}) {
    super();
  }

  open() {}
}
