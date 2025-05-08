import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateReelsForm from "./CreateReelsForm";
import UserCard from "./UserCard";
import { Button, Card } from "@mui/material";
import { getAllReels } from "../../Redux/Reels/reels.action";
import styles from "./reelModule.module.css";

const Reels = () => {
  const allReels = useSelector((store) => store.reel.allReels);

  const dispatch = useDispatch();

  const [reelUrl, setReelUrl] = useState();

  useEffect(() => {
    const allPresentReels = async () => {
      await dispatch(getAllReels());
      // console.log("All reels : ", allReels);
    };

    allPresentReels();
  }, []);

  return (
    <Card className="h-screen w-full p-4">
      {/* <Button variant="outlined" onClick={handelCreateReel}>
        Create Reel
      </Button> */}
      <div className="h-[75vh] w-full px-5 flex justify-center mx-auto ">
        <video
          src={reelUrl}
          className="w-[30rem] bg-gray-500"
          controls
          autoPlay
        />
      </div>
      <div
        className={
          "flex items-start gap-2 h-[11rem] py-4 overflow-x-scroll " +
          styles.customScrollbar
        }
      >
        {allReels.map((reel) => {
          return (
            <div key={reel.reelId} className="w-[20rem] p-2 cursor-pointer">
              <UserCard reel={reel} updatePlayReel={setReelUrl} />
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default Reels;
