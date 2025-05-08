import AddIcon from "@mui/icons-material/Add";
import { Avatar } from "@mui/material";
import Story from "./Story";
import styles from "./storyModule.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserStories } from "../../Redux/Story/story.action";
import CreateStoryForm from "./CreateStoryForm";

const StoryContainer = () => {
  const dispatch = useDispatch();

  const userStory = useSelector((store) => store.story.userStories);

  const [storyCreate, setStoryCreate] = useState(false);

  const handleClose = () => {
    setStoryCreate(false);
  };

  const handleStoryClick = () => {
    setStoryCreate(true);
  };

  useEffect(() => {
    const getuserstories = async () => {
      await dispatch(getUserStories());
    };

    getuserstories();
  }, [dispatch]);

  // console.log("User stories : ", userStory);

  return (
    <div className={"relative w-[95%] mx-auto " + styles.customScrollbar}>
      <section className="w-full flex justify-start gap-3 relative">
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={handleStoryClick}
        >
          <Avatar sx={{ width: "5rem", height: "5rem" }}>
            <AddIcon sx={{ fontSize: "3rem" }} />
          </Avatar>
          <p className="text-center">New</p>
        </div>

        {Array.isArray(userStory) &&
          userStory
            .sort((a, b) => b.storyId - a.storyId)
            .map((story) => {
              return (
                <div key={story.storyId}>
                  <Story story={story} />
                </div>
              );
            })}

        {storyCreate && (
          <CreateStoryForm open={storyCreate} handleClose={handleClose} />
        )}
      </section>
    </div>
  );
};

export default StoryContainer;
