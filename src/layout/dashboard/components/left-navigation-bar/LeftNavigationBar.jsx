import React from "react";
import "./leftNavigationBar.scss";

const NAV_ITEM = [
  {
    name: "Quản lý vật tư",
    component: "ItemsManager",
    accessRights: ["user", "admin"],
  },
  {
    name: "Quản lý danh mục vật tư",
    component: "CategoriesManager",
    accessRights: ["user", "admin"],
  },
  {
    name: "Quản lý nhân viên",
    component: "UsersManager",
    accessRights: ["admin"],
  },
  {
    name: "Yêu cầu duyệt",
    component: "RequestsBrowsingManager",
    accessRights: ["admin"],
  },
];

function LeftNavigationBar(props) {
  const classNames = (item) => {
    return `item ${item.component === props.activeComponent ? "active" : ""}`;
  };

  const listNav = NAV_ITEM.map((item, index) => {
    return (
      <div
        className={classNames(item)}
        key={index}
        onClick={() => props.onItemClick(item)}
      >
        {item.name}
      </div>
    );
  });

  return (
    <div className="leftNavigationBar">
      <div className="wrapper">{listNav}</div>
    </div>
  );
}

export default LeftNavigationBar;
