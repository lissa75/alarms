import { useEffect } from "react";
import { useThemeStore } from "../store/themeStore";

function ThemeToggle() {
  const isDark = useThemeStore((state) => state.isDark);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  useEffect(()=>{
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])
  return (
    <button
      onClick={toggleTheme}
      className="
        fixed top-4 right-4 z-50
        w-12 h-12 rounded-full
        bg-white dark:bg-gray-800
        shadow-lg dark:shadow-gray-700
        hover:shadow-xl
        flex items-center justify-center
        text-2xl
        transition-all duration-300
        border border-gray-200 dark:border-gray-700
        hover:scale-110
      "
      aria-label="Переключить тему"
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}

export default ThemeToggle;
