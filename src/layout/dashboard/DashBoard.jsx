import React from "react";
import Header from "./components/header/Header";
import LeftNavigationBar from "./components/left-navigation-bar/LeftNavigationBar";
import "./dashBoard.scss";

function DashBoardLayout({ children }) {
  return (
    <div className="adminDashboard">
      <Header />
      <div className="body">
        <LeftNavigationBar />
        {children}
      </div>
    </div>
  );
}

export default DashBoardLayout;
