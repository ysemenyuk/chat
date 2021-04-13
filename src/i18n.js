import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import resources from './locales/index.js';

const i18nOptions = {
  lng: 'en',
  debug: false,
  resources,
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
};

i18n
  .use(initReactI18next)
  .init(i18nOptions);

export default i18n;
