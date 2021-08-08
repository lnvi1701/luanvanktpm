import React from "react";
import { useState } from "react";
import Header from "./components/header/Header";
import LeftNavigationBar from "./components/left-navigation-bar/LeftNavigationBar";
import "./dashBoard.scss";

function DashBoardLayout({ children, onItemClick }) {
  const [isOpenNav, setIsOpenNav] = useState(true);

  const onToggleMenu = () => {
    setIsOpenNav(!isOpenNav);
  };

  const leftNavBar = isOpenNav ? (
    <LeftNavigationBar onItemClick={onItemClick} />
  ) : null;

  return (
    <div className="adminDashboard">
      <Header onHambugerClick={onToggleMenu} />
      <div className="body">
        {leftNavBar}
        {children}
      </div>
    </div>
  );
}

export default DashBoardLayout;
