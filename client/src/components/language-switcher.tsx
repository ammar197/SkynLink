import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <div className="bg-white shadow-md rounded-full p-1 flex">
      <button 
        className={`px-2 py-1 rounded-full text-sm md:text-base ${currentLanguage === 'ar' ? 'bg-primary text-white' : 'text-neutral-600'} font-semibold`}
        onClick={() => changeLanguage('ar')}
      >
        {t('language.ar')}
      </button>
      <button 
        className={`px-2 py-1 rounded-full text-sm md:text-base ${currentLanguage === 'en' ? 'bg-primary text-white' : 'text-neutral-600'} font-semibold`}
        onClick={() => changeLanguage('en')}
      >
        {t('language.en')}
      </button>
    </div>
  );
}
