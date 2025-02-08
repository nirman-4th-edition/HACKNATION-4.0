import React, { useEffect } from 'react';
import "./App.css";
import Layout from "./components/Layout/Layout";

const App = () => {
  useEffect(() => {
    document.title = "Tirthatsathi";
  }, []); 
  
  return (
    <div>
      <Layout />
      {/* Your other app content */}
    </div>
  );
};

export default App;
