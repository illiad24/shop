import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
export type LanguageTypes = "en" | "ua";

const supportedLanguages: LanguageTypes[] = ["en", "ua"];
import en from "./locales/en.json";
import ua from "./locales/ua.json";
const stored = localStorage.getItem("i18nLanguage");

const selectedLanguage: LanguageTypes = supportedLanguages.includes(
  stored as LanguageTypes,
)
  ? (stored as LanguageTypes)
  : "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ua: { translation: ua },
  },
  lng: selectedLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  detection: {
    order: ["localStorage", "navigator"],
    caches: ["localStorage"],
  },
});
export default i18n;
