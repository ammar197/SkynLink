import { useTranslation } from "react-i18next";

export default function TestimonialsSection() {
  const { t } = useTranslation();
  
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-8 text-center font-heading">
        <span lang="ar">{t('home.testimonials.title')}</span>
        <span lang="en">{t('home.testimonials.title')}</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Testimonial 1 */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-start mb-4">
            <div className="text-yellow-400 text-lg">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
          </div>
          <p className="text-neutral-600 mb-4 italic">
            <span lang="ar">{t('home.testimonials.testimonial1.text')}</span>
            <span lang="en">{t('home.testimonials.testimonial1.text')}</span>
          </p>
          <div className="flex items-center">
            <div className="flex-shrink-0 w-10 h-10 bg-neutral-200 rounded-full overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-neutral-500">
                <i className="fas fa-user"></i>
              </div>
            </div>
            <div className="ms-3">
              <h4 className="font-medium">
                <span lang="ar">{t('home.testimonials.testimonial1.author')}</span>
                <span lang="en">{t('home.testimonials.testimonial1.author')}</span>
              </h4>
              <div className="text-neutral-500 text-sm">
                <span lang="ar">{t('home.testimonials.testimonial1.role')}</span>
                <span lang="en">{t('home.testimonials.testimonial1.role')}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonial 2 */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-start mb-4">
            <div className="text-yellow-400 text-lg">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
            </div>
          </div>
          <p className="text-neutral-600 mb-4 italic">
            <span lang="ar">{t('home.testimonials.testimonial2.text')}</span>
            <span lang="en">{t('home.testimonials.testimonial2.text')}</span>
          </p>
          <div className="flex items-center">
            <div className="flex-shrink-0 w-10 h-10 bg-neutral-200 rounded-full overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-neutral-500">
                <i className="fas fa-user"></i>
              </div>
            </div>
            <div className="ms-3">
              <h4 className="font-medium">
                <span lang="ar">{t('home.testimonials.testimonial2.author')}</span>
                <span lang="en">{t('home.testimonials.testimonial2.author')}</span>
              </h4>
              <div className="text-neutral-500 text-sm">
                <span lang="ar">{t('home.testimonials.testimonial2.role')}</span>
                <span lang="en">{t('home.testimonials.testimonial2.role')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
