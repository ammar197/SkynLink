import { useTranslation } from "react-i18next";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { insertPropertySchema, InsertProperty } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useLocation } from "wouter";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PropertyForm() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { user } = useAuth();
  const [, navigate] = useLocation();

  // Fetch areas for the dropdown
  const { data: areas = [] } = useQuery<any[]>({
    queryKey: ["/api/areas"],
  });

  const propertySchema = insertPropertySchema.omit({ ownerId: true });
  
  // Define the form
  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      titleAr: "",
      description: "",
      descriptionAr: "",
      price: 0,
      location: "",
      locationAr: "",
      type: "full_apartment",
      gender: "mixed",
      rooms: 1,
      bathrooms: 1,
      imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      areaId: 1,
    },
  });

  const createPropertyMutation = useMutation({
    mutationFn: async (data: InsertProperty) => {
      const res = await apiRequest("POST", "/api/properties", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      queryClient.invalidateQueries({ queryKey: ["/api/my-properties"] });
      
      toast({
        title: t("addProperty.success", "Property added successfully"),
        description: t("addProperty.successMessage", "Your property has been listed successfully."),
      });
      
      navigate("/properties");
    },
    onError: (error: Error) => {
      toast({
        title: t("addProperty.error", "Failed to add property"),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: z.infer<typeof propertySchema>) {
    // Add the owner ID from the current user
    const propertyData = {
      ...data,
      ownerId: user!.id  // Add the ownerId from the current user (we know it exists because of the guard clause)
    };
    createPropertyMutation.mutate(propertyData);
  }

  if (!user || user.role !== "owner") {
    navigate("/auth");
    return null;
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          <span lang="ar">{t('addProperty.title')}</span>
          <span lang="en">{t('addProperty.title')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="titleAr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span lang="ar">{t('addProperty.form.titleAr')}</span>
                      <span lang="en">{t('addProperty.form.titleAr')}</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} dir="rtl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span lang="ar">{t('addProperty.form.titleEn')}</span>
                      <span lang="en">{t('addProperty.form.titleEn')}</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} dir="ltr" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="descriptionAr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span lang="ar">{t('addProperty.form.descriptionAr')}</span>
                      <span lang="en">{t('addProperty.form.descriptionAr')}</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={4} dir="rtl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span lang="ar">{t('addProperty.form.descriptionEn')}</span>
                      <span lang="en">{t('addProperty.form.descriptionEn')}</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={4} dir="ltr" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span lang="ar">{t('addProperty.form.price')}</span>
                      <span lang="en">{t('addProperty.form.price')}</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min={0} onChange={e => field.onChange(parseInt(e.target.value) || 0)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="areaId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span lang="ar">{t('addProperty.form.area')}</span>
                      <span lang="en">{t('addProperty.form.area')}</span>
                    </FormLabel>
                    <Select 
                      value={field.value.toString()} 
                      onValueChange={(value) => field.onChange(parseInt(value))}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('areas.all')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {areas?.map((area: any) => (
                          <SelectItem key={area.id} value={area.id.toString()}>
                            <span lang="ar">{area.nameAr}</span>
                            <span lang="en">{area.nameEn}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span lang="ar">{t('addProperty.form.type')}</span>
                      <span lang="en">{t('addProperty.form.type')}</span>
                    </FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('propertyTypes.all')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span lang="ar">{t('addProperty.form.gender')}</span>
                      <span lang="en">{t('addProperty.form.gender')}</span>
                    </FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="rooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span lang="ar">{t('addProperty.form.rooms')}</span>
                      <span lang="en">{t('addProperty.form.rooms')}</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min={1} onChange={e => field.onChange(parseInt(e.target.value) || 1)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="bathrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span lang="ar">{t('addProperty.form.bathrooms')}</span>
                      <span lang="en">{t('addProperty.form.bathrooms')}</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min={1} onChange={e => field.onChange(parseInt(e.target.value) || 1)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="locationAr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span lang="ar">{t('addProperty.form.locationAr')}</span>
                      <span lang="en">{t('addProperty.form.locationAr')}</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} dir="rtl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span lang="ar">{t('addProperty.form.locationEn')}</span>
                      <span lang="en">{t('addProperty.form.locationEn')}</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} dir="ltr" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span lang="ar">{t('addProperty.form.imageUrl')}</span>
                    <span lang="en">{t('addProperty.form.imageUrl')}</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-between pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => form.reset()}
              >
                <span lang="ar">{t('addProperty.form.reset')}</span>
                <span lang="en">{t('addProperty.form.reset')}</span>
              </Button>
              <Button 
                type="submit" 
                disabled={createPropertyMutation.isPending}
              >
                {createPropertyMutation.isPending ? (
                  <span className="flex items-center">
                    <i className="fas fa-spinner fa-spin me-2"></i>
                    <span lang="ar">جاري الإضافة...</span>
                    <span lang="en">Adding...</span>
                  </span>
                ) : (
                  <>
                    <span lang="ar">{t('addProperty.form.submit')}</span>
                    <span lang="en">{t('addProperty.form.submit')}</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
