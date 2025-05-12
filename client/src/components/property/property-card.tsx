import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Property } from "@shared/schema";
import PropertyTypeBadge from "./property-type-badge";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition duration-300 hover:shadow-lg property-card">
      <Link href={`/properties/${property.id}`} className="block">
        <div className="h-48 sm:h-52 overflow-hidden relative">
          <img 
            src={property.imageUrl} 
            alt={property.title} 
            className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
          />
          <div className="absolute top-3 right-3">
            <PropertyTypeBadge type={property.type} />
          </div>
        </div>
        
        <div className="p-3 sm:p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-base sm:text-lg truncate max-w-[65%]">
              <span lang="ar">{property.titleAr}</span>
              <span lang="en">{property.title}</span>
            </h3>
            <div className="text-secondary font-bold whitespace-nowrap rtl:mr-2 ltr:ml-2 text-sm sm:text-base">
              <span>{property.price} ₺</span>
              <span className="text-neutral-500 text-xs sm:text-sm block text-right">
                <span lang="ar">{t('home.featuredProperties.monthly')}</span>
                <span lang="en">{t('home.featuredProperties.monthly')}</span>
              </span>
            </div>
          </div>
          
          <div className="text-neutral-500 text-xs sm:text-sm mb-3 flex items-center">
            <i className="fas fa-map-marker-alt me-1"></i>
            <span lang="ar" className="truncate">{property.locationAr}</span>
            <span lang="en" className="truncate">{property.location}</span>
          </div>
          
          <div className="flex items-center justify-between text-xs sm:text-sm text-neutral-600 border-t border-neutral-200 pt-3">
            <div>
              <i className="fas fa-bed me-1"></i>
              <span>
                {property.rooms} {property.rooms > 1 ? t('common.rooms') : t('common.rooms')}
              </span>
            </div>
            <div>
              <i className="fas fa-bath me-1"></i>
              <span>
                {property.bathrooms} {property.bathrooms > 1 ? t('common.bathrooms') : t('common.bathrooms')}
              </span>
            </div>
            <div>
              {property.gender === 'male' ? (
                <><i className="fas fa-male me-1"></i><span lang="ar">{t('genderTypes.male')}</span><span lang="en">{t('genderTypes.male')}</span></>
              ) : property.gender === 'female' ? (
                <><i className="fas fa-female me-1"></i><span lang="ar">{t('genderTypes.female')}</span><span lang="en">{t('genderTypes.female')}</span></>
              ) : (
                <><i className="fas fa-users me-1"></i><span lang="ar">{t('genderTypes.mixed')}</span><span lang="en">{t('genderTypes.mixed')}</span></>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
