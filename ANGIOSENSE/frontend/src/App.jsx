import React from "react";
import Dashboard from "./Pages/Dashboard";
import "./css/App.css";
import AppFieldsProvider from "./GlobalContext/AppContext";

function App() {
  return (
    <div className="App">
      <AppFieldsProvider>
        <Dashboard />
      </AppFieldsProvider>
    </div>
  );
}

export default App;
