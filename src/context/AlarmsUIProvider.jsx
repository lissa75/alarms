import { useState } from "react";
import { AlarmsUIContext } from "./AlarmsUIContext";

export const AlarmsUIProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const value = {
    isLoading,
    error,
    setIsLoading,
    setError,
  };
  return (
    <AlarmsUIContext.Provider value={value}>
      {children}
    </AlarmsUIContext.Provider>
  );
};
