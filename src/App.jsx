// client/src/App.js
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

import {
  deleteAlarm,
  fetchAlarms,
  onEdit,
  onSubmit,
} from "./services/alarmsApi";

function App() {
  const [alarms, setAlarms] = useState([]);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const handleAddAlarm = async (data) => {
    setError(null);
    try {
      const newAlarm = await onSubmit(data);
      if (newAlarm && newAlarm.id) {
        setAlarms((prev) => [...prev, newAlarm]);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const loadAlarms = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchAlarms();
        setAlarms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadAlarms();
  }, []);

  const handleDelete = async (id) => {
    setError(null);
    try {
      await deleteAlarm(id);
      setAlarms((prev) => prev.filter((alarm) => alarm.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const updateAlarm = async (id, updateData) => {
    try {
      const result = await onEdit(id, updateData);
      if (result && result !== "ошибка") {
        const freshData = await fetchAlarms();
        if (freshData) {
          setAlarms(freshData);
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 dark:text-gray-400">Загрузка...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-4 border border-red-500 rounded bg-red-50 dark:bg-red-900/20">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }
  return (
    <BrowserRouter>
      <AppRoutes
        alarms={alarms}
        handleAddAlarm={handleAddAlarm}
        handleDelete={handleDelete}
        updateAlarm={updateAlarm}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
    </BrowserRouter>
  );
}

export default App;
