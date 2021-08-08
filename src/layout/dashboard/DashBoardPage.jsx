import React from "react";
import Header from "./components/header/Header";

function DashBoardPage({ children }) {
  return (
    <div className="adminDashboard">
      <Header />
      {children}
    </div>
  );
}

export default DashBoardPage;
