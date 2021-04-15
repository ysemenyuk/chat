// @ts-nocheck
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { setLocale } from 'yup';
// import faker from 'faker';
// import Cookies from 'js-cookie';
import 'bootstrap';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import initApp from './initApp.jsx';
import initSocket from './socket.js';
import i18n from './i18n.js';

import yupLocale from './locales/yupLocale.js';
import reducer from './store/slices.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

setLocale(yupLocale);

const store = configureStore({ reducer });
initSocket(store);

const userInfo = JSON.parse(localStorage.getItem('userInfo'));

ReactDOM.render(
  initApp(store, i18n, userInfo),
  document.getElementById('chat'),
);
