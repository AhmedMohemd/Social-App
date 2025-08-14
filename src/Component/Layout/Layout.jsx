import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto my-5 ">
        <Outlet />
      </div>
    </div>
  );
}
