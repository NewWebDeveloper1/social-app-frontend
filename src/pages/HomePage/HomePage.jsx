import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import Sidebar from "../../Component/Sidebar";
import { Route, Router, Routes, useLocation } from "react-router-dom";
import Middlepart from "../../Component/Middlepart/Middlepart";
import CreateReelsForm from "../../Component/Reels/CreateReelsForm";
import Reels from "../../Component/Reels/Reels";
import Profile from "../../Component/Profile/Profile";
import HomeRight from "../../Component/HomeRight/HomeRight";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../../Redux/UserProfile/user.action";
import PostCardCreate from "../../Component/Post/PostCardCreate";
// import { getAllPost } from "../../Redux/Post/post.action";

const HomePage = () => {
  const location = useLocation();

  const dispatch = useDispatch();

  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getUserProfile(jwt));
  }, [dispatch, jwt]);

  return (
    <Grid container spacing={0}>
      {location.pathname != "/messages" && (
        <Grid size={{ lg: 3, xs: 0 }}>
          <div className="sticky top-0 w-full px-10">
            <Sidebar />
          </div>
        </Grid>
      )}

      <Grid
        size={{ lg: location.pathname === "/" ? 6 : 9, xs: 12 }}
        className="flex justify-center pr-20"
      >
        <Routes>
          <Route path="/" element={<Middlepart />} />
          <Route path="/reels" element={<Reels />} />
          <Route path="/create-reels" element={<CreateReelsForm />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/create-reels" element={<CreateReelsForm />} />
        </Routes>

        {/* Or if using Component prop use following way:
          <Routes>
            <Route path="/" Component={Middlepart} />
            <Route path="/reels" Component={Reels} />
            <Route path="/create-reel" Component={CreateReelsForm} />
            <Route path="/profile/:id" Component={Profile} />
          </Routes>
         */}
      </Grid>

      {location.pathname === "/" && (
        <Grid size={{ lg: 3 }}>
          <div className="top-0 sticky w-[90%]">
            <HomeRight />
          </div>
        </Grid>
      )}
    </Grid>
  );
};

export default HomePage;
