import { useEffect, useState } from "react";

const useTheme = (): [string, (t: string) => void] => {
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  const setTheme = (t: string) => setThemeState(t);
  return [theme, setTheme];
};

export default useTheme;
