import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function HowItWorksSection() {
  const { t } = useTranslation();
  
  return (
    <section id="how-it-works" className="mb-16 bg-neutral-100 rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-8 text-center font-heading">
        <span lang="ar">{t('home.howItWorks.title')}</span>
        <span lang="en">{t('home.howItWorks.title')}</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Step 1 */}
        <div className="text-center">
          <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
          <h3 className="text-xl font-semibold mb-3 font-heading">
            <span lang="ar">{t('home.howItWorks.step1.title')}</span>
            <span lang="en">{t('home.howItWorks.step1.title')}</span>
          </h3>
          <p className="text-neutral-600">
            <span lang="ar">{t('home.howItWorks.step1.description')}</span>
            <span lang="en">{t('home.howItWorks.step1.description')}</span>
          </p>
        </div>
        
        {/* Step 2 */}
        <div className="text-center">
          <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
          <h3 className="text-xl font-semibold mb-3 font-heading">
            <span lang="ar">{t('home.howItWorks.step2.title')}</span>
            <span lang="en">{t('home.howItWorks.step2.title')}</span>
          </h3>
          <p className="text-neutral-600">
            <span lang="ar">{t('home.howItWorks.step2.description')}</span>
            <span lang="en">{t('home.howItWorks.step2.description')}</span>
          </p>
        </div>
        
        {/* Step 3 */}
        <div className="text-center">
          <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
          <h3 className="text-xl font-semibold mb-3 font-heading">
            <span lang="ar">{t('home.howItWorks.step3.title')}</span>
            <span lang="en">{t('home.howItWorks.step3.title')}</span>
          </h3>
          <p className="text-neutral-600">
            <span lang="ar">{t('home.howItWorks.step3.description')}</span>
            <span lang="en">{t('home.howItWorks.step3.description')}</span>
          </p>
        </div>
      </div>
      
      <div className="text-center mt-8">
        <Link href="/properties">
          <Button className="bg-secondary hover:bg-secondary-foreground text-white">
            <span lang="ar">{t('home.howItWorks.startButton')}</span>
            <span lang="en">{t('home.howItWorks.startButton')}</span>
          </Button>
        </Link>
      </div>
    </section>
  );
}
