import {useState, useEffect, useCallback } from "react";
import {useAlarmsUI} from "../hooks/useAlarmsUI"
import { AlarmContext } from "./AlarmContext";
import {
  deleteAlarm,
  fetchAlarms,
  onEdit,
  onSubmit,
} from "../services/alarmsApi";

export const AlarmProvider = ({ children }) => {
  const [alarms, setAlarms] = useState([]);
  const {setError, setIsLoading} = useAlarmsUI()
 useEffect(() => {
      const loadAlarms = async () => {
        setIsLoading(true);
        setError(null);2
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
    }, [setError, setIsLoading]);
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

  const value = {
    alarms,
    onAddItem,
    handleDelete,
    updateAlarm,
  };
  return <AlarmContext.Provider value = {value}>{children}</AlarmContext.Provider>
};
