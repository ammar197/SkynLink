import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export function useLanguage() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    changeLanguage(newLang);
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", lang);
  };

  useEffect(() => {
    // Set initial direction based on current language
    document.documentElement.setAttribute("dir", i18n.language === "ar" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", i18n.language);
  }, [i18n.language]);

  return {
    currentLanguage: i18n.language,
    toggleLanguage,
    changeLanguage
  };
}
