/**
 * name: index.js
 * author: Deve
 * date: 2021-08-10
 */

import React from 'react';
import App from './app.cjs';

React.hydrate(<App />, document.querySelector('#root'))
