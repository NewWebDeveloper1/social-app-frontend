import {
  Avatar,
  Backdrop,
  Box,
  CircularProgress,
  Modal,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useState } from "react";
import { createPost, getAllPost } from "../../Redux/Post/post.action";
import cloudUpload from "../../utils/uploadToCloud";

const PostSchema = Yup.object().shape({
  caption: Yup.string().required("Add caption... "),
  imageLink: Yup.string(),
  videoLink: Yup.string(),
});

const initialValues = {
  caption: "",
  imageLink: "",
  videoLink: "",
};

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

const PostCardCreate = ({ handleClose, open }) => {
  const userProfile = useSelector((store) => store.userProfile);

  const dispatch = useDispatch();

  const [imageAdd, setImageAdd] = useState("");

  const [videoAdd, setVideoAdd] = useState("");

  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e, setFieldValue) => {
    setLoading(true);

    const imgUrl = await cloudUpload(e.target.files[0], "image");
    setImageAdd(imgUrl);
    setFieldValue("imageLink", imgUrl);
    setLoading(false);
  };

  const handleVideoChange = async (e, setFieldValue) => {
    setLoading(true);

    const videoUrl = await cloudUpload(e.target.files[0], "video");
    setVideoAdd(videoUrl);

    setFieldValue("videoLink", videoUrl);

    setLoading(false);
  };

  const handleSubmit = async (values) => {
    // Combine Formik values with local state if needed
    const formData = {
      ...values,
    };

    handleClose();
    await dispatch(createPost(formData)).then(() => dispatch(getAllPost()));
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={[style, { borderRadius: "2%", color: "#fff" }]}>
          <Formik
            initialValues={initialValues}
            validationSchema={PostSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, setFieldValue }) => (
              <Form>
                {/* Avatar and Name */}
                <div className="pb-5">
                  <div className="flex my-3 justify-start items-center gap-4">
                    <Avatar />
                    <div className="text-xl">
                      {userProfile.user.firstName +
                        " " +
                        userProfile.user.lastName}
                    </div>
                  </div>
                </div>

                {/* Caption */}
                <TextareaAutosize
                  className="mb-5"
                  minRows={3}
                  aria-label="Adding post caption"
                  placeholder="Add Caption..."
                  name="caption"
                  value={values.caption}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    border: "1px solid #5f5f5f",
                    padding: "10px",
                  }}
                />

                {/* File Uploads */}
                <div className="flex items-center gap-8 mb-5">
                  {/* image */}
                  <div className="flex items-center">
                    <input
                      id="post-image"
                      type="file"
                      name="imageLink"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => handleImageChange(e, setFieldValue)}
                    />
                    <label htmlFor="post-image">
                      <ImageIcon className="cursor-pointer" />
                    </label>
                    <span className="ml-2">Image</span>
                  </div>

                  {/* video */}
                  <div className="flex items-center">
                    <input
                      id="post-video"
                      type="file"
                      name="videoLink"
                      accept="video/*"
                      style={{ display: "none" }}
                      onChange={(e) => handleVideoChange(e, setFieldValue)}
                    />
                    <label htmlFor="post-video">
                      <VideocamIcon className="cursor-pointer" />
                    </label>
                    <span className="ml-2">Video</span>
                  </div>
                </div>

                {/* Preview */}
                <div className="flex flex-col gap-y-4">
                  {imageAdd && (
                    <label className="flex flex-col">
                      {" "}
                      Image : <img src={imageAdd} className="h-[10rem]" />
                    </label>
                  )}
                  {videoAdd && (
                    <label className="flex flex-col">
                      Video :{" "}
                      <video src={videoAdd} className="h-[10rem]" controls />
                    </label>
                  )}
                </div>

                {/* Submit */}
                <div className="flex justify-end items-center mt-2">
                  <button
                    type="submit"
                    className="cursor-pointer border rounded-full bg-blue-500 text-white w-[30%] py-2 px-4"
                  >
                    Post
                  </button>
                </div>
              </Form>
            )}
          </Formik>

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

export default PostCardCreate;
