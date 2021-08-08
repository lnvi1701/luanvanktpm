import React from "react";
import { useState } from "react";
import Header from "./components/header/Header";
import LeftNavigationBar from "./components/left-navigation-bar/LeftNavigationBar";
import "./dashBoard.scss";

function DashBoardLayout({ children, onItemClick, activeComponent }) {
  const [isOpenNav, setIsOpenNav] = useState(true);

  const onToggleMenu = () => {
    setIsOpenNav(!isOpenNav);
  };

  const leftNavBar = isOpenNav ? (
    <LeftNavigationBar
      onItemClick={onItemClick}
      activeComponent={activeComponent}
    />
  ) : null;

  return (
    <div className="adminDashboard">
      <Header onHambugerClick={onToggleMenu} />
      <div className="body">
        {leftNavBar}
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default DashBoardLayout;
