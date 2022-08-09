import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { en, pt_BR } from './translation';

const resources = {
  en: {
    translation: en,
  },
  pt_BR: {
    translation: pt_BR,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
