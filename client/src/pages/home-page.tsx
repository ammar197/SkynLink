import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import HeroSection from "@/components/home/hero-section";
import FeaturesSection from "@/components/home/features-section";
import NeighborhoodsSection from "@/components/home/neighborhoods-section";
import HowItWorksSection from "@/components/home/how-it-works-section";
import OwnerCTASection from "@/components/home/owner-cta-section";
import TestimonialsSection from "@/components/home/testimonials-section";
import PropertyCard from "@/components/property/property-card";
import { Property } from "@shared/schema";

export default function HomePage() {
  const { t } = useTranslation();
  
  // Fetch featured properties (limited to 3)
  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  // Get only 3 properties for featured section
  const featuredProperties = properties.slice(0, 3);

  return (
    <div>
      <HeroSection />
      
      <main className="max-w-5xl mx-auto px-4 py-8">
        <FeaturesSection />
        
        {/* Featured Properties Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-heading">
              <span lang="ar">{t('home.featuredProperties.title')}</span>
              <span lang="en">{t('home.featuredProperties.title')}</span>
            </h2>
            <Link href="/properties" className="text-primary hover:text-primary-dark font-medium transition">
              <span lang="ar">{t('common.viewAll')}</span>
              <span lang="en">{t('common.viewAll')}</span>
              <i className="fas fa-arrow-right ms-1 rtl:rotate-180"></i>
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-neutral-600">
                <span lang="ar">لا توجد عقارات متاحة حالياً</span>
                <span lang="en">No properties available at the moment</span>
              </p>
            </div>
          )}
        </section>
        
        <NeighborhoodsSection />
        <HowItWorksSection />
        <OwnerCTASection />
        <TestimonialsSection />
      </main>
    </div>
  );
}
