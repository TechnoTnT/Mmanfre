
import React, { useState, useEffect, useRef } from 'react';
import { Category } from '../types';
import ArrowDownIcon from './icons/ArrowDownIcon';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface LandingPageProps {
  categories: Category[];
  onSelectCategory: (category: Category) => void;
  shouldScrollToCategories: boolean;
  onDidScrollToCategories: () => void;
}

const AnimatedCategory: React.FC<{ category: Category; onSelect: () => void; }> = ({ category, onSelect }) => {
    const [ref, isVisible] = useIntersectionObserver<HTMLButtonElement>({
      threshold: 0.5,
      freezeOnceVisible: true,
    });
  
    return (
      <button
        ref={ref}
        onClick={onSelect}
        className={`w-full text-left transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <span
          className={`block text-5xl md:text-7xl lg:text-8xl font-light text-[#1D1D1F] py-8 md:py-12 border-b border-gray-300 transition-colors duration-300 hover:text-gray-500 ${isVisible ? 'animate-fadeInUp' : ''}`}
          style={{ animationDelay: '0.2s' }}
        >
          {category.name}
        </span>
      </button>
    );
  };


const LandingPage: React.FC<LandingPageProps> = ({ categories, onSelectCategory, shouldScrollToCategories, onDidScrollToCategories }) => {
  const [showScrollPrompt, setShowScrollPrompt] = useState(false);
  const [titleOpacity, setTitleOpacity] = useState(1);
  const categoriesSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (shouldScrollToCategories && categoriesSectionRef.current) {
      categoriesSectionRef.current.scrollIntoView({ behavior: 'auto' });
      onDidScrollToCategories();
    }
  }, [shouldScrollToCategories, onDidScrollToCategories]);

  useEffect(() => {
    const timer = setTimeout(() => setShowScrollPrompt(true), 2000);
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeEnd = window.innerHeight * 0.8;
      const newOpacity = Math.max(0, 1 - (scrollY / fadeEnd));
      setTitleOpacity(newOpacity);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="w-full">
      <section 
        className="h-screen flex flex-col items-center justify-center sticky top-0 -z-10"
        style={{ opacity: titleOpacity }}
      >
        <div className="text-center px-4 transform -translate-y-10">
            <div className="relative max-w-md md:max-w-lg lg:max-w-xl mx-auto">
              <img 
                src="https://res.cloudinary.com/dzwfde1hy/image/upload/v1752482090/Firma_Nera-1_quxlej.png"
                alt="Mmanfre Signature"
                className="w-full h-auto"
              />
              <p className="absolute bottom-[70px] left-0 right-0 text-lg md:text-xl text-gray-600">Fotografia</p>
            </div>
        </div>
        
        {showScrollPrompt && (
          <div className="absolute bottom-10 text-center transition-opacity duration-1000 animate-gentle-pulse">
            <p className="text-sm text-gray-500 mb-2">Esplora</p>
            <ArrowDownIcon className="w-6 h-6 mx-auto text-gray-500" />
          </div>
        )}
      </section>

      <section ref={categoriesSectionRef} id="categories-section" className="relative bg-[#F5F5F5] min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 w-full">
          {categories.map((category) => (
             <AnimatedCategory 
                key={category.id}
                category={category}
                onSelect={() => onSelectCategory(category)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
