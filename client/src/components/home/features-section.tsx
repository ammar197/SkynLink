import { useTranslation } from "react-i18next";

export default function FeaturesSection() {
  const { t } = useTranslation();
  
  return (
    <section className="mb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary-light rounded-full flex items-center justify-center text-primary-dark">
            <i className="fas fa-home text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold mb-3 font-heading">
            <span lang="ar">{t('home.features.housingOptions.title')}</span>
            <span lang="en">{t('home.features.housingOptions.title')}</span>
          </h3>
          <p className="text-neutral-600">
            <span lang="ar">{t('home.features.housingOptions.description')}</span>
            <span lang="en">{t('home.features.housingOptions.description')}</span>
          </p>
        </div>
        
        {/* Feature 2 */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary-light rounded-full flex items-center justify-center text-primary-dark">
            <i className="fas fa-map-marker-alt text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold mb-3 font-heading">
            <span lang="ar">{t('home.features.strategicLocations.title')}</span>
            <span lang="en">{t('home.features.strategicLocations.title')}</span>
          </h3>
          <p className="text-neutral-600">
            <span lang="ar">{t('home.features.strategicLocations.description')}</span>
            <span lang="en">{t('home.features.strategicLocations.description')}</span>
          </p>
        </div>
        
        {/* Feature 3 */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary-light rounded-full flex items-center justify-center text-primary-dark">
            <i className="fas fa-shield-alt text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold mb-3 font-heading">
            <span lang="ar">{t('home.features.trustedCommunication.title')}</span>
            <span lang="en">{t('home.features.trustedCommunication.title')}</span>
          </h3>
          <p className="text-neutral-600">
            <span lang="ar">{t('home.features.trustedCommunication.description')}</span>
            <span lang="en">{t('home.features.trustedCommunication.description')}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
