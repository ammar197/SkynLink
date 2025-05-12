import { useTranslation } from "react-i18next";
import PropertySearch from "../property/property-search";

export default function HeroSection() {
  const { t } = useTranslation();
  
  return (
    <div className="relative bg-primary-dark h-[500px] md:h-[550px] lg:h-[650px] overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080" 
          alt="Istanbul cityscape" 
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 h-full flex flex-col justify-center relative z-10">
        <div className="max-w-xl md:max-w-2xl lg:max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 font-heading">
            <span lang="ar">{t('home.hero.title')}</span>
            <span lang="en">{t('home.hero.title')}</span>
          </h1>
          
          <p className="text-neutral-100 text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-lg md:max-w-xl">
            <span lang="ar">{t('home.hero.subtitle')}</span>
            <span lang="en">{t('home.hero.subtitle')}</span>
          </p>
          
          <PropertySearch isHero={true} />
        </div>
      </div>
    </div>
  );
}
