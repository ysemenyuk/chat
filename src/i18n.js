import i18n from 'i18next';

import Backend from 'i18next-chained-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import { initReactI18next } from 'react-i18next';

import resources from './locales/index.js';

const i18nOptions = {
  // lng: 'en',
  // fallbackLng: 'en',
  debug: true,
  resources,
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(i18nOptions);

export default i18n;
