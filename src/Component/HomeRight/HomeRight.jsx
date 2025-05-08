import { Card } from "@mui/material";
import React, { useState } from "react";
import FollowUser from "../FollowUser/FollowUser";
import UserInput from "../UserInput.jsx/UserInput";

const HomeRight = () => {
  const follower = [1, 1, 1, 1, 1, 1, 1];

  const [viewAll, setViewAll] = useState(false);

  // const [theme,setTheme] = useState('light');

  const handleClick = () => {
    setViewAll(!viewAll);
  };

  return (
    <Card className="p-5 mt-5 sticky">
      {/* Search user */}
      {/* Add THeme */}
      <UserInput />
      <section className="mt-8">
        <div className="w-full flex justify-between px-[16px]">
          <p className="text-xl">Suggestion</p>
          <p className="text-xl cursor-pointer" onClick={handleClick}>
            View All
          </p>
        </div>
        <div className="mt-4">
          {/* <FollowUser /> */}
          {viewAll
            ? follower.map((item, index) => {
                return (
                  <div key={index}>
                    <FollowUser />
                  </div>
                );
              })
            : follower.slice(0, 3).map((item, index) => {
                return (
                  <div key={index}>
                    <FollowUser />
                  </div>
                );
              })}
        </div>
      </section>
    </Card>
  );
};

export default HomeRight;
