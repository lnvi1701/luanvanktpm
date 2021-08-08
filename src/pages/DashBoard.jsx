import React from "react";
import DashBoardLayout from "../layout/dashboard/DashBoard";
import DashBoardPage from "../components/dashboard/DashBoardPage";

function DashBoard(props) {
  return (
    <DashBoardLayout>
      <DashBoardPage />
    </DashBoardLayout>
  );
}

export default DashBoard;
