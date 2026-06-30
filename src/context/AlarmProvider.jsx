import {useState, useEffect, useCallback } from "react";
import { AlarmContext } from "./AlarmContext";
import {
  deleteAlarm,
  fetchAlarms,
  onEdit,
  onSubmit,
} from "../services/alarmsApi";

export const AlarmProvider = ({ children }) => {
  const [alarms, setAlarms] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onAddItem = useCallback(async (data) => {
    setError(null);
    try {
      const newAlarm = await onSubmit(data);
      if (newAlarm && newAlarm.id) {
        setAlarms((prev) => [...prev, newAlarm]);
      }
    } catch (err) {
      setError(err.message);
    }
  }, []);

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

  const handleDelete = useCallback(async (id) => {
    setError(null);
    try {
      await deleteAlarm(id);
      setAlarms((prev) => prev.filter((alarm) => alarm.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const updateAlarm = useCallback(async (id, updateData) => {
    try {
      const updated = await onEdit(id, updateData);
      setAlarms((prev) =>
        prev.map((alarm) => (alarm.id === id ? updated : alarm)),
      );
    } catch (err) {
      setError(err.message);
    }
  }, []);


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
  const value = {
    alarms,
    isLoading,
    error,
    onAddItem,
    handleDelete,
    updateAlarm,
  };
  return <AlarmContext.Provider value = {value}>{children}</AlarmContext.Provider>
};
