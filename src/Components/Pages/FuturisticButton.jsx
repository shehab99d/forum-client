import React from "react";
import "./FuturisticButton.css"; // custom css
import { NavLink } from "react-router";

const FuturisticButton = ({ text }) => {
    return (
        <NavLink to="/">
            <button

                className="cyber-btn">
                EXPLORE NOW
            </button>
        </NavLink>
    );
};

export default FuturisticButton;
