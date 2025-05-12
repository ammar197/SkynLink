import { Link } from "wouter";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-neutral-800 text-white pt-12 pb-6">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-heading">
              <span lang="ar">سكنلي</span>
              <span lang="en">Sakanli</span>
            </h3>
            <p className="text-neutral-400 mb-4">
              <span lang="ar">{t('footer.description')}</span>
              <span lang="en">{t('footer.description')}</span>
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="text-white hover:text-primary transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-primary transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white hover:text-primary transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-primary transition">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-heading">
              <span lang="ar">{t('footer.quickLinks')}</span>
              <span lang="en">{t('footer.quickLinks')}</span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-neutral-400 hover:text-white transition">
                  <span lang="ar">{t('common.home')}</span>
                  <span lang="en">{t('common.home')}</span>
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-neutral-400 hover:text-white transition">
                  <span lang="ar">{t('common.browse')}</span>
                  <span lang="en">{t('common.browse')}</span>
                </Link>
              </li>
              <li>
                <Link href="/add-property" className="text-neutral-400 hover:text-white transition">
                  <span lang="ar">{t('home.ownerCTA.button')}</span>
                  <span lang="en">{t('home.ownerCTA.button')}</span>
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="text-neutral-400 hover:text-white transition">
                  <span lang="ar">{t('common.howItWorks')}</span>
                  <span lang="en">{t('common.howItWorks')}</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Areas */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-heading">
              <span lang="ar">{t('footer.areas')}</span>
              <span lang="en">{t('footer.areas')}</span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties?area=1" className="text-neutral-400 hover:text-white transition">
                  <span lang="ar">{t('areas.fatih')}</span>
                  <span lang="en">{t('areas.fatih')}</span>
                </Link>
              </li>
              <li>
                <Link href="/properties?area=2" className="text-neutral-400 hover:text-white transition">
                  <span lang="ar">{t('areas.taksim')}</span>
                  <span lang="en">{t('areas.taksim')}</span>
                </Link>
              </li>
              <li>
                <Link href="/properties?area=3" className="text-neutral-400 hover:text-white transition">
                  <span lang="ar">{t('areas.besiktas')}</span>
                  <span lang="en">{t('areas.besiktas')}</span>
                </Link>
              </li>
              <li>
                <Link href="/properties?area=4" className="text-neutral-400 hover:text-white transition">
                  <span lang="ar">{t('areas.sisli')}</span>
                  <span lang="en">{t('areas.sisli')}</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div id="contact">
            <h3 className="text-lg font-semibold mb-4 font-heading">
              <span lang="ar">{t('footer.contact')}</span>
              <span lang="en">{t('footer.contact')}</span>
            </h3>
            <ul className="space-y-2 text-neutral-400">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 me-2"></i>
                <span>
                  <span lang="ar">{t('footer.address')}</span>
                  <span lang="en">{t('footer.address')}</span>
                </span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 me-2"></i>
                <span>info@sakanli.com</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt mt-1 me-2"></i>
                <span>+90 (212) 123 4567</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 pt-6 text-center text-neutral-500 text-sm">
          <p>
            <span lang="ar">{t('footer.rights')}</span>
            <span lang="en">{t('footer.rights')}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
