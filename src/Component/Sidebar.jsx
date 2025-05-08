import React from "react";
import Navigation from "./Navigation/Navigation";
import User from "./User/User";
import { Card, Divider } from "@mui/material";

const Sidebar = () => {
  return (
    <Card className="card flex flex-col justify-between h-screen">
      <div>
        <div className="px-8 pt-4 pb-8">
          <div className="logo">
            <span className=" text-4xl font-bold">Social App</span>
          </div>
        </div>

        {/* navigation */}
        <div>
          <Navigation />
        </div>
      </div>
      <div>
        <Divider />

        {/* user logged */}
        <div className="ml-5 py-3">
          <User />
        </div>
      </div>
    </Card>
  );
};

export default Sidebar;
