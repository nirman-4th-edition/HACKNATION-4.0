import React from "react";
import "./Dashboard2.css"
import HealthStats2 from "./HealthStats2";
import Appointments2 from "./Appointments2";

const Dashboard2= () => {
  return (
    <>
    <div className="dashboard2">
        <HealthStats2/>
    <Appointments2/>
    </div>
    </>
  );
};

export default Dashboard2;
