import React, { createContext, useContext, useState } from "react";

interface LastUpdatedContextType {
  lastUpdated: Date;
  setLastUpdated: (date: Date) => void;
}

const LastUpdatedContext = createContext<LastUpdatedContextType | undefined>(undefined);

export const LastUpdatedProvider: React.FC = ({ children }) => {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const value = { lastUpdated, setLastUpdated };

  return (
    <LastUpdatedContext.Provider value={value}>
      {children}
    </LastUpdatedContext.Provider>
  );
};

export const useLastUpdatedContext = () => {
  const context = useContext(LastUpdatedContext);
  if (!context) {
    throw new Error("useLastUpdatedContext must be used within a LastUpdatedProvider");
  }
  return context;
};