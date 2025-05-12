import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import PropertiesPage from "@/pages/properties-page";
import PropertyDetailsPage from "@/pages/property-details-page";
import AddPropertyPage from "@/pages/add-property-page";
import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider } from "./hooks/use-auth";
import LanguageSwitcher from "./components/language-switcher";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import MobileNav from "./components/layout/mobile-nav";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/properties" component={PropertiesPage} />
      <Route path="/properties/:id" component={PropertyDetailsPage} />
      <ProtectedRoute path="/add-property" component={AddPropertyPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Header />
          <div className="max-w-5xl mx-auto flex">
            <div className="hidden lg:block lg:fixed top-20 left-4 z-40">
              <LanguageSwitcher />
            </div>
            <div className="w-full">
              <Router />
            </div>
          </div>
          <Footer />
          <MobileNav />
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
