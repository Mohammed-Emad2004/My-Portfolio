import { useState, useEffect } from 'react';

// تعريف نوع الـ Theme
type Theme = 'light' | 'dark';

function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => {
    // التأكد من أن الكود يعمل فقط في المتصفح
    if (typeof window === 'undefined') {
      return 'dark'; // أو 'light' كقيمة افتراضية
    }

    const storedTheme = window.localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      return storedTheme;
    }

    // التحقق من تفضيل المستخدم في النظام
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    return systemPrefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = window.document.documentElement;
    const oldTheme = theme === 'light' ? 'dark' : 'light';

    root.classList.remove(oldTheme);
    root.classList.add(theme);

    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return [theme, toggleTheme];
}

export default useTheme;