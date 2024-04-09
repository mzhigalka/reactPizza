import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};
//added layouts and Outlet
export default MainLayout;
