import React, { useEffect, useState } from "react";
import Story from "../Story/Story";
import StoryContainer from "../Story/StoryContainer";
import { Avatar, Card, IconButton, TextField } from "@mui/material";
import styles from "./Middlepart.module.css";
import options from "./options.data";
import PostCard from "../Post/PostCard";
import PostCardCreate from "../Post/PostCardCreate";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../../Redux/Post/post.action";

const Middlepart = () => {
  const [openCreatePostCard, setCreatePostCard] = useState(false);

  const posts = useSelector((store) => store.posts.allPosts);

  const dispatch = useDispatch();

  const handleClose = () => setCreatePostCard(false);

  const handleOpenPostCard = () => setCreatePostCard(true);

  useEffect(() => {
    const fetchAllPosts = async () => {
      await dispatch(getAllPost());
    };
    if (posts) {
      fetchAllPosts();
    }
  }, [dispatch, posts.allPosts]);

  const handleClick = () => {
    setCreatePostCard(true);
  };

  return (
    <div className="w-full flex flex-col gap-y-5">
      <Card className={"w-full card py-4 px-4 " + styles.customScrollbar}>
        <StoryContainer />
      </Card>

      <Card className="w-full p-4 flex flex-col">
        <div className=" flex items-center justify-center gap-4">
          <Avatar />
          <input
            type="text"
            readOnly
            onClick={handleOpenPostCard}
            className="border rounded-full border-[#3b4054] bg-transparent w-4/5  px-5 py-3 items-center cursor-pointer"
            placeholder="Create a post..."
          />
        </div>
        <div className="flex justify-center gap-5 mt-5">
          {options.map((item, index) => {
            const Icon = item.icon;

            return (
              <div className="flex gap-2 items-center" key={index}>
                <IconButton className="cursor-pointer" onClick={handleClick}>
                  <Icon />
                </IconButton>
                <p>{item.title}</p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Post card */}

      <div className="mt-5">
        {Array.isArray(posts) ? (
          posts
            .sort((a, b) => b.postId - a.postId)
            .map((item, index) => (
              <div key={index}>
                <PostCard posts={item} />
              </div>
            ))
        ) : (
          <p className="mt-5"> Loading...</p>
        )}
      </div>

      {openCreatePostCard && (
        <PostCardCreate handleClose={handleClose} open={openCreatePostCard} />
      )}
    </div>
  );
};

export default Middlepart;
