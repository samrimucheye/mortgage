'use client';

import {useState, useEffect} from 'react';
import {useTranslations} from 'next-intl';

export default function StickyCtaBar() {
  const t = useTranslations('Hero');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 400px (roughly the Hero section)
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const scrollToForm = () => {
    const formElement = document.getElementById('lead-form-section');
    if (formElement) {
      const top = formElement.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({top, behavior: 'smooth'});
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-2xl p-4 transition-all duration-300 animate-in slide-in-from-bottom-full slide-out-to-bottom-full md:bottom-auto md:top-0 md:border-b md:border-t-0 md:slide-in-from-top-full md:slide-out-to-top-full lg:hidden">
      <div className="max-w-7xl mx-auto flex justify-center items-center gap-4">
        <span className="font-bold text-foreground text-sm hidden sm:block">
          רוצה לדעת כמה אפשר לחסוך?
        </span>
        <button 
          onClick={scrollToForm}
          className="bg-primary hover:bg-primary-hover text-primary-foreground font-bold py-3 px-8 rounded-full shadow-lg transition-transform active:scale-95 w-full sm:w-auto text-center"
        >
          {t('cta_consult')}
        </button>
      </div>
    </div>
  );
}
