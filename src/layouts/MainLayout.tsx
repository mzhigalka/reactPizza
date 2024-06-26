import { FC } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";

const MainLayout: FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
