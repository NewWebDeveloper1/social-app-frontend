import { useEffect, useState } from "react";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGOUT_USER } from "../../Redux/Auth/auth.actionType";
import { RESET_USER } from "../../Redux/UserProfile/user.actionType";
import { jwtDecode } from "jwt-decode";

const User = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const user = useSelector((store) => store.userProfile.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    if (user) {
      localStorage.removeItem("jwt");
      dispatch({ type: LOGOUT_USER });
      dispatch({ type: RESET_USER });
      navigate("/signin");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) return;

    try {
      const decode = jwtDecode(token);
      const expireTime = decode.exp * 1000;
      // console.log(expireTime);
      const now = new Date();
      const timeUntilLogout = expireTime - now;

      if (timeUntilLogout <= 0) {
        localStorage.removeItem("jwt");
        dispatch({ type: LOGOUT_USER });
        dispatch({ type: RESET_USER });
        navigate("/signin");
      } else {
        const timeOut = setTimeout(() => {
          localStorage.removeItem("jwt");
          dispatch({ type: LOGOUT_USER });
          dispatch({ type: RESET_USER });
          navigate("/signin");
        }, timeUntilLogout);

        return () => clearTimeout(timeOut);
      }
    } catch (error) {
      console.log("Invalid token", error);
    }
  }, [user]);

  return (
    <div className="p-2 flex justify-between items-center w-full">
      <div className="flex space-between items-center">
        <div>
          <Avatar src="/images/user.jpg" />
        </div>
        <div className="ml-4">
          <p className="font-bold">{user?.firstName + " " + user?.lastName}</p>
          <p className="opacity-70">
            {user
              ? `@${user?.firstName.toLowerCase()}_${user?.lastName.toLowerCase()}`
              : ""}
          </p>
        </div>
      </div>
      <div>
        <Button
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreVertIcon />
        </Button>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default User;
