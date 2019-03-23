// polyfill React in IE < 11
import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
