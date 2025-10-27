import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import en from './en.json';
import sk from './sk.json';

// Get device locale
const deviceLocale = getLocales()[0]?.languageCode || 'en';

const resources = {
  en: {
    translation: en,
  },
  sk: {
    translation: sk,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: deviceLocale, // Use device language, fallback to English
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    compatibilityJSON: 'v4',
  });

export default i18n;