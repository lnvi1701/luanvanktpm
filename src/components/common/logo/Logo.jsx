import React from "react";
import "./logo.scss";
import logo from "../../../assets/logo/logo.png";

function Logo(props) {
  return (
    <div className="logo">
      <img className="img" src={logo} alt="logo" />
    </div>
  );
}

export default Logo;
