import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import UserProvider from './context/UserProvider.jsx';
import SocketProvider from './context/SocketProvider.jsx';
import App from './App.jsx';

const initApp = (store, i18n, userInfo, socket) => (
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <UserProvider userInfo={userInfo}>
        <SocketProvider socket={socket}>
          <App />
        </SocketProvider>
      </UserProvider>
    </Provider>
  </I18nextProvider>
);

export default initApp;
