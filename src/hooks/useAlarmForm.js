import { useState } from "react";

export function useAlarmForm(onAddItem) {
  const [alarms, setAlarm] = useState({
    time: "",
    text: "",
  });

  const handleAddAlarm = (e) => {
    const { name, value } = e.target;
    setAlarm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      time: alarms.time,
      text: alarms.text,
    };
    await onAddItem(data);
    setAlarm({ time: "", text: "" });
  };

  return {alarms, handleAddAlarm, handleSubmit };
}
