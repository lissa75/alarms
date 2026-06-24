// client/src/App.js
import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes'

import { deleteAlarm, fetchAlarms, onEdit, onSubmit } from './services/alarmsApi';

function App() {
  const [alarms, setAlarms] = useState([]);
  const [isDark, setIsDark] = useState(() => {
    
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleAddAlarm = async (data) => {
    const newAlarm = await onSubmit(data);
    if (newAlarm && newAlarm.id) {
      setAlarms(prev => [...prev, newAlarm]);
    }
  };

  useEffect(() => {
    const loadAlarms = async () => {
      const data = await fetchAlarms();
      setAlarms(data);
    }
    loadAlarms();
  }, []);

  const handleDelete = async (id) => {
    await deleteAlarm(id);
    setAlarms(prev => prev.filter(alarm => alarm.id !== id));
  };

  const updateAlarm = async (id, updateData) => {
    const result = await onEdit(id, updateData);
    if (result && result !== "ошибка") {
      const freshData = await fetchAlarms();
      if (freshData) {
        setAlarms(freshData);
      }
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

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