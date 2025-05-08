import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  deletePost,
  likePost,
  savePost,
} from "../../Redux/Post/post.action";

const PostCard = ({ posts }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();

  const user = useSelector((store) => store.userProfile.user);

  const [like, setLike] = useState(false);

  const [save, setSave] = useState(false);

  const [comment, setComment] = useState(false);

  const [postComments, setPostCommets] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // fetches details of posts liked by logged user
  useEffect(() => {
    const likedByUser = posts.liked.some((like) => like.userId === user.id);
    setLike(likedByUser);
  }, [posts.liked.length]);

  // fetches savedPost from server
  useEffect(() => {
    if (user && user.savedPost) {
      const savedByUser = user?.savedPost.some(
        (save) => save.postId === posts.postId
      );
      setSave(savedByUser);
    }
  }, [user?.savedPost]);

  // fetches post comments if already present in the server
  useEffect(() => {
    setPostCommets([...posts.comments]);
  }, [posts.comments]);

  const handleLike = async () => {
    try {
      setLike(!like);
      await dispatch(likePost(posts.postId));
    } catch (error) {
      console.log("post like error -----", error);
    }
  };

  const handleSave = async () => {
    try {
      setSave(!save);
      await dispatch(savePost(posts.postId));
    } catch (error) {
      console.log("save post error----", error);
    }
  };

  const handleCommentBox = () => {
    setComment(!comment);
  };

  const handlePostDelete = () => {
    if (posts) {
      dispatch(deletePost(posts.postId));
      setAnchorEl(null);
    }
  };

  const handleCommentValues = async (event) => {
    const commentValue = event.target.value;
    if (!commentValue) return;

    try {
      // Wait for server to save comment
      await dispatch(createComment({ content: commentValue }, posts.postId));

      // Then update local comment state from updated `posts.comments`
      setPostCommets([...posts.comments]);

      event.target.value = "";
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // const userProfile = useSelector((store) => store.userProfile);

  return (
    <div>
      <Card className="mb-10">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="user-post">
              {posts.user?.firstName.slice(0, 1)}
            </Avatar>
          }
          action={
            <>
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
                <MenuItem onClick={handlePostDelete}>Delete</MenuItem>
              </Menu>
            </>
          }
          title={posts.user.firstName + " " + posts.user.lastName}
          subheader={`@${posts.user.firstName.toLowerCase()}${posts.user.lastName.toLowerCase()}`}
        />
        {posts.imageLink != null && (
          <CardMedia
            component="img"
            height="100"
            image={posts.imageLink}
            alt=""
          />
        )}
        {posts.videoLink && (
          <CardMedia
            component="video"
            height="100"
            src={posts.videoLink}
            alt="video post"
            controls
          />
        )}
        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {posts.caption}
          </Typography>
        </CardContent>
        <CardActions disableSpacing className="flex justify-between">
          <div>
            <IconButton aria-label="add to favorites" onClick={handleLike}>
              {like ? (
                <FavoriteIcon className="text-red-500" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton onClick={handleCommentBox} aria-label="post messages">
              {comment ? <ChatBubbleIcon /> : <ChatBubbleOutlineIcon />}
            </IconButton>
          </div>
          <IconButton onClick={handleSave} aria-label="save post">
            {save ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </CardActions>

        {comment && (
          <section>
            <div className="flex items-center mx-3 my-5 gap-3">
              <Avatar />
              <input
                type="text"
                className="w-full outline-none bg-transparent text-[16px] px-5 py-2 rounded-full border border-[#3b5054]"
                placeholder="Write a comment..."
                onKeyPress={(event) => {
                  if (event.key === "Enter") handleCommentValues(event);
                }}
              />
            </div>
            <Divider />
            <div className="space-y-2 mx-4 my-5 text-xs">
              <div className="flex flex-col">
                {Array.isArray(postComments) ? (
                  postComments.map((comment) => (
                    <div
                      key={comment.commentId}
                      className="flex justify-start gap-4 items-center mb-4"
                    >
                      <Avatar
                        sx={{
                          width: "2rem",
                          height: "2rem",
                          fontSize: ".8rem",
                        }}
                      >
                        {comment.user &&
                          comment.user?.firstName[0].toUpperCase()}
                      </Avatar>
                      {comment.content && <p>{comment.content}</p>}
                    </div>
                  ))
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </section>
        )}
      </Card>
    </div>
  );
};

export default PostCard;
