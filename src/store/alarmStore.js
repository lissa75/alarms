import { create } from "zustand";
import {
  deleteAlarm,
  fetchAlarms,
  onEdit,
  onSubmit,
} from "../services/alarmsApi";
import { devtools } from "zustand/middleware";

export const useAlarmsStore = create(devtools((set) => ({
  alarms: [],
  setAlarms: (newAlarms) => set({ alarms: newAlarms }),

  isLoading: false,
  error: null,
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  onAddItem: async (data) => {
    set({ error: null });
    try {
      const newAlarm = await onSubmit(data);

      if (newAlarm && newAlarm.id) {
        set((state) => ({ alarms: [...state.alarms, newAlarm] }));
      }
    } catch (err) {
      set({ error: err.message });
    }
  },
  handleDelete: async (id) => {
    set({ error: null });
    try {
      await deleteAlarm(id);
      set((state) => ({
        alarms: state.alarms.filter((alarm) => alarm.id !== id),
      }));
    } catch (err) {
      set({ error: err.message });
    }
  },
updateAlarm: async (id, updateData) => {
  try {
    const updated = await onEdit(id, updateData);
    set((state) => ({
      alarms: state.alarms.map((a) => (a.id === id ? updated : a)),
    }));
  } catch (err) {
    set({ error: err.message });
  }
},

  loadAlarms: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchAlarms();
      set({ alarms: data });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },
})));
