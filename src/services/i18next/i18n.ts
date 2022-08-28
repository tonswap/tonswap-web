import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ru from "./locales/ru.json";

i18n.use(initReactI18next).init({
  resources: {
    en,
    ru,
  },
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
i18n.use(LanguageDetector).init({});
