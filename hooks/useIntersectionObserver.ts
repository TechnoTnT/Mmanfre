
import { useState, useEffect, useRef, RefObject } from 'react';

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

function useIntersectionObserver<T extends HTMLElement>(
  options?: Args,
): [RefObject<T>, boolean] {
  const [isIntersecting, setIntersecting] = useState(false);
  const elementRef = useRef<T>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isCurrentlyIntersecting = entry.isIntersecting;
        if (options?.freezeOnceVisible && isCurrentlyIntersecting) {
          setIntersecting(true);
          observer.unobserve(element);
        } else if (!options?.freezeOnceVisible) {
           setIntersecting(isCurrentlyIntersecting);
        }
      },
      options
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options]);

  return [elementRef, isIntersecting];
}

export default useIntersectionObserver;
