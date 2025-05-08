import { api, API_BASE_URI } from "../../config/api";
import {
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_USER_COMMENT_FAILURE,
  CREATE_USER_COMMENT_REQUEST,
  CREATE_USER_COMMENT_SUCCESS,
  DELETE_USER_POST_FAILURE,
  DELETE_USER_POST_REQUEST,
  DELETE_USER_POST_SUCCESS,
  GET_ALL_POST_FAILURE,
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_SUCCESS,
  GET_USER_POST_FAILURE,
  GET_USER_POST_REQUEST,
  GET_USER_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  SAVE_POST_FAILURE,
  SAVE_POST_REQUEST,
  SAVE_POST_SUCCESS,
} from "./post.actionType";

export const createPost = (postBody) => async (dispatch) => {
  dispatch({ type: CREATE_POST_REQUEST });

  try {
    const { data } = await api.post(
      `${API_BASE_URI}/api/posts/create`,
      postBody
    );

    dispatch({ type: CREATE_POST_SUCCESS, payload: data });
    console.log(" Create Post-------", data);
  } catch (error) {
    dispatch({ type: CREATE_POST_FAILURE, payload: error });
    console.log(" Create Post Error------", error);
  }
};

export const savePost = (postId) => async (dispatch) => {
  dispatch({ type: SAVE_POST_REQUEST });

  try {
    const { data } = await api.put(`${API_BASE_URI}/api/posts/save/${postId}`);

    dispatch({ type: SAVE_POST_SUCCESS, payload: data });
    console.log(" Saved Post-------", data);
  } catch (error) {
    dispatch({ type: SAVE_POST_FAILURE, payload: error });
    console.log("Saved Post Error------", error);
  }
};

export const getAllPost = () => async (dispatch) => {
  dispatch({ type: GET_ALL_POST_REQUEST });

  try {
    const { data } = await api.get(`${API_BASE_URI}/api/posts/all`);

    dispatch({ type: GET_ALL_POST_SUCCESS, payload: data });
    // console.log(" Get All Post-------", data);
  } catch (error) {
    dispatch({ type: GET_ALL_POST_FAILURE, payload: error });
    console.log("Get All Post Error------", error);
  }
};

export const likePost = (postId) => async (dispatch) => {
  dispatch({ type: LIKE_POST_REQUEST });

  try {
    const { data } = await api.put(`${API_BASE_URI}/api/posts/like/${postId}`);

    dispatch({ type: LIKE_POST_SUCCESS, payload: data });

    // console.log("Liked user Post ---", data);
  } catch (error) {
    dispatch({ type: LIKE_POST_FAILURE, payload: error });

    console.log("Post Like error : ", error);
  }
};

export const getUsersPost = () => async (dispatch) => {
  dispatch({ type: GET_USER_POST_REQUEST });

  try {
    const { data } = await api.get(`${API_BASE_URI}/api/posts/userPosts`);

    dispatch({ type: GET_USER_POST_SUCCESS, payload: data });
    // console.log("User post-------", data);
  } catch (error) {
    dispatch({ type: GET_USER_POST_FAILURE, payload: error });
    console.log("User Post Error------", error);
  }
};

export const deletePost = (postId) => async (dispatch) => {
  dispatch({ type: DELETE_USER_POST_REQUEST });

  try {
    const { data } = await api.delete(
      `${API_BASE_URI}/api/posts/delete/${postId}`
    );

    dispatch({ type: DELETE_USER_POST_SUCCESS, payload: data });
    // console.log("User delete successfull----", data);
  } catch (error) {
    dispatch({ type: DELETE_USER_POST_FAILURE, payload: error });
    console.log("Delete post error ----", error);
  }
};

// Comment Sections

export const createComment = (commentBody, postId) => async (dispatch) => {
  dispatch({ type: CREATE_USER_COMMENT_REQUEST });

  try {
    const { data } = await api.post(
      `${API_BASE_URI}/api/comment/create/post/${postId}`,
      commentBody
    );

    dispatch({ type: CREATE_USER_COMMENT_SUCCESS, payload: data });
    // console.log("Create Comment success -----", data);
  } catch (error) {
    dispatch({ type: CREATE_USER_COMMENT_FAILURE, payload: error });
    console.log("Create Comment error-----", error);
  }
};
