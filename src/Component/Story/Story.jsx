import { Avatar } from "@mui/material";
import React, { useState } from "react";
import StoryView from "./StoryView";

const Story = ({ story }) => {
  const username =
    "@" +
    story.user?.firstName.toLowerCase() +
    story.user?.lastName.toLowerCase();

  const [storyViewed, setStoryViewed] = useState(false);

  const handleClose = () => {
    setStoryViewed(false);
  };

  const handleClick = () => {
    setStoryViewed(true);
  };

  return (
    <>
      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={handleClick}
      >
        <Avatar src={story.storyImage} sx={{ width: "5rem", height: "5rem" }} />
        <p className="text-center">{username}</p>
      </div>

      {storyViewed && (
        <StoryView open={storyViewed} handleClose={handleClose} story={story} />
      )}
    </>
  );
};

export default Story;
