import React, { createContext, useContext, useState, ReactNode } from 'react';

const UIContext = createContext<UIContextProps | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => setIsSidebarVisible((prev) => !prev);

  return (
    <UIContext.Provider
      value={{
        isSidebarVisible,
        toggleSidebar
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export interface UIContextProps {
  isSidebarVisible: boolean;
  toggleSidebar: () => void;
}

export const useUIContext = (): UIContextProps => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
