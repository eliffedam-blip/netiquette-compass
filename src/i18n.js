import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import tr from './locales/tr/translation.json'
import en from './locales/en/translation.json'
import pt from './locales/pt/translation.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      tr: { translation: tr },
      en: { translation: en },
      pt: { translation: pt }
    },
    fallbackLng: 'tr',
    debug: false,
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
