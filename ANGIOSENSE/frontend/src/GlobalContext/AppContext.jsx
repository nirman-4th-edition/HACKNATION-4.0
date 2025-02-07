import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppFieldsProvider = ({ children }) => {
  const [bloodSpo2, setSpo2] = useState([]);
  const [bioImpendence, setBioImpedence] = useState([]);
  const [pulseRate, setPulseRate] = useState([]);
  const [bodyTemperature, setBodyTemp] = useState([]);
  const [beatsAvg, setBeatsAvg] = useState([]);
  const DATA_URL = "54.83.118.12:8000/ws";

  return (
    <AppContext.Provider
      value={{
        bloodSpo2,
        setSpo2,
        bioImpendence,
        setBioImpedence,
        pulseRate,
        setPulseRate,
        bodyTemperature,
        setBodyTemp,
        DATA_URL,
        beatsAvg,
        setBeatsAvg,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppContext);
};

export default AppFieldsProvider;
