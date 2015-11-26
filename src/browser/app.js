const argv = require('minimist')(process.argv.slice(2));
const debug = require('debug')('browser:app');
const shellStartTime = Date.now();

// make errors print to terminal
process.on('uncaughtException', function printUncaughtException(error) {
  if (error === null) {
    const error = {};
  }

  if (error.message !== null) {
    console.error(error.message);
  }

  if (error.stack !== null) {
    console.error(error.stack);
  }
});

import Application from './Application';

const application = new Application(argv);
application.open();

debug('App load time: ' + (Date.now() - shellStartTime));
