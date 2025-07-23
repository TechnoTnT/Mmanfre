import React, { useState, useCallback, useEffect } from 'react';
import { PHOTO_CATEGORIES } from './constants';
import { Category, Photo } from './types';
import LandingPage from './components/LandingPage';
import GalleryView from './components/GalleryView';
import Lightbox from './components/Lightbox';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [scrollToCategories, setScrollToCategories] = useState(false);

  const openGallery = useCallback((category: Category) => {
    setActiveCategory(category);
    setScrollToCategories(false);
    window.scrollTo(0, 0);
  }, []);

  const handleGoBack = useCallback(() => {
    setActiveCategory(null);
    setScrollToCategories(true);
  }, []);

  const openLightbox = useCallback((photo: Photo, category: Category) => {
    const photoIndex = category.photos.findIndex(p => p.id === photo.id);
    setActiveCategory(category); // Ensure category is set for next/prev
    setCurrentPhotoIndex(photoIndex);
    setLightboxPhoto(photo);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxPhoto(null);
  }, []);

  const handleNextPhoto = useCallback(() => {
    if (!activeCategory || !lightboxPhoto) return;
    const nextIndex = currentPhotoIndex + 1;
    if (nextIndex < activeCategory.photos.length) {
      setCurrentPhotoIndex(nextIndex);
      setLightboxPhoto(activeCategory.photos[nextIndex]);
    }
  }, [currentPhotoIndex, activeCategory, lightboxPhoto]);

  const handlePrevPhoto = useCallback(() => {
    if (!activeCategory || !lightboxPhoto) return;
    const prevIndex = currentPhotoIndex - 1;
    if (prevIndex >= 0) {
      setCurrentPhotoIndex(prevIndex);
      setLightboxPhoto(activeCategory.photos[prevIndex]);
    }
  }, [currentPhotoIndex, activeCategory, lightboxPhoto]);

  // Handle dark mode
  useEffect(() => {
    const isDarkModeActive = activeCategory?.id === 'black-and-white';
    
    if (isDarkModeActive) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    // Reset dark mode when navigating away
    return () => {
      document.body.classList.remove('dark-mode');
    }
  }, [activeCategory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxPhoto) return;
      if (e.key === 'ArrowRight') {
        handleNextPhoto();
      } else if (e.key === 'ArrowLeft') {
        handlePrevPhoto();
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxPhoto, handleNextPhoto, handlePrevPhoto, closeLightbox]);

  const isDarkMode = activeCategory?.id === 'black-and-white';

  return (
    <main className="min-h-screen">
      {!activeCategory ? (
        <div className="animate-fadeInUp">
          <LandingPage 
            categories={PHOTO_CATEGORIES} 
            onSelectCategory={openGallery}
            shouldScrollToCategories={scrollToCategories}
            onDidScrollToCategories={() => setScrollToCategories(false)}
          />
        </div>
      ) : (
        <div className="animate-fadeInUp">
          <GalleryView 
            category={activeCategory} 
            onSelectPhoto={(photo) => openLightbox(photo, activeCategory)}
            onGoBack={handleGoBack}
            isDarkMode={isDarkMode}
          />
        </div>
      )}

      {lightboxPhoto && activeCategory && (
        <Lightbox 
          photos={activeCategory.photos}
          currentIndex={currentPhotoIndex}
          onClose={closeLightbox}
          onNext={handleNextPhoto}
          onPrev={handlePrevPhoto}
          isDarkMode={isDarkMode}
        />
      )}
    </main>
  );
};

export default App;
