import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const useScrollNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isNavigatingRef = useRef(false);
  const lastScrollRef = useRef(0);
  const scrollTimeoutRef = useRef(null);

  const routes = ['/', '/projects', '/about', '/contact'];

  useEffect(() => {
    let timeout;

    const handleScroll = () => {
      if (isNavigatingRef.current) return;

      // Clear previous timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Debounce scroll events
      scrollTimeoutRef.current = setTimeout(() => {
        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;
        const scrollDirection = scrollTop > lastScrollRef.current ? 'down' : 'up';
        
        lastScrollRef.current = scrollTop;

        const currentIndex = routes.indexOf(location.pathname);
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 3; // 3px threshold
        const isAtTop = scrollTop <= 3; // 3px threshold

        // Scroll down to next page
        if (scrollDirection === 'down' && isAtBottom && currentIndex < routes.length - 1) {
          isNavigatingRef.current = true;
          navigate(routes[currentIndex + 1]);
          
          timeout = setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'instant' });
            setTimeout(() => {
              isNavigatingRef.current = false;
            }, 300);
          }, 50);
        }
        
        // Scroll up to previous page
        else if (scrollDirection === 'up' && isAtTop && currentIndex > 0) {
          isNavigatingRef.current = true;
          navigate(routes[currentIndex - 1]);
          
          timeout = setTimeout(() => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            window.scrollTo({ top: maxScroll - 100, behavior: 'instant' });
            setTimeout(() => {
              isNavigatingRef.current = false;
            }, 500);
          }, 50);
        }
      }, 150); // 150ms debounce
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeout) clearTimeout(timeout);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [location.pathname, navigate]);
};

export default useScrollNavigation;
