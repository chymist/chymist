const main = document.createElement('main');
main.id = 'content';
document.body.appendChild(main);

require('array.prototype.findindex'); // polyfill

import React from 'react';
import {render} from 'react-dom';
render(<div />, main);
