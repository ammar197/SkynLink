import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/use-auth";
import PropertyForm from "@/components/property/property-form";

export default function AddPropertyPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-center font-heading">
        <span lang="ar">{t('addProperty.title')}</span>
        <span lang="en">{t('addProperty.title')}</span>
      </h1>
      
      <div className="max-w-3xl mx-auto">
        <PropertyForm />
      </div>
    </div>
  );
}
