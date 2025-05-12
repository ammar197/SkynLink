import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Slider 
} from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface PropertySearchProps {
  className?: string;
  isHero?: boolean;
}

export default function PropertySearch({ className, isHero = false }: PropertySearchProps) {
  const { t } = useTranslation();
  const [, navigate] = useLocation();
  
  // Fetch areas
  const { data: areas = [] } = useQuery<any[]>({
    queryKey: ["/api/areas"],
  });
  
  // States for filters
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  
  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    
    if (selectedArea) queryParams.set("areaId", selectedArea);
    if (selectedType) queryParams.set("type", selectedType);
    if (selectedGender) queryParams.set("gender", selectedGender);
    if (priceRange[0] > 0) queryParams.set("minPrice", priceRange[0].toString());
    if (priceRange[1] < 5000) queryParams.set("maxPrice", priceRange[1].toString());
    
    navigate(`/properties?${queryParams.toString()}`);
  };
  
  if (isHero) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-4 sm:p-5 md:p-6 ${className}`}>
        <div className="flex flex-col sm:flex-row sm:flex-wrap md:flex-nowrap md:items-center gap-3 sm:gap-4">
          <div className="flex-1">
            <Label className="block text-sm font-medium text-neutral-600 mb-1">
              <span lang="ar">{t('home.hero.area')}</span>
              <span lang="en">{t('home.hero.area')}</span>
            </Label>
            <Select onValueChange={setSelectedArea}>
              <SelectTrigger>
                <SelectValue placeholder={t('areas.all')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">
                  <span lang="ar">{t('areas.all')}</span>
                  <span lang="en">{t('areas.all')}</span>
                </SelectItem>
                {areas?.map((area: any) => (
                  <SelectItem key={area.id} value={area.id.toString()}>
                    <span lang="ar">{area.nameAr}</span>
                    <span lang="en">{area.nameEn}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Label className="block text-sm font-medium text-neutral-600 mb-1">
              <span lang="ar">{t('home.hero.propertyType')}</span>
              <span lang="en">{t('home.hero.propertyType')}</span>
            </Label>
            <Select onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder={t('propertyTypes.all')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <span lang="ar">{t('propertyTypes.all')}</span>
                  <span lang="en">{t('propertyTypes.all')}</span>
                </SelectItem>
                <SelectItem value="full_apartment">
                  <span lang="ar">{t('propertyTypes.fullApartment')}</span>
                  <span lang="en">{t('propertyTypes.fullApartment')}</span>
                </SelectItem>
                <SelectItem value="private_room">
                  <span lang="ar">{t('propertyTypes.privateRoom')}</span>
                  <span lang="en">{t('propertyTypes.privateRoom')}</span>
                </SelectItem>
                <SelectItem value="shared_bed">
                  <span lang="ar">{t('propertyTypes.sharedBed')}</span>
                  <span lang="en">{t('propertyTypes.sharedBed')}</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Button onClick={handleSearch} className="w-full md:w-auto bg-secondary hover:bg-secondary-foreground text-white font-medium py-3 px-6 rounded-md transition mt-6">
              <i className="fas fa-search me-2"></i>
              <span lang="ar">{t('home.hero.searchButton')}</span>
              <span lang="en">{t('home.hero.searchButton')}</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <Card className={`${className} sm:sticky sm:top-4`}>
      <CardHeader className="pb-2 sm:pb-3">
        <CardTitle className="text-lg sm:text-xl">
          <span lang="ar">{t('properties.filters.title')}</span>
          <span lang="en">{t('properties.filters.title')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-5">
        <div>
          <Label className="block text-sm font-medium mb-1">
            <span lang="ar">{t('properties.filters.area')}</span>
            <span lang="en">{t('properties.filters.area')}</span>
          </Label>
          <Select value={selectedArea} onValueChange={setSelectedArea}>
            <SelectTrigger>
              <SelectValue placeholder={t('areas.all')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">
                <span lang="ar">{t('areas.all')}</span>
                <span lang="en">{t('areas.all')}</span>
              </SelectItem>
              {areas?.map((area: any) => (
                <SelectItem key={area.id} value={area.id.toString()}>
                  <span lang="ar">{area.nameAr}</span>
                  <span lang="en">{area.nameEn}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="block text-sm font-medium mb-1">
            <span lang="ar">{t('properties.filters.type')}</span>
            <span lang="en">{t('properties.filters.type')}</span>
          </Label>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder={t('propertyTypes.all')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <span lang="ar">{t('propertyTypes.all')}</span>
                <span lang="en">{t('propertyTypes.all')}</span>
              </SelectItem>
              <SelectItem value="full_apartment">
                <span lang="ar">{t('propertyTypes.fullApartment')}</span>
                <span lang="en">{t('propertyTypes.fullApartment')}</span>
              </SelectItem>
              <SelectItem value="private_room">
                <span lang="ar">{t('propertyTypes.privateRoom')}</span>
                <span lang="en">{t('propertyTypes.privateRoom')}</span>
              </SelectItem>
              <SelectItem value="shared_bed">
                <span lang="ar">{t('propertyTypes.sharedBed')}</span>
                <span lang="en">{t('propertyTypes.sharedBed')}</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="block text-sm font-medium mb-1">
            <span lang="ar">{t('properties.filters.gender')}</span>
            <span lang="en">{t('properties.filters.gender')}</span>
          </Label>
          <Select value={selectedGender} onValueChange={setSelectedGender}>
            <SelectTrigger>
              <SelectValue placeholder={t('genderTypes.mixed')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <span lang="ar">{t('common.all')}</span>
                <span lang="en">{t('common.all')}</span>
              </SelectItem>
              <SelectItem value="mixed">
                <span lang="ar">{t('genderTypes.mixed')}</span>
                <span lang="en">{t('genderTypes.mixed')}</span>
              </SelectItem>
              <SelectItem value="male">
                <span lang="ar">{t('genderTypes.male')}</span>
                <span lang="en">{t('genderTypes.male')}</span>
              </SelectItem>
              <SelectItem value="female">
                <span lang="ar">{t('genderTypes.female')}</span>
                <span lang="en">{t('genderTypes.female')}</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <Label className="block text-sm font-medium">
              <span lang="ar">{t('properties.filters.priceRange')}</span>
              <span lang="en">{t('properties.filters.priceRange')}</span>
            </Label>
            <span className="text-sm text-neutral-500">
              {priceRange[0]} ₺ - {priceRange[1]} ₺
            </span>
          </div>
          <Slider
            defaultValue={[0, 5000]}
            max={5000}
            step={100}
            onValueChange={(value) => setPriceRange(value as [number, number])}
          />
        </div>
        
        <div className="flex flex-col space-y-2 pt-4">
          <Button onClick={handleSearch}>
            <span lang="ar">{t('properties.filters.applyFilters')}</span>
            <span lang="en">{t('properties.filters.applyFilters')}</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              setSelectedArea("");
              setSelectedType("");
              setSelectedGender("");
              setPriceRange([0, 5000]);
              navigate("/properties");
            }}
          >
            <span lang="ar">{t('properties.filters.resetFilters')}</span>
            <span lang="en">{t('properties.filters.resetFilters')}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
