import Application from './Application';
import app from 'app';
const argv = require('minimist')(process.argv.slice(2));
const debug = require('debug')('browser:app');

app.on('ready', () => {
  const shellStartTime = Date.now();

  // make errors print to terminal
  process.on('uncaughtException', function printUncaughtException(error) {
    console.error(error.message);
    console.error(error.stack);
  });

  debug('Beginning app load.');

  const application = new Application(argv);
  application.open();

  debug(`App load time: ${Date.now() - shellStartTime} ms`);
});
