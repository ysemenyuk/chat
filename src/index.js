// @ts-nocheck
import ReactDOM from 'react-dom';
import 'bootstrap';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';

import initApp from './initApp.jsx';
import initSocket from './socket.js';
import i18n from './i18n.js';
import setupYup from './setupYup.js';
import createStore from './store/index.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

setupYup(i18n);

const store = createStore();

const socket = initSocket(store);

const userInfo = JSON.parse(localStorage.getItem('userInfo'));

ReactDOM.render(
  initApp(store, i18n, userInfo, socket),
  document.getElementById('chat'),
);
