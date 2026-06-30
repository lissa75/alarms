import { useContext } from "react";
import {AlarmContext} from "../context/AlarmContext.jsx";

export const useAlarms = () => {
  const context = useContext(AlarmContext);
  if (!context) {
    throw new Error("useAlarm must be used within a AlarmProvider");
  }
  return context;
};
