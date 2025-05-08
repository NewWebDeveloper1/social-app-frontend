import {
  Avatar,
  Backdrop,
  Button,
  Card,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tablists from "./Tablists";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileById } from "../../Redux/UserProfile/user.action";
import EditProfile from "./EditProfile";

const Profile = () => {
  const { id } = useParams();

  const [backgroundImage, setBackgroundImage] = useState(
    "https://cdn.pixabay.com/photo/2016/05/24/16/48/mountains-1412683_1280.png"
  );

  const [avatarImage, setAvatarImage] = useState(
    "https://cdn.pixabay.com/photo/2022/12/10/21/34/volkswagen-7647805_1280.jpg"
  );

  const [openEditProfile, setOpenEditProfile] = useState(false);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const loggedUser = useSelector((store) => store.userProfile.user);

  const userPosts = useSelector((store) => store.posts.userPosts);

  const user = useSelector((store) => store.userProfile.selectedUser);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      setLoading(true);
      await dispatch(getUserProfileById(id));
      setLoading(false);
    };

    if (id && user?.userId !== id) {
      fetchUser();
    }
  }, [id]);

  const handleClose = () => setOpenEditProfile(false);

  const handleEditProfileBtn = () => setOpenEditProfile(true);

  const isOwnProfile = loggedUser?.id === user?.userId;

  if (loading || !user) {
    return <p>Loading....</p>;
  }

  return (
    <>
      <Card className="py-10 w-[70%]">
        <div>
          <div className="h-[15rem]">
            <img src={backgroundImage} className="rounded-md w-full h-full" />
          </div>
          <div className="flex justify-between items-start mt-5 px-5 h-[5rem]">
            <Avatar
              src={avatarImage}
              className="transform -translate-y-24"
              sx={{ height: "10rem", width: "10rem" }}
            />
            <Button variant="outlined" sx={{ borderRadius: "20px" }}>
              {isOwnProfile ? (
                <p onClick={handleEditProfileBtn}>Edit Profile</p>
              ) : (
                <p>Follow User</p>
              )}
            </Button>
          </div>

          {user && (
            <div className="px-8 py-5">
              <h1 className="py-1 font-bold text-xl">
                {user.firstName + " " + user.lastName}
              </h1>
              <p className="text-md">{`@${user?.firstName.toLowerCase()}_${user?.lastName.toLowerCase()}`}</p>
              <div className="flex justify-start gap-4 py-3">
                <span>{userPosts.length} Posts</span>
                <span>{user.followers.length} Followers</span>
                <span>{user.following.length} Following</span>
              </div>
              <p className="userBio">Hey, Nice to have a lovely guest here!</p>
            </div>
          )}

          {openEditProfile && (
            <EditProfile
              handleClose={handleClose}
              updateAvatarImg={setAvatarImage}
              updateBackgroundImg={setBackgroundImage}
              open={setOpenEditProfile}
            />
          )}

          {/* Tablists */}
          <Tablists />
        </div>
      </Card>
    </>
  );
};

export default Profile;
