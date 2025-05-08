import { Card } from "@mui/material";

const UserCard = ({ updatePlayReel, reel }) => {
  const handleClick = () => {
    updatePlayReel(reel.videoLink);
  };

  return (
    <Card className="w-[15rem] h-[7rem] mt-1" onClick={handleClick}>
      <video className="w-full h-full" src={reel.videoLink} controls />
    </Card>
  );
};

export default UserCard;
