import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import en from "./public/locales/en.json";
import it from "./public/locales/it.json";
import de from "./public/locales/de.json";
import fr from "./public/locales/fr.json";

const resources = {
  en: { translation: en },
  it: { translation: it },
  de: { translation: de },
  fr: { translation: fr },
};

// Only initialize if not already initialized
if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      lng: "it",
      fallbackLng: "it",
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
      },
      // Disable detection on initialization to prevent hydration mismatch
      react: {
        useSuspense: false,
      },
    });
}

export default i18n;
