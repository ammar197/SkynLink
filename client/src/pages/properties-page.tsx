import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import PropertyCard from "@/components/property/property-card";
import PropertySearch from "@/components/property/property-search";
import { Property } from "@shared/schema";

export default function PropertiesPage() {
  const { t } = useTranslation();
  const [location] = useLocation();
  
  // Parse URL search params
  const searchParams = new URLSearchParams(location.split("?")[1] || "");
  const areaId = searchParams.get("areaId");
  const type = searchParams.get("type");
  const gender = searchParams.get("gender");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  
  // Build query string for API
  const queryString = new URLSearchParams();
  if (areaId) queryString.append("areaId", areaId);
  if (type) queryString.append("type", type);
  if (gender) queryString.append("gender", gender);
  if (minPrice) queryString.append("minPrice", minPrice);
  if (maxPrice) queryString.append("maxPrice", maxPrice);
  
  // Fetch properties with filters
  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: [`/api/properties?${queryString.toString()}`],
  });
  
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 font-heading">
        <span lang="ar">{t('properties.title')}</span>
        <span lang="en">{t('properties.title')}</span>
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar with filters - On mobile will be at the top */}
        <div className="order-1 lg:order-none">
          <PropertySearch className="mb-6 lg:mb-0" />
        </div>
        
        {/* Properties grid */}
        <div className="lg:col-span-3 order-2">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 sm:py-16 bg-white rounded-lg shadow">
              <i className="fas fa-search-minus text-3xl sm:text-4xl text-neutral-400 mb-3 sm:mb-4"></i>
              <p className="text-lg sm:text-xl font-semibold text-neutral-700">
                <span lang="ar">{t('properties.noResults')}</span>
                <span lang="en">{t('properties.noResults')}</span>
              </p>
              <p className="text-neutral-500 mt-2 px-4">
                <span lang="ar">حاول تغيير معايير البحث أو تصفح جميع العقارات المتاحة</span>
                <span lang="en">Try changing your search criteria or browse all available properties</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
