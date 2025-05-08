import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import ListAltIcon from "@mui/icons-material/ListAlt";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const navMenuData = [
  {
    title: "Home",
    component: HomeIcon,
    path: "/",
  },
  {
    title: "Reels",
    component: ExploreIcon,
    path: "/reels",
  },
  {
    title: "Create Reels",
    component: ControlPointIcon,
    path: "/create-reels",
  },
  // {
  //   title: "Notifications",
  //   component: NotificationsIcon,
  //   path: "/notifications",
  // },
  {
    title: "Messages",
    component: MessageIcon,
    path: "/messages",
  },
  // {
  //   title: "Lists",
  //   component: ListAltIcon,
  //   path: "/",
  // },
  // {
  //   title: "Communities",
  //   component: GroupIcon,
  //   path: "/",
  // },
  {
    title: "Profile",
    component: AccountCircleIcon,
    path: "/profile",
  },
];

export default navMenuData;
