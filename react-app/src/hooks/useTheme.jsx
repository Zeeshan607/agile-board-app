import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'agileboard-theme';

const getInitialTheme = () => {
  const current = document.documentElement.getAttribute('data-theme');
  if (current) return current;
  return localStorage.getItem(STORAGE_KEY) || 'light';
};

// Mirrors the inline anti-flash script in index.html: keeps the
// `data-theme` attribute (and localStorage) in sync with React state.
export const useTheme = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggleTheme };
};
