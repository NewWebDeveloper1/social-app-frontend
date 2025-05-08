import {
  Avatar,
  Backdrop,
  Box,
  CircularProgress,
  Modal,
  TextareaAutosize,
} from "@mui/material";
import { Form, Formik } from "formik";
import ImageIcon from "@mui/icons-material/Image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import cloudUpload from "../../utils/uploadToCloud";
import { createUserStory } from "../../Redux/Story/story.action";

const StorySchema = Yup.object().shape({
  storyImage: Yup.string().required("Image required..."),
  storyCaption: Yup.string().required("Caption required..."),
});

const initialValues = {
  storyImage: "",
  storyCaption: "",
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

const CreateStoryForm = ({ open, handleClose }) => {
  const userProfile = useSelector((store) => store.userProfile);

  const [loading, setLoading] = useState(false);

  const [imageAdd, setImageAdd] = useState();

  const dispatch = useDispatch();

  const handleVideoChange = async (e, setFieldValue) => {
    setLoading(true);

    const imgUrl = await cloudUpload(e.target.files[0], "image");
    setImageAdd(imgUrl);

    setFieldValue("storyImage", imgUrl);

    setLoading(false);
  };

  const handleSubmit = (values, { resetForm }) => {
    const storyFormData = { ...values };
    // console.log("Story Form Data --------", storyFormData);

    const createStoryPost = async () => {
      try {
        await dispatch(createUserStory(storyFormData));
      } catch (error) {
        console.log(error);
      }
    };

    if (storyFormData) {
      createStoryPost();
    }
    setImageAdd();
    resetForm();
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
          <Formik
            initialValues={initialValues}
            validationSchema={StorySchema}
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
                  {/* Story Caption */}
                  <TextareaAutosize
                    className="mb-3"
                    minRows={3}
                    aria-label="Adding story caption"
                    placeholder="Add story caption..."
                    name="storyCaption"
                    value={values.storyCaption}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      border: "1px solid #5f5f5f",
                      padding: "10px",
                    }}
                  />

                  {/* story-image */}
                  <div>
                    <input
                      id="story-image"
                      type="file"
                      name="storyImage"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => handleVideoChange(e, setFieldValue)}
                    />
                    <label htmlFor="story-image">
                      <ImageIcon className="cursor-pointer" />
                    </label>
                    <span>Image</span>
                  </div>
                </div>

                {/* Preview */}
                <div className="flex flex-col gap-y-4">
                  {imageAdd && <img src={imageAdd} className="h-[10rem]" />}
                </div>

                {/* Submit */}
                <div className="flex justify-end items-center mt-4 ">
                  <button
                    type="submit"
                    className="cursor-pointer border rounded-full bg-blue-500 text-white w-[30%] py-2 px-4"
                  >
                    Post Story
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

export default CreateStoryForm;
