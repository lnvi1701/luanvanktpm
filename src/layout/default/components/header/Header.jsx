import Button from "@material-ui/core/Button";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../../components/common/logo/Logo";
import "./header.scss";

function Header(props) {
  return (
    <header className="header">
      <Link to="/">
        <div className="logoContainer">
          <Logo />
        </div>
      </Link>

      <div className="left">
        <Link to="/login">
          <Button variant="contained" color="primary">
            Login
          </Button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
