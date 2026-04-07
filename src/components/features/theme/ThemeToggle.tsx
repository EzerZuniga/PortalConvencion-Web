import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks';

interface ThemeToggleProps {
  scrolled?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ scrolled = false }) => {
  const { darkMode, mounted, toggleTheme } = useTheme();

  if (!mounted) {
    return (
      <div className="p-2 w-9 h-9 rounded-full" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors duration-200 focus:outline-none ${
        scrolled
          ? 'text-slate-800 dark:text-white'
          : 'text-white'
      }`}
      aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={darkMode ? 'Modo claro' : 'Modo oscuro'}
    >
      {darkMode ? (
        <Sun className="w-5 h-5" strokeWidth={2} />
      ) : (
        <Moon className="w-5 h-5" strokeWidth={2} />
      )}
    </button>
  );
};

export default ThemeToggle;
