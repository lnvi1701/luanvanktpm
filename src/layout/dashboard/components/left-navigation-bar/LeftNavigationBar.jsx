import React from "react";
import "./leftNavigationBar.scss";

const NAV_ITEM = [
  { name: "Quản lý vật tư", accessRights: ["user", "admin"] },
  { name: "Quản lý danh mục vật tư", accessRights: ["user", "admin"] },
  { name: "Quản lý nhân viên", accessRights: ["admin"] },
  { name: "Yêu cầu duyệt", accessRights: ["admin"] },
];

function LeftNavigationBar(props) {
  const listNav = NAV_ITEM.map((item, index) => {
    return (
      <div className="item" key={index} onClick={() => props.onItemClick(item)}>
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
