import { Box, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useMemo, useState } from "react";
import TabValues from "./TabValues.data";
import PostCard from "../Post/PostCard";
import UserCard from "../Reels/UserCard";
import { useDispatch, useSelector } from "react-redux";
import { getUsersPost } from "../../Redux/Post/post.action";
import { getUserReel } from "../../Redux/Reels/reels.action";

const Tablists = () => {
  const [value, setValue] = useState("post");

  const [loading, setLoading] = useState(false);

  const reels = useSelector((store) => store.reel.userReels);

  const userPosts = useSelector((store) => store.posts.userPosts);

  // console.log("Tablist user reels : ", reels);
  // const user = useSelector((store) => store.userProfile.user);

  // const savedPosts = user.savedPost;

  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    setValue(value);
  };

  useEffect(() => {
    const userreel = async () => {
      await dispatch(getUserReel());
    };

    userreel();
  }, []);

  useEffect(() => {
    // if (userPosts) return;

    const fetchData = async () => {
      setLoading(true);
      await dispatch(getUsersPost());
      setLoading(false);
    };

    fetchData();
    // setLoading(false);
    // console.log("User post : ", userPosts);
  }, []);

  // 🔁 Memoized tab headers
  const tabHeaders = useMemo(
    () => (
      <TabList onChange={handleChange} aria-label="lab API tabs example">
        {TabValues.map((item, index) => (
          <Tab key={index} label={item.label} value={item.value} />
        ))}
      </TabList>
    ),
    []
  );

  // Memoized post headers
  const postHeaders = useMemo(() => {
    if (!Array.isArray(userPosts) || userPosts.length === 0) {
      return <p className="text-center">No posts found.</p>;
    }
    return userPosts.map((post, index) => (
      <PostCard key={index} posts={post} />
    ));
  }, [userPosts]);

  // Memoized reels headers
  const reelsHeaders = useMemo(() => {
    if (!Array.isArray(reels) || reels.length === 0) {
      return <p className="text-center">No reels found.</p>;
    }
    return reels.map((reel) => <UserCard reel={reel} key={reel.reelId} />);
  }, [reels]);

  // Memoized savedPosts headers

  // const savedPostHeaders = useMemo(() => {
  //   if (!Array.isArray(savedPosts) || savedPosts.length === 0) {
  //     return <p className="text-center">No posts found.</p>;
  //   }
  //   return savedPosts.map((post, index) => (
  //     <PostCard key={index} posts={post} />
  //   ));
  // }, [savedPosts]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              {tabHeaders}
            </Box>

            {/* User Posts */}
            <TabPanel className="w-[70%] mx-auto" value="post">
              {postHeaders}
            </TabPanel>

            {/* User Reels */}
            <TabPanel className="w-[70%] mx-auto" value="reels">
              {reelsHeaders}
            </TabPanel>

            {/* Saved Posts */}
            <TabPanel className="w-[70%] mx-auto" value="saved">
              {postHeaders}
            </TabPanel>

            {/* Reposts */}
            <TabPanel className="text-center" value="repost">
              No Repost...
            </TabPanel>
          </TabContext>
        </Box>
      )}
    </>
  );
};

export default Tablists;
