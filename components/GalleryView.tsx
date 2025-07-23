import React from 'react';
import { Category, Photo } from '../types';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import ArrowLeftIcon from './icons/ArrowLeftIcon';

interface GalleryViewProps {
  category: Category;
  onSelectPhoto: (photo: Photo) => void;
  onGoBack: () => void;
  isDarkMode?: boolean;
}

const GalleryImage: React.FC<{ photo: Photo; onSelect: () => void; isDarkMode?: boolean; isFullWidth?: boolean }> = ({ photo, onSelect, isDarkMode, isFullWidth }) => {
    const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    const imageClasses = isDarkMode
      ? "w-full h-auto object-cover shadow-[0px_8px_30px_rgba(0,0,0,0.6)] transition-all duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:transform group-hover:-translate-y-1.5 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]"
      : "w-full h-auto object-cover shadow-[0px_8px_30px_rgba(0,0,0,0.08)] transition-all duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:transform group-hover:-translate-y-1.5 group-hover:shadow-[0px_15px_45px_rgba(0,0,0,0.12)]";

    return (
        <div 
            ref={ref}
            className={`break-inside-avoid mb-8 transition-opacity duration-700 ${isVisible ? 'opacity-100 animate-fadeInUp' : 'opacity-0'} ${isFullWidth ? '[column-span:all]' : ''}`}
        >
            <button
              onClick={onSelect}
              className={`group block w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 ${isDarkMode ? 'focus-visible:ring-white focus-visible:ring-offset-gray-800' : 'focus-visible:ring-[#1D1D1F]'}`}
              aria-label={photo.alt}
            >
                <img
                    src={photo.url}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    loading="lazy"
                    className={imageClasses}
                />
            </button>
        </div>
    );
};

const GalleryView: React.FC<GalleryViewProps> = ({ category, onSelectPhoto, onGoBack, isDarkMode }) => {
  
  const fullWidthPhotoIds = [26, 31];

  const backButtonClasses = isDarkMode
    ? 'text-gray-300 hover:text-white'
    : 'text-gray-600 hover:text-black';
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="flex items-center justify-between mb-12 sm:mb-16">
        <button
          onClick={onGoBack}
          className={`flex items-center gap-2 transition-colors duration-200 ${backButtonClasses}`}
          aria-label="Go back to categories"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="font-medium text-lg">Indietro</span>
        </button>
        <h1 className="text-right text-4xl sm:text-5xl md:text-6xl font-semibold">{category.name}</h1>
      </div>
      
      <div className="columns-1 md:columns-2 gap-8">
        {category.photos.map((photo) => (
          <GalleryImage 
            key={photo.id} 
            photo={photo} 
            onSelect={() => onSelectPhoto(photo)} 
            isDarkMode={isDarkMode}
            isFullWidth={fullWidthPhotoIds.includes(photo.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default GalleryView;