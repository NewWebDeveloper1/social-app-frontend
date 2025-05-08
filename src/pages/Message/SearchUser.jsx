import { Avatar, Card, CardHeader, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { userSearch } from "../../Redux/UserProfile/user.action";
import { useState } from "react";
import styles from "./message.module.css";
import { createChat } from "../../Redux/Chat/chat.action";

const SearchUser = ({ updateSearchUser, searchUser }) => {
  const dispatch = useDispatch();

  const [inputUser, setInputUser] = useState("");

  const [popClick, setPopClick] = useState(false);

  const chat = useSelector((store) => store.chat.chat);

  const searchedUser = useSelector((store) => store.userProfile.searchedUser);

  const handleSearchInput = (e) => {
    setInputUser(e.target.value);
    console.log(inputUser);
    setPopClick(false);

    const getSearchedUser = async () => {
      if (inputUser != "" || inputUser != " ") {
        await dispatch(userSearch(inputUser));
        updateSearchUser([...searchedUser]);
      }

      // console.log(searchUser);
      // console.log("Searched user", searchedUser);
    };

    if (inputUser != "" || inputUser != " ") {
      getSearchedUser();
    }
  };

  // console.log("insiide search user : ", chat);

  const handleClick = (user) => {
    const chatCreate = async () => {
      setPopClick(true);
      await dispatch(createChat({ userId2: user.userId }));
    };

    const chatExists = chat.some((ch) =>
      ch.users.some((u) => u.userId === user.userId)
    );

    // console.log("Search user : ", chatExists);
    if (chatExists) {
      console.log("Chat already exists.");
      setPopClick(true);
    } else {
      chatCreate();
    }
  };

  return (
    <div className="px-4 mt-9 relative">
      <input
        type="text"
        value={inputUser}
        className="w-full rounded-full text-white outline-none border border-[#3b5054] px-4 py-2 mb-5"
        placeholder="Search user..."
        onChange={(e) => handleSearchInput(e)}
      />

      {Array.isArray(searchUser) && !popClick && (
        <div
          className={
            inputUser &&
            "absolute w-[90%] h-[10rem] z-10 top-[3.5rem] cursor-pointer overflow-y-auto " +
              styles.hideScrollBar
          }
        >
          {searchUser.map((user) => (
            <Card
              key={user.userId}
              className=" w-[90%] h-[3.5rem] z-10 cursor-pointer"
            >
              <CardHeader
                onClick={() => handleClick(user)}
                avatar={
                  <Avatar aria-label="recipe" className="w-[0.5rem] h-[0.5rem]">
                    {user?.firstName[0].toUpperCase()}
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={user?.firstName + " " + user?.lastName}
                subheader={
                  "@" +
                  user?.firstName.toLowerCase() +
                  "_" +
                  user?.lastName.toLowerCase()
                }
              />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchUser;
