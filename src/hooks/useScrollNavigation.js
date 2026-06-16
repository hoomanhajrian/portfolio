import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const routes = ['/', '/projects', '/analyze', '/about', '/contact'];

const useScrollNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isNavigatingRef = useRef(false);
  const isPageLoadedRef = useRef(false);
  const navigationCooldownRef = useRef(false);
  const navigationLockMs = 900;

  useEffect(() => {
    isPageLoadedRef.current = false;
    isNavigatingRef.current = true;
    navigationCooldownRef.current = true;

    const loadTimeout = setTimeout(() => {
      window.scrollTo(0, 0);
      isPageLoadedRef.current = true;
      isNavigatingRef.current = false;
      navigationCooldownRef.current = false;
    }, navigationLockMs);

    return () => clearTimeout(loadTimeout);
  }, [location.pathname]);

  useEffect(() => {
    let timeout;

    const handleWheel = (event) => {
      if (isNavigatingRef.current || navigationCooldownRef.current || !isPageLoadedRef.current) {
        return;
      }

      const { deltaY } = event;
      if (Math.abs(deltaY) < 12) {
        return;
      }

      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;
      const isAtTop = scrollTop <= 5;
      const currentIndex = routes.indexOf(location.pathname);

      if (deltaY > 0 && isAtBottom && currentIndex < routes.length - 1) {
        isNavigatingRef.current = true;
        navigationCooldownRef.current = true;
        navigate(routes[currentIndex + 1]);

        timeout = setTimeout(() => {
          window.requestAnimationFrame(() => window.scrollTo(0, 0));
          navigationCooldownRef.current = false;
        }, 100);
      }

      else if (deltaY < 0 && isAtTop && currentIndex > 0) {
        isNavigatingRef.current = true;
        navigationCooldownRef.current = true;
        navigate(routes[currentIndex - 1]);

        timeout = setTimeout(() => {
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          window.requestAnimationFrame(() => window.scrollTo(0, Math.max(maxScroll - 100, 0)));
          navigationCooldownRef.current = false;
        }, 100);
      }
    };

    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e) => {
      touchEndY = e.changedTouches[0].screenY;
      handleGesture();
    };

    const handleGesture = () => {
      if (isNavigatingRef.current || navigationCooldownRef.current || !isPageLoadedRef.current) return;

      const distance = touchStartY - touchEndY;
      if (Math.abs(distance) < 50) return;

      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;
      const isAtTop = scrollTop <= 5;
      const currentIndex = routes.indexOf(location.pathname);

      if (distance > 0 && isAtBottom && currentIndex < routes.length - 1) {
        isNavigatingRef.current = true;
        navigationCooldownRef.current = true;
        navigate(routes[currentIndex + 1]);

        timeout = setTimeout(() => {
          window.requestAnimationFrame(() => window.scrollTo(0, 0));
          navigationCooldownRef.current = false;
        }, 100);
      } else if (distance < 0 && isAtTop && currentIndex > 0) {
        isNavigatingRef.current = true;
        navigationCooldownRef.current = true;
        navigate(routes[currentIndex - 1]);

        timeout = setTimeout(() => {
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          window.requestAnimationFrame(() => window.scrollTo(0, Math.max(maxScroll - 100, 0)));
          navigationCooldownRef.current = false;
        }, 100);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      if (timeout) clearTimeout(timeout);
    };
  }, [location.pathname, navigate]);
};

export default useScrollNavigation;
