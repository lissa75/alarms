import { useState } from "react";
import { useCallback } from "react";
import { useAlarmsStore } from "../store/alarmStore";

export function useAlarmForm() {

  const onAddItem = useAlarmsStore(state=>state.onAddItem)
  const [alarms, setAlarm] = useState({
    time: "",
    text: "",
  });

  const handleAddAlarm= (e) => {
    const { name, value } = e.target;
    setAlarm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const data = {
        time: alarms.time,
        text: alarms.text,
      };
      await onAddItem(data);
      setAlarm({ time: "", text: "" });
    },
    [alarms, onAddItem],
  );

  return { alarms, handleAddAlarm, handleSubmit };
}
