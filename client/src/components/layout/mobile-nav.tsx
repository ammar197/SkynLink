import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/use-auth";
import { Home, Search, PlusCircle, User } from "lucide-react";

export default function MobileNav() {
  const { t } = useTranslation();
  const [location] = useLocation();
  const { user } = useAuth();
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-neutral-200 z-10">
      <div className="grid grid-cols-4 text-center">
        <Link href="/" className={`py-3 flex flex-col items-center ${location === '/' ? 'text-primary' : 'text-neutral-500 hover:text-primary'}`}>
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">
            <span lang="ar">{t('common.home')}</span>
            <span lang="en">{t('common.home')}</span>
          </span>
        </Link>
        <Link href="/properties" className={`py-3 flex flex-col items-center ${location === '/properties' ? 'text-primary' : 'text-neutral-500 hover:text-primary'}`}>
          <Search className="h-5 w-5" />
          <span className="text-xs mt-1">
            <span lang="ar">{t('common.search')}</span>
            <span lang="en">{t('common.search')}</span>
          </span>
        </Link>
        {user && user.role === 'owner' ? (
          <Link href="/add-property" className={`py-3 flex flex-col items-center ${location === '/add-property' ? 'text-primary' : 'text-neutral-500 hover:text-primary'}`}>
            <PlusCircle className="h-5 w-5" />
            <span className="text-xs mt-1">
              <span lang="ar">{t('common.add')}</span>
              <span lang="en">{t('common.add')}</span>
            </span>
          </Link>
        ) : (
          <Link href={user ? "/properties" : "/auth"} className="py-3 flex flex-col items-center text-neutral-500 hover:text-primary">
            <PlusCircle className="h-5 w-5" />
            <span className="text-xs mt-1">
              <span lang="ar">{t('common.add')}</span>
              <span lang="en">{t('common.add')}</span>
            </span>
          </Link>
        )}
        <Link href={user ? "/properties" : "/auth"} className={`py-3 flex flex-col items-center ${(location === '/auth' && !user) ? 'text-primary' : 'text-neutral-500 hover:text-primary'}`}>
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">
            <span lang="ar">{t('common.account')}</span>
            <span lang="en">{t('common.account')}</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
