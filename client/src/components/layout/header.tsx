import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const { t } = useTranslation();
  const { user, logoutMutation } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="text-2xl sm:text-3xl font-bold text-primary font-heading">
            <span lang="ar">سكنلي</span>
            <span lang="en">Sakanli</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
          <Link href="/" className="text-neutral-700 hover:text-primary font-medium transition py-2">
            <span lang="ar">{t('common.home')}</span>
            <span lang="en">{t('common.home')}</span>
          </Link>
          <Link href="/properties" className="text-neutral-700 hover:text-primary font-medium transition py-2">
            <span lang="ar">{t('common.browse')}</span>
            <span lang="en">{t('common.browse')}</span>
          </Link>
          <Link href="/#how-it-works" className="text-neutral-700 hover:text-primary font-medium transition py-2">
            <span lang="ar">{t('common.howItWorks')}</span>
            <span lang="en">{t('common.howItWorks')}</span>
          </Link>
          <Link href="/#contact" className="text-neutral-700 hover:text-primary font-medium transition py-2">
            <span lang="ar">{t('common.help')}</span>
            <span lang="en">{t('common.help')}</span>
          </Link>
        </nav>
        
        {/* Auth Buttons */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {user ? (
            <>
              <div className="hidden md:block">
                {user.role === 'owner' && (
                  <Link href="/add-property">
                    <Button variant="outline" className="mr-2 rtl:ml-2 rtl:mr-0">
                      {t('home.ownerCTA.button')}
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" onClick={() => logoutMutation.mutate()}>
                  {t('common.logout')}
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link href="/auth" className="hidden md:block text-neutral-700 hover:text-primary font-medium transition">
                <span lang="ar">{t('common.login')}</span>
                <span lang="en">{t('common.login')}</span>
              </Link>
              <Link href="/auth" className="hidden md:block">
                <Button>
                  <span lang="ar">{t('common.signup')}</span>
                  <span lang="en">{t('common.signup')}</span>
                </Button>
              </Link>
            </>
          )}
          <button className="md:hidden text-neutral-700" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 fixed w-full z-50 top-14 left-0 right-0 shadow-lg">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col">
              <Link href="/" className="py-3 border-b border-neutral-200 text-neutral-700">
                <span lang="ar">{t('common.home')}</span>
                <span lang="en">{t('common.home')}</span>
              </Link>
              <Link href="/properties" className="py-3 border-b border-neutral-200 text-neutral-700">
                <span lang="ar">{t('common.browse')}</span>
                <span lang="en">{t('common.browse')}</span>
              </Link>
              <Link href="/#how-it-works" className="py-3 border-b border-neutral-200 text-neutral-700">
                <span lang="ar">{t('common.howItWorks')}</span>
                <span lang="en">{t('common.howItWorks')}</span>
              </Link>
              <Link href="/#contact" className="py-3 border-b border-neutral-200 text-neutral-700">
                <span lang="ar">{t('common.help')}</span>
                <span lang="en">{t('common.help')}</span>
              </Link>
              {user ? (
                <>
                  {user.role === 'owner' && (
                    <Link href="/add-property" className="py-3 border-b border-neutral-200 text-neutral-700">
                      <span lang="ar">{t('home.ownerCTA.button')}</span>
                      <span lang="en">{t('home.ownerCTA.button')}</span>
                    </Link>
                  )}
                  <button 
                    onClick={() => logoutMutation.mutate()} 
                    className="py-3 text-start text-neutral-700"
                  >
                    <span lang="ar">{t('common.logout')}</span>
                    <span lang="en">{t('common.logout')}</span>
                  </button>
                </>
              ) : (
                <div className="py-3 flex space-x-4 rtl:space-x-reverse">
                  <Link href="/auth" className="text-neutral-700 font-medium">
                    <span lang="ar">{t('common.login')}</span>
                    <span lang="en">{t('common.login')}</span>
                  </Link>
                  <Link href="/auth">
                    <Button>
                      <span lang="ar">{t('common.signup')}</span>
                      <span lang="en">{t('common.signup')}</span>
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
