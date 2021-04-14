import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import { UserProvider } from './context.jsx';
import App from './components/App.jsx';

const initApp = (store, i18n) => (
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <UserProvider>
        <App />
      </UserProvider>
    </Provider>
  </I18nextProvider>
);

export default initApp;
