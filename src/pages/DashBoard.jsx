import React from "react";
import DashBoardLayout from "../layout/dashboard/DashBoard";
import DashBoardPage from "../components/dashboard/DashBoardPage";

function DashBoard(props) {
  const onItemClick = (item) => {
    console.log(item);
  };

  return (
    <DashBoardLayout onItemClick={onItemClick}>
      <DashBoardPage />
    </DashBoardLayout>
  );
}

export default DashBoard;
