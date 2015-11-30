const main = document.createElement('main');
main.id = 'content';
document.body.appendChild(main);

require('array.prototype.findindex'); // polyfill

import React from 'react';
import {render} from 'react-dom';
import {App} from './components/App';
render(<App />, main);
