import { Avatar, Button, CardHeader } from "@mui/material";
import { red } from "@mui/material/colors";

const FollowUser = () => {
  return (
    <div className="flex justify-between mt-2">
      <CardHeader
        className="flex items-center justify-center w-full"
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="user-post">
            N
          </Avatar>
        }
        action={<Button aria-label="follow button">Follow</Button>}
        title="Code with Nik"
        subheader="@codewithNik"
      />

      {/* <div className="flex items-center gap-2">
        <Avatar sizes={2} />
        <div>
          <p className="text-md">Code with NiK</p>
          <p className="text-xs">Follows You</p>
        </div>
      </div>
      <Button sx={{ fontSize: "12px", fontWeight: "600" }}>Follow</Button> */}
    </div>
  );
};

export default FollowUser;
