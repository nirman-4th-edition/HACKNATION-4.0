import React from "react";
import "./Separator.css"; 

const Separator = ({title}) => {
  return (
    <div className="button-container">
      <span className="interactive-btn">{title}</span>
    </div>
  );
};

export default Separator;
