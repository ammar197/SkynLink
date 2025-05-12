import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

export default function NeighborhoodsSection() {
  const { t } = useTranslation();
  
  // Fetch areas
  const { data: areas = [] } = useQuery<any[]>({
    queryKey: ["/api/areas"],
  });
  
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-6 font-heading">
        <span lang="ar">{t('home.neighborhoods.title')}</span>
        <span lang="en">{t('home.neighborhoods.title')}</span>
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {areas.map((area: any) => (
          <Link key={area.id} href={`/properties?areaId=${area.id}`} className="relative rounded-lg overflow-hidden h-40 bg-neutral-800 group">
            <img 
              src={area.imageUrl} 
              alt={area.nameEn} 
              className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-xl font-bold font-heading drop-shadow-lg">
                <span lang="ar">{area.nameAr}</span>
                <span lang="en">{area.nameEn}</span>
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
