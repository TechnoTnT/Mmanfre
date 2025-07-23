import React, { useEffect, useRef, useState } from 'react';
import { Photo } from '../types';
import CloseIcon from './icons/CloseIcon';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';

interface LightboxProps {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  isDarkMode?: boolean;
}

const Lightbox: React.FC<LightboxProps> = ({ photos, currentIndex, onClose, onNext, onPrev, isDarkMode }) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [itemWidth, setItemWidth] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const navigationDisabled = isTransitioning;

  const handleNavigation = (direction: 'next' | 'prev') => {
    if (navigationDisabled) return;
    
    if (direction === 'next' && currentIndex < photos.length - 1) {
      setIsTransitioning(true);
      onNext();
    } else if (direction === 'prev' && currentIndex > 0) {
      setIsTransitioning(true);
      onPrev();
    }
  };
  
  const handleDragStart = (clientX: number) => {
    if (isTransitioning) return;
    setIsDragging(true);
    dragStartX.current = clientX;
    document.body.style.userSelect = 'none';
  };
  
  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const offset = clientX - dragStartX.current;
    setDragOffset(offset);
  };
  
  const handleDragEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);
    document.body.style.userSelect = 'auto';

    const swipeThreshold = 50;
    
    if (dragOffset < -swipeThreshold) {
      handleNavigation('next');
    } else if (dragOffset > swipeThreshold) {
      handleNavigation('prev');
    }
    
    setDragOffset(0);
  };

  useEffect(() => {
    const calculateWidth = () => {
      if (trackRef.current && trackRef.current.parentElement) {
        setItemWidth(trackRef.current.parentElement.getBoundingClientRect().width);
      }
    };

    calculateWidth();
    window.addEventListener('resize', calculateWidth);
    return () => window.removeEventListener('resize', calculateWidth);
  }, []);

  useEffect(() => {
    // Once the itemWidth is calculated, we can disable the initial load state.
    // This ensures the first positioning happens without an animation.
    if (itemWidth > 0 && isInitialLoad) {
      // Use rAF to ensure the transform is applied before transitions are enabled.
      requestAnimationFrame(() => {
        setIsInitialLoad(false);
      });
    }
  }, [itemWidth, isInitialLoad]);


  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    
    const onTransitionEnd = () => setIsTransitioning(false);
    
    track.addEventListener('transitionend', onTransitionEnd);
    return () => {
      if(track) track.removeEventListener('transitionend', onTransitionEnd);
    };
  }, [trackRef]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  const getTranslateX = () => {
    if (itemWidth === 0) return 0;
    return -currentIndex * itemWidth + dragOffset;
  };
  
  const trackStyle: React.CSSProperties = {
    transform: `translateX(${getTranslateX()}px)`,
    transition: isInitialLoad || isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
    cursor: isDragging ? 'grabbing' : 'grab',
    visibility: itemWidth === 0 ? 'hidden' : 'visible',
  };

  const backgroundClass = isDarkMode ? 'bg-black/20 backdrop-blur-lg' : 'bg-black/90';
  const controlColorClasses = {
    close: 'text-white hover:text-gray-300',
    nav: 'text-white/70 hover:text-white bg-black/20 hover:bg-black/40'
  };
      
  const currentPhoto = photos[currentIndex];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true" role="dialog" aria-label={currentPhoto?.alt}
      onMouseMove={(e) => handleDragMove(e.clientX)}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
      onTouchEnd={handleDragEnd}
    >
        <div 
            className={`fixed inset-0 animate-fadeInUp ${backgroundClass}`}
            style={{ animationDuration: '0.3s' }}
        />

        <div className="relative w-full h-full">
            <button 
              onClick={onClose} 
              className={`absolute top-4 right-4 md:top-6 md:right-6 z-[60] transition-colors ${controlColorClasses.close}`}
              aria-label="Close image viewer"
            >
              <CloseIcon className="w-8 h-8 md:w-10 md:h-10" />
            </button>

            {currentIndex > 0 && (
              <button 
                onClick={() => handleNavigation('prev')}
                disabled={navigationDisabled}
                className={`hidden md:block absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[60] p-2 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed ${controlColorClasses.nav}`}
                aria-label="Previous image"
              >
                <ArrowLeftIcon className="w-8 h-8" />
              </button>
            )}

            {currentIndex < photos.length - 1 && (
              <button 
                onClick={() => handleNavigation('next')}
                disabled={navigationDisabled}
                className={`hidden md:block absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[60] p-2 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed ${controlColorClasses.nav}`}
                aria-label="Next image"
              >
                <ArrowRightIcon className="w-8 h-8" />
              </button>
            )}
            
            <div 
              className="w-full h-full overflow-hidden"
              onMouseDown={(e) => { e.preventDefault(); handleDragStart(e.clientX); }}
              onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            >
                <div 
                    ref={trackRef}
                    className="h-full flex items-center"
                    style={trackStyle}
                >
                    {photos.map((p, index) => (
                        <div 
                            key={p.id} 
                            className="h-full flex-shrink-0 flex items-center justify-center p-4 md:p-16"
                            style={{ width: `${itemWidth}px` }}
                            aria-hidden={index !== currentIndex}
                        >
                            <img 
                                src={p.url} 
                                alt={p.alt}
                                className="block max-w-full max-h-full object-contain shadow-2xl select-none"
                                draggable="false"
                                style={{ pointerEvents: 'none' }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default Lightbox;