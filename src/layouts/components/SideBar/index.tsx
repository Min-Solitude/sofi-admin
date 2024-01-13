import React from "react";
import Title from "../../../components/customs/Title";
import { NavLink } from "react-router-dom";
import IonIcon from "@reacticons/ionicons";

type SideBarProps = {
  className?: string;
};

export default function SideBar({ className }: SideBarProps) {
  return (
    <div
      className={`p-4 flex flex-col border-r border-gray-200 items-center gap-4 ${className}`}
    >
      <Title className="py-4 text-2xl">Sofi Admin</Title>
      <div className=" rounded-xl border border-gray-200  w-full shadow-main p-4">
        <div className="rounded-lg h-[20vh] overflow-hidden">
          <img
            src="https://i.pinimg.com/564x/c5/78/01/c578016530bbe87cf181c90617a48835.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className=" rounded-xl border border-gray-200 shadow-main p-4 w-full h-full flex flex-col gap-4">
        <NavLink
          to="/dashboard"
          className={(active) =>
            `flex items-center gap-4 py-2 px-4 rounded-lg ${
              active.isActive
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                : "text-gray-500"
            }`
          }
        >
          <IonIcon name="stats-chart" className="text-xl" />
          <span>Thống kê</span>
        </NavLink>
        <NavLink
          to="/"
          className={(active) =>
            `flex items-center font-medium gap-4 py-2 px-4 rounded-full ${
              active.isActive
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                : "text-gray-500"
            }`
          }
        >
          <IonIcon name="home" className="text-xl" />
          <span>Trang chủ</span>
        </NavLink>
        <NavLink
          to="/post"
          className={(active) =>
            `flex items-center gap-4 py-2 px-4 rounded-lg ${
              active.isActive
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                : "text-gray-500"
            }`
          }
        >
          <IonIcon name="newspaper" className="text-xl" />
          <span>Bài viết</span>
        </NavLink>
        <NavLink
          to="/story"
          className={(active) =>
            `flex items-center gap-4 py-2 px-4 rounded-lg ${
              active.isActive
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                : "text-gray-500"
            }`
          }
        >
          <IonIcon name="book" className="text-xl" />
          <span>Câu chuyện</span>
        </NavLink>
        <NavLink
          to="/system"
          className={(active) =>
            `flex items-center gap-4 py-2 px-4 rounded-lg ${
              active.isActive
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                : "text-gray-500"
            }`
          }
        >
          <IonIcon name="settings" className="text-xl" />
          <span>Hệ thống</span>
        </NavLink>
        <NavLink
          to="/altar"
          className={(active) =>
            `flex items-center gap-4 py-2 px-4 rounded-lg ${
              active.isActive
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                : "text-gray-500"
            }`
          }
        >
          <IonIcon name="heart" className="text-xl" />
          <span>Điều ước</span>
        </NavLink>
      </div>
    </div>
  );
}
