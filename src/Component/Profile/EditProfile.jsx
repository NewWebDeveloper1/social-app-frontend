import { Backdrop, Box, CircularProgress, Modal } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import cloudUpload from "../../utils/uploadToCloud";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const EditProfile = ({
  handleClose,
  updateAvatarImg,
  updateBackgroundImg,
  open,
}) => {
  const [loading, setLoading] = useState(false);

  const [bgImg, setbgImg] = useState("");

  const [avtrImg, setAvtrImg] = useState("");

  const handleBackgroundImageChange = async (e) => {
    setLoading(true);

    const imgBackgroundUrl = await cloudUpload(e.target.files[0], "image");
    setbgImg(imgBackgroundUrl);

    setLoading(false);
  };

  const handleAvatarImageChange = async (e) => {
    setLoading(true);

    const imgAvatarUrl = await cloudUpload(e.target.files[0], "image");
    setAvtrImg(imgAvatarUrl);

    setLoading(false);
  };

  const handleEdit = () => {
    updateBackgroundImg(bgImg);
    updateAvatarImg(avtrImg);
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={[style, { borderRadius: "2%" }]}>
          <div>
            {/* File Uploads */}
            <div className="flex items-center gap-8 mb-5">
              {/* avatar - image */}
              <div className="flex items-center">
                <input
                  id="avatar-image"
                  type="file"
                  name="imageLink"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleAvatarImageChange(e)}
                />
                <label htmlFor="avatar-image">
                  <ImageIcon className="cursor-pointer" />
                </label>
                <span className="ml-2">Avatar-Image</span>
              </div>

              {/* background - image */}
              <div className="flex items-center">
                <input
                  id="background-image"
                  type="file"
                  name="imageLink"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleBackgroundImageChange(e)}
                />
                <label htmlFor="background-image">
                  <ImageIcon className="cursor-pointer" />
                </label>
                <span className="ml-2">Background-Image</span>
              </div>
            </div>

            {/* Preview */}
            <div className="flex flex-col gap-y-4">
              {bgImg && (
                <label className="flex flex-col">
                  {" "}
                  Background Image : <img src={bgImg} className="h-[10rem]" />
                </label>
              )}
              {avtrImg && (
                <label className="flex flex-col">
                  {" "}
                  Avatar Image : <img src={avtrImg} className="h-[10rem]" />
                </label>
              )}
            </div>

            {/* Submit */}
            <div className="flex justify-end items-center mt-2">
              <button
                type="submit"
                onClick={handleEdit}
                className="cursor-pointer border rounded-full bg-blue-500 text-white w-[30%] py-2 px-4"
              >
                Confirm Edit
              </button>
            </div>
          </div>

          {/* Loading  */}
          <Backdrop
            sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
            open={loading}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </Modal>
    </div>
  );
};

export default EditProfile;
