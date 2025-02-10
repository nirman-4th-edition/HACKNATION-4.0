import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children, onClick }) => {
    return (
        <button className="custom-button" onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
