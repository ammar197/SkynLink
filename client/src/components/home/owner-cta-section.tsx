import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function OwnerCTASection() {
  const { t } = useTranslation();
  
  return (
    <section className="mb-16 bg-primary rounded-2xl overflow-hidden shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-heading">
            <span lang="ar">{t('home.ownerCTA.title')}</span>
            <span lang="en">{t('home.ownerCTA.title')}</span>
          </h2>
          <p className="text-white opacity-90 mb-6">
            <span lang="ar">{t('home.ownerCTA.description')}</span>
            <span lang="en">{t('home.ownerCTA.description')}</span>
          </p>
          <div>
            <Link href="/add-property">
              <Button className="bg-white text-primary hover:bg-neutral-100">
                <span lang="ar">{t('home.ownerCTA.button')}</span>
                <span lang="en">{t('home.ownerCTA.button')}</span>
              </Button>
            </Link>
          </div>
        </div>
        <div className="hidden md:block">
          <img 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
            alt="Property listing concept" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
