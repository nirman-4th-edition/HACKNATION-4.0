import React from "react";
import "./Dashboard1.css"
import HealthStats from "./HealthStats";
import Appointments1 from "./Appointments1";

const Dashboard1 = () => {
  return (
    <>
    <div className="dashboard1">
        <HealthStats/>
    <Appointments1/>
    </div>
    </>
  );
};

export default Dashboard1;
