import { useEffect } from 'react';

interface NoTasksSEOProps {
  hasTasks: boolean;
}

export default function NoTasksSEO({ hasTasks }: NoTasksSEOProps) {
  useEffect(() => {
    if (!hasTasks) {
      // Add noindex meta tag when no tasks
      const meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'noindex';
      document.head.appendChild(meta);

      return () => {
        // Remove noindex when component unmounts or hasTasks becomes true
        const existingMeta = document.querySelector('meta[name="robots"]');
        if (existingMeta) {
          document.head.removeChild(existingMeta);
        }
      };
    }
  }, [hasTasks]);

  return null;
}
