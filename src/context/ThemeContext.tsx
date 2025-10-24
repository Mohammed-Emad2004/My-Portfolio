import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first
    const storedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') as Theme | null : null;
    if (storedTheme) {
      return storedTheme;
    }
    // Check system preference if window is available
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    // Default to light
    return 'light';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return; // Skip effect on server-side rendering if applicable

    const root = window.document.documentElement;
    const currentTheme = theme;
    const oppositeTheme = currentTheme === 'light' ? 'dark' : 'light';

    root.classList.remove(oppositeTheme);
    root.classList.add(currentTheme);

    localStorage.setItem('theme', currentTheme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};