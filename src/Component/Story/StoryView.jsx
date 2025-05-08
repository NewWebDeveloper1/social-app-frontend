import { Box, Modal } from "@mui/material";

const StoryView = ({ open, handleClose, story }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "#76706f",
    boxShadow: 24,
    p: 4,
    border: "1px solid #f4f4f4",
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
          <div className="outline-none border border-[#f4f4f4]">
            <img src={story.storyImage} alt={story.storyCaption} />
          </div>
          <p className="p-2 font-bold-400 text-white bg-gray-500 text-md border border-[#f4f4f4]">
            {story.storyCaption}
          </p>
        </Box>
      </Modal>
    </div>
  );
};

export default StoryView;
