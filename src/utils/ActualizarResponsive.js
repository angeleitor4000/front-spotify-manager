import { useEffect } from "react";

export function useForceUpdateOnRouteChange() {
  useEffect(() => {
    const handleResize = () => {
      // Forzar el rediseño
      window.dispatchEvent(new Event('resize'));
    };

    // Escuchar el evento de cambio de ruta
    window.addEventListener('popstate', handleResize);
    window.addEventListener('pushState', handleResize);
    window.addEventListener('replaceState', handleResize);

    return () => {
      window.removeEventListener('popstate', handleResize);
      window.removeEventListener('pushState', handleResize);
      window.removeEventListener('replaceState', handleResize);
    };
  }, []);
}
