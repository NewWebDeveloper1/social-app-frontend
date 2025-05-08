import {
  Avatar,
  Backdrop,
  Box,
  CircularProgress,
  Modal,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import VideocamIcon from "@mui/icons-material/Videocam";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import cloudUpload from "../../utils/uploadToCloud";
import { createReel } from "../../Redux/Reels/reels.action";

const ReelSchema = Yup.object().shape({
  videoLink: Yup.string().required("video link required..."),
  videoTitle: Yup.string().required("Video Title required..."),
  videoDescription: Yup.string(),
});

const initialValues = {
  videoLink: "",
  videoTitle: "",
  videoDescription: "",
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

const CreateReelsForm = () => {
  const userProfile = useSelector((store) => store.userProfile);

  const [loading, setLoading] = useState(false);

  const [videoAdd, setVideoAdd] = useState();

  const dispatch = useDispatch();

  const handleVideoChange = async (e, setFieldValue) => {
    setLoading(true);

    const videoUrl = await cloudUpload(e.target.files[0], "video");
    setVideoAdd(videoUrl);

    setFieldValue("videoLink", videoUrl);

    setLoading(false);
  };

  const handleClose = () => {
    setLoading(false);
  };

  const handleSubmit = (values, { resetForm }) => {
    const reelFormData = { ...values };
    // console.log("Form Data --------", typeof reelFormData);

    const createReelPost = async () => {
      try {
        await dispatch(createReel(reelFormData));
      } catch (error) {
        console.log(error);
      }
    };

    if (reelFormData) {
      createReelPost();
    }
    setVideoAdd();
    resetForm();
  };

  return (
    <div>
      <Box sx={[style, { borderRadius: "2%", color: "#fff" }]}>
        <Formik
          initialValues={initialValues}
          validationSchema={ReelSchema}
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

              <div className="flex flex-col gap-5 justify-center mb-5">
                {/* video-title */}
                <TextField
                  type="text"
                  placeholder="Add video title..."
                  aria-label="Add video Title"
                  name="videoTitle"
                  value={values.videoTitle}
                  onChange={handleChange}
                  className="w-full h-[3rem] px-4 py-2 border border-[#b304b5]"
                />

                {/* Caption */}
                <TextareaAutosize
                  className="mb-3"
                  minRows={3}
                  aria-label="Adding video description"
                  placeholder="Add video description..."
                  name="videoDescription"
                  value={values.videoDescription}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    border: "1px solid #5f5f5f",
                    padding: "10px",
                  }}
                />

                {/* video */}
                <div>
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
                  <span>Video</span>
                </div>
              </div>

              {/* Preview */}
              <div className="flex flex-col gap-y-4">
                {videoAdd && (
                  <video src={videoAdd} className="h-[10rem]" controls />
                )}
              </div>

              {/* Submit */}
              <div className="flex justify-end items-center mt-4 ">
                <button
                  type="submit"
                  className="cursor-pointer border rounded-full bg-blue-500 text-white w-[30%] py-2 px-4"
                >
                  Post Reel
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
    </div>
  );
};

export default CreateReelsForm;
