import React from "react";
import Header from "./components/header/Header";

function DashBoardLayout({ children }) {
  return (
    <div className="adminDashboard">
      <Header />
      {children}
    </div>
  );
}

export default DashBoardLayout;
