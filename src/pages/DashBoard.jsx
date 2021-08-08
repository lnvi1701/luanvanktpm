import React from "react";
import DashBoardLayout from "../layout/dashboard/DashBoard";
import ItemsManager from "../components/dashboard/items-manager/ItemsManager";
import UsersManager from "../components/dashboard/users-manager/UsersManager";
import CategoriesManager from "../components/dashboard/categories-manager/CategoriesManager";
import RequestsBrowsingManager from "../components/dashboard/requests-browsing-manager/RequestsBrowsingManager";
import { useState } from "react";

const COMPONENTS = {
  ItemsManager: <ItemsManager />,
  UsersManager: <UsersManager />,
  CategoriesManager: <CategoriesManager />,
  RequestsBrowsingManager: <RequestsBrowsingManager />,
};

function DashBoard(props) {
  const [activeComponent, setActiveComponent] = useState("ItemsManager");

  const onItemClick = (item) => {
    setActiveComponent(item.component);
  };

  const renderActiveComponent = COMPONENTS[activeComponent];

  return (
    <DashBoardLayout onItemClick={onItemClick}>
      {renderActiveComponent}
    </DashBoardLayout>
  );
}

export default DashBoard;
