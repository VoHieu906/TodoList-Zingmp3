import React from "react";
import ZingMP3logo from "../assets/ZingMP3logo.png";
import { SidebarMenu } from "../ultis/Menu"; //
import { NavLink } from "react-router-dom";
const notActiveStyle = { color: "#fff" };
const activeStyle = { color: "#0f7070" };
const LeftSidebar = () => {
  return (
    <div className="d-flex flex-column">
      <div className="w-100">
        <img src={ZingMP3logo} alt="Logo" style={{ width: "120px" }} />
      </div>
      <div className="d-flex flex-column py-2">
        {SidebarMenu.map((menu, index) => (
          <NavLink //Cho biết thẻ nào đang được active
            key={index}
            to={menu.path}
            end={menu.end}
            className="py-2 fw-bold text-decoration-none"
            style={({ isActive }) => (isActive ? activeStyle : notActiveStyle)}
          >
            {menu.icon} <span>{menu.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
