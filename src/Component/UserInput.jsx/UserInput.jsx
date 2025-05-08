import DarkModeIcon from "@mui/icons-material/DarkMode";
import ContrastIcon from "@mui/icons-material/Contrast";

const UserInput = () => {
  return (
    <div>
      <input
        type="search"
        className="w-full outline rounded-full width-full px-4 py-2 border-[#3b4054]"
        placeholder="Search user..."
      />
      <div></div>
    </div>
  );
};

export default UserInput;
