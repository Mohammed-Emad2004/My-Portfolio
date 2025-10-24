/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // Important for the CSS variable strategy with class switching
  theme: {
    extend: {
      colors: {
        // Define theme colors using CSS variables
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        'card-bg': 'var(--color-card-bg)',
        'card-border': 'var(--color-card-border)',
        'muted-foreground': 'var(--color-muted-foreground)',
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'primary-foreground': 'var(--color-primary-foreground)',
        accent: 'var(--color-accent)',
        'accent-foreground': 'var(--color-accent-foreground)', // Example: Text on accent background
        // Add more semantic color names as needed
        'button-secondary-bg': 'var(--color-button-secondary-bg)',
        'button-secondary-hover': 'var(--color-button-secondary-hover)',
        'button-secondary-foreground': 'var(--color-button-secondary-foreground)',
      },
      transitionProperty: {
        'colors': 'background-color, border-color, color, fill, stroke',
      }
    },
  },
  plugins: [],
};