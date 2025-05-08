import React from "react";
import navMenuData from "./navigation.data";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navigation = () => {
  const navigate = useNavigate();

  const userProfile = useSelector((store) => store.userProfile);

  const handleClick = (path) => () => {
    // const fetchUser = async () => {
    //   await dispatch(getUserProfile(jwtToken));
    // };

    if (path === "/profile") {
      // fetchUser();
      const userId = userProfile?.user?.id;
      if (userId) {
        navigate(`${path}/${userProfile.user.id}`);
        console.log(userProfile.user);
      } else {
        console.log("Error userID : ", userId);
      }
    } else {
      navigate(path);
    }
  };

  // useEffect(() => {

  //   // console.log("user : ", userProfile);
  // }, [dispatch, jwtToken]);

  return (
    <div className="px-8 flex flex-col gap-y-6">
      {navMenuData.map((item, index) => {
        const Icon = item.component;
        // const usersId = userProfile.user.id != null && userProfile.user.id;
        const path =
          item.path === "/profile"
            ? `${item.path}/${userProfile.user.id}`
            : item.path;
        return (
          <div className=" flex gap-5 items-center" key={index}>
            <Icon className="flex align-center" />
            <p className="text-xl cursor-pointer" onClick={handleClick(path)}>
              {item.title}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Navigation;
