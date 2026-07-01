import { useContext } from "react";
import { AlarmsUIContext } from "../context/AlarmsUIContext";

export const useAlarmsUI = () => {
  const context = useContext(AlarmsUIContext);
  if (!context) {
    throw new Error("useAlarmsUI must  be used within a AlarmsUIProvider");
  }
   return context;
};
