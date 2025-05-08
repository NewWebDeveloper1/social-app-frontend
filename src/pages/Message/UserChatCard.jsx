import { Avatar, Card, CardHeader, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";

const UserChatCard = ({ updateCurrentChat }) => {
  const chat = useSelector((store) => store.chat);

  const userProfile = useSelector((store) => store.userProfile);

  const handleClick = (chat) => {
    // console.log(chat);
    updateCurrentChat(chat);
  };

  return (
    <div>
      {Array.isArray(chat.chat) &&
        chat.chat.map((chat) => {
          const fullName =
            userProfile.user.id === chat.users[0].userId
              ? `${chat.users[1]?.firstName} ${chat.users[1]?.lastName}`
              : `${chat.users[0]?.firstName} ${chat.users[0]?.lastName}`;

          const avatar =
            userProfile.user.id === chat.users[0].userId
              ? `${chat.users[1]?.firstName[0].toUpperCase()}`
              : `${chat.users[0]?.firstName[0].toUpperCase()}`;

          // console.log(chat);

          return (
            <Card
              key={chat.chatId}
              onClick={() => handleClick(chat)}
              sx={{ cursor: "pointer" }}
            >
              <CardHeader
                sx={{ pointerEvents: "none" }}
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {avatar}
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={fullName}
                subheader="How are you?"
              />
            </Card>
          );
        })}
    </div>
  );
};

export default UserChatCard;
