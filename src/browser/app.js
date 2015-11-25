const argv = require('minimist')(process.argv.slice(2));
const debug = require('debug')('browser:app');
const shellStartTime = Date.now();

import Application from './Application';

const application = new Application(argv);
application.open();

debug('App load time: ' + (Date.now() - shellStartTime));
