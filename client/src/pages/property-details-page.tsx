import { useTranslation } from "react-i18next";
import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertyTypeBadge from "@/components/property/property-type-badge";
import { Property, User } from "@shared/schema";

export default function PropertyDetailsPage() {
  const { t } = useTranslation();
  const params = useParams<{ id: string }>();
  const { user } = useAuth();
  const [, navigate] = useLocation();
  
  // Fetch property details
  const { data: property, isLoading: propertyLoading } = useQuery<Property>({
    queryKey: [`/api/properties/${params.id}`],
    onError: () => {
      navigate("/properties");
    }
  });
  
  // Fetch owner information if property exists
  const { data: owner } = useQuery<User>({
    queryKey: [`/api/users/${property?.ownerId}`],
    enabled: !!property?.ownerId,
  });
  
  // Fetch similar properties (same area, but different property)
  const { data: similarProperties = [] } = useQuery<Property[]>({
    queryKey: [`/api/properties?areaId=${property?.areaId}`],
    enabled: !!property?.areaId,
  });
  
  // Filter out the current property from similar properties and limit to 3
  const filteredSimilarProperties = similarProperties
    .filter(p => p.id !== property?.id)
    .slice(0, 3);
  
  if (propertyLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!property) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">
          <span lang="ar">العقار غير موجود</span>
          <span lang="en">Property not found</span>
        </h2>
        <Button onClick={() => navigate("/properties")}>
          <span lang="ar">العودة إلى قائمة العقارات</span>
          <span lang="en">Return to properties list</span>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Property Images */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="relative h-[300px] md:h-[400px]">
              <img 
                src={property.imageUrl} 
                alt={property.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <PropertyTypeBadge type={property.type} />
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h1 className="text-2xl md:text-3xl font-bold">
                  <span lang="ar">{property.titleAr}</span>
                  <span lang="en">{property.title}</span>
                </h1>
                <div className="text-secondary font-bold text-xl whitespace-nowrap">
                  <span>{property.price} ₺</span>
                  <span className="text-neutral-500 text-sm">
                    <span lang="ar">{t('home.featuredProperties.monthly')}</span>
                    <span lang="en">{t('home.featuredProperties.monthly')}</span>
                  </span>
                </div>
              </div>
              
              <div className="text-neutral-500 mb-4 flex items-center">
                <i className="fas fa-map-marker-alt me-2"></i>
                <span lang="ar">{property.locationAr}</span>
                <span lang="en">{property.location}</span>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge variant="outline" className="flex items-center gap-1">
                  <i className="fas fa-bed"></i> {property.rooms} {t('common.rooms')}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <i className="fas fa-bath"></i> {property.bathrooms} {t('common.bathrooms')}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  {property.gender === 'male' ? (
                    <><i className="fas fa-male"></i> {t('genderTypes.male')}</>
                  ) : property.gender === 'female' ? (
                    <><i className="fas fa-female"></i> {t('genderTypes.female')}</>
                  ) : (
                    <><i className="fas fa-users"></i> {t('genderTypes.mixed')}</>
                  )}
                </Badge>
              </div>
              
              <Tabs defaultValue="description">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="description">
                    <span lang="ar">{t('propertyDetails.description')}</span>
                    <span lang="en">{t('propertyDetails.description')}</span>
                  </TabsTrigger>
                  <TabsTrigger value="features">
                    <span lang="ar">{t('propertyDetails.features')}</span>
                    <span lang="en">{t('propertyDetails.features')}</span>
                  </TabsTrigger>
                  <TabsTrigger value="location">
                    <span lang="ar">{t('propertyDetails.location')}</span>
                    <span lang="en">{t('propertyDetails.location')}</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="py-4">
                  <p className="text-neutral-700 whitespace-pre-line">
                    <span lang="ar">{property.descriptionAr}</span>
                    <span lang="en">{property.description}</span>
                  </p>
                </TabsContent>
                
                <TabsContent value="features" className="py-4">
                  <ul className="grid grid-cols-2 gap-2">
                    <li className="flex items-center">
                      <i className="fas fa-check text-primary me-2"></i>
                      <span lang="ar">غرف: {property.rooms}</span>
                      <span lang="en">Rooms: {property.rooms}</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-primary me-2"></i>
                      <span lang="ar">حمامات: {property.bathrooms}</span>
                      <span lang="en">Bathrooms: {property.bathrooms}</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-primary me-2"></i>
                      <span lang="ar">مناسب لـ: {property.gender === 'male' ? 'الشباب فقط' : property.gender === 'female' ? 'البنات فقط' : 'مختلط'}</span>
                      <span lang="en">Suitable for: {property.gender === 'male' ? 'Males only' : property.gender === 'female' ? 'Females only' : 'Mixed'}</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-primary me-2"></i>
                      <span lang="ar">نوع السكن: {property.type === 'full_apartment' ? 'شقة كاملة' : property.type === 'private_room' ? 'غرفة خاصة' : 'سرير مشترك'}</span>
                      <span lang="en">Type: {property.type === 'full_apartment' ? 'Full Apartment' : property.type === 'private_room' ? 'Private Room' : 'Shared Bed'}</span>
                    </li>
                  </ul>
                </TabsContent>
                
                <TabsContent value="location" className="py-4">
                  <div className="mb-3">
                    <h3 className="font-semibold mb-2">
                      <span lang="ar">العنوان التفصيلي:</span>
                      <span lang="en">Detailed Address:</span>
                    </h3>
                    <p className="text-neutral-700">
                      <span lang="ar">{property.locationAr}</span>
                      <span lang="en">{property.location}</span>
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Similar Properties */}
          {filteredSimilarProperties.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 font-heading">
                <span lang="ar">{t('propertyDetails.similar')}</span>
                <span lang="en">{t('propertyDetails.similar')}</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredSimilarProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar - Contact & Owner Info */}
        <div className="lg:col-span-1">
          <Card className="shadow-md sticky top-4">
            <CardHeader>
              <CardTitle>
                <span lang="ar">{t('propertyDetails.contactOwner')}</span>
                <span lang="en">{t('propertyDetails.contactOwner')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {owner ? (
                <>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-neutral-200 rounded-full flex items-center justify-center text-neutral-500 me-3">
                      <i className="fas fa-user text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-medium">{owner.fullName}</h3>
                      <p className="text-sm text-neutral-500">
                        <span lang="ar">مالك العقار</span>
                        <span lang="en">Property Owner</span>
                      </p>
                    </div>
                  </div>
                  
                  {user ? (
                    <>
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-neutral-500 mb-1">
                          <span lang="ar">البريد الإلكتروني</span>
                          <span lang="en">Email</span>
                        </h4>
                        <p className="flex items-center">
                          <i className="fas fa-envelope me-2 text-neutral-500"></i>
                          {owner.email}
                        </p>
                      </div>
                      
                      {owner.phone && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-neutral-500 mb-1">
                            <span lang="ar">رقم الهاتف</span>
                            <span lang="en">Phone</span>
                          </h4>
                          <p className="flex items-center">
                            <i className="fas fa-phone me-2 text-neutral-500"></i>
                            {owner.phone}
                          </p>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-2 gap-2 mt-6">
                        <a href={`mailto:${owner.email}`} className="w-full">
                          <Button variant="outline" className="w-full">
                            <i className="fas fa-envelope me-2"></i>
                            <span lang="ar">إرسال بريد</span>
                            <span lang="en">Email</span>
                          </Button>
                        </a>
                        
                        {owner.phone && (
                          <a href={`tel:${owner.phone}`} className="w-full">
                            <Button variant="default" className="w-full">
                              <i className="fas fa-phone me-2"></i>
                              <span lang="ar">اتصال</span>
                              <span lang="en">Call</span>
                            </Button>
                          </a>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <p className="mb-3 text-neutral-600">
                        <span lang="ar">يرجى تسجيل الدخول لعرض معلومات التواصل</span>
                        <span lang="en">Please login to view contact information</span>
                      </p>
                      <Link href="/auth">
                        <Button>
                          <span lang="ar">{t('common.login')}</span>
                          <span lang="en">{t('common.login')}</span>
                        </Button>
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// For the Link used within the component
function Link({ href, children }: { href: string; children: React.ReactNode }) {
  const [, navigate] = useLocation();
  return (
    <a onClick={(e) => { e.preventDefault(); navigate(href); }}>
      {children}
    </a>
  );
}
