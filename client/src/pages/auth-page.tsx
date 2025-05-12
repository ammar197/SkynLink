import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export default function AuthPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("login");
  const { user, loginMutation, registerMutation } = useAuth();
  const [location, navigate] = useLocation();
  
  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Login form schema
  const loginSchema = z.object({
    username: z.string().min(1, t("auth.login.usernameRequired", "Username is required")),
    password: z.string().min(1, t("auth.login.passwordRequired", "Password is required")),
  });

  // Register form schema
  const registerSchema = z.object({
    fullName: z.string().min(1, t("auth.register.fullNameRequired", "Full name is required")),
    username: z.string().min(3, t("auth.register.usernameMinLength", "Username must be at least 3 characters")),
    email: z.string().email(t("auth.register.invalidEmail", "Invalid email address")),
    phone: z.string().optional(),
    password: z.string().min(6, t("auth.register.passwordMinLength", "Password must be at least 6 characters")),
    confirmPassword: z.string(),
    role: z.enum(["tenant", "owner"]),
  }).refine((data) => data.password === data.confirmPassword, {
    message: t("auth.register.passwordsDontMatch", "Passwords don't match"),
    path: ["confirmPassword"],
  });

  // Initialize forms
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "tenant",
    },
  });

  // Handle form submissions
  const onLoginSubmit = (values: z.infer<typeof loginSchema>) => {
    loginMutation.mutate(values);
  };

  const onRegisterSubmit = (values: z.infer<typeof registerSchema>) => {
    const { confirmPassword, ...registerData } = values;
    registerMutation.mutate(registerData);
  };

  return (
    <div className="min-h-screen pt-16 pb-24 flex items-center">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="login">
                  <span lang="ar">{t('auth.login.title')}</span>
                  <span lang="en">{t('auth.login.title')}</span>
                </TabsTrigger>
                <TabsTrigger value="register">
                  <span lang="ar">{t('auth.register.title')}</span>
                  <span lang="en">{t('auth.register.title')}</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Login Form */}
              <TabsContent value="login">
                <div className="p-6">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <span lang="ar">{t('auth.login.username')}</span>
                              <span lang="en">{t('auth.login.username')}</span>
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <span lang="ar">{t('auth.login.password')}</span>
                              <span lang="en">{t('auth.login.password')}</span>
                            </FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit"
                        className="w-full" 
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? (
                          <span className="flex items-center">
                            <i className="fas fa-spinner fa-spin me-2"></i>
                            <span lang="ar">جاري التسجيل...</span>
                            <span lang="en">Logging in...</span>
                          </span>
                        ) : (
                          <>
                            <span lang="ar">{t('auth.login.button')}</span>
                            <span lang="en">{t('auth.login.button')}</span>
                          </>
                        )}
                      </Button>
                      
                      <div className="text-sm text-center mt-4">
                        <span lang="ar">{t('auth.login.noAccount')}</span>
                        <span lang="en">{t('auth.login.noAccount')}</span>
                        <Button 
                          variant="link" 
                          className="p-0 mx-1" 
                          onClick={() => setActiveTab("register")}
                        >
                          <span lang="ar">{t('auth.login.createAccount')}</span>
                          <span lang="en">{t('auth.login.createAccount')}</span>
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </TabsContent>
              
              {/* Register Form */}
              <TabsContent value="register">
                <div className="p-6">
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                      <FormField
                        control={registerForm.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <span lang="ar">{t('auth.register.fullName')}</span>
                              <span lang="en">{t('auth.register.fullName')}</span>
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={registerForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                <span lang="ar">{t('auth.register.username')}</span>
                                <span lang="en">{t('auth.register.username')}</span>
                              </FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={registerForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                <span lang="ar">{t('auth.register.email')}</span>
                                <span lang="en">{t('auth.register.email')}</span>
                              </FormLabel>
                              <FormControl>
                                <Input type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={registerForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <span lang="ar">{t('auth.register.phone')}</span>
                              <span lang="en">{t('auth.register.phone')}</span>
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={registerForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                <span lang="ar">{t('auth.register.password')}</span>
                                <span lang="en">{t('auth.register.password')}</span>
                              </FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={registerForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                <span lang="ar">{t('auth.register.confirmPassword')}</span>
                                <span lang="en">{t('auth.register.confirmPassword')}</span>
                              </FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={registerForm.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <span lang="ar">{t('auth.register.role')}</span>
                              <span lang="en">{t('auth.register.role')}</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="tenant">
                                  <span lang="ar">{t('auth.register.roles.tenant')}</span>
                                  <span lang="en">{t('auth.register.roles.tenant')}</span>
                                </SelectItem>
                                <SelectItem value="owner">
                                  <span lang="ar">{t('auth.register.roles.owner')}</span>
                                  <span lang="en">{t('auth.register.roles.owner')}</span>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? (
                          <span className="flex items-center">
                            <i className="fas fa-spinner fa-spin me-2"></i>
                            <span lang="ar">جاري التسجيل...</span>
                            <span lang="en">Registering...</span>
                          </span>
                        ) : (
                          <>
                            <span lang="ar">{t('auth.register.button')}</span>
                            <span lang="en">{t('auth.register.button')}</span>
                          </>
                        )}
                      </Button>
                      
                      <div className="text-sm text-center mt-4">
                        <span lang="ar">{t('auth.register.hasAccount')}</span>
                        <span lang="en">{t('auth.register.hasAccount')}</span>
                        <Button 
                          variant="link" 
                          className="p-0 mx-1" 
                          onClick={() => setActiveTab("login")}
                        >
                          <span lang="ar">{t('auth.register.login')}</span>
                          <span lang="en">{t('auth.register.login')}</span>
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Welcome Information */}
          <Card className="bg-primary text-white">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                <span lang="ar">{t('auth.welcome.title')}</span>
                <span lang="en">{t('auth.welcome.title')}</span>
              </CardTitle>
              <CardDescription className="text-white/80 text-lg">
                <span lang="ar">{t('auth.welcome.description')}</span>
                <span lang="en">{t('auth.welcome.description')}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500" 
                  alt="Student housing" 
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center bg-white/10 p-3 rounded-lg">
                  <i className="fas fa-search text-xl me-3"></i>
                  <div className="text-sm">
                    <span lang="ar">ابحث عن سكن مناسب</span>
                    <span lang="en">Find suitable housing</span>
                  </div>
                </div>
                <div className="flex items-center bg-white/10 p-3 rounded-lg">
                  <i className="fas fa-comments text-xl me-3"></i>
                  <div className="text-sm">
                    <span lang="ar">تواصل مباشرة مع الملاك</span>
                    <span lang="en">Direct contact with owners</span>
                  </div>
                </div>
                <div className="flex items-center bg-white/10 p-3 rounded-lg">
                  <i className="fas fa-building text-xl me-3"></i>
                  <div className="text-sm">
                    <span lang="ar">اختر من شقق أو غرف خاصة</span>
                    <span lang="en">Choose from apartments or rooms</span>
                  </div>
                </div>
                <div className="flex items-center bg-white/10 p-3 rounded-lg">
                  <i className="fas fa-shield-alt text-xl me-3"></i>
                  <div className="text-sm">
                    <span lang="ar">عملية موثوقة وآمنة</span>
                    <span lang="en">Trusted and secure process</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
