import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import { AuthProvider } from './context.jsx';
import App from './components/App.jsx';

const initApp = (store, i18n) => (
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </I18nextProvider>
);

export default initApp;
