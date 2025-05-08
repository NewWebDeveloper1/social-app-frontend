import { api } from "../../config/api";
import {
  CREATE_USER_STORY_FAILURE,
  CREATE_USER_STORY_REQUEST,
  CREATE_USER_STORY_SUCCESS,
  GET_USER_STORIES_FAILURE,
  GET_USER_STORIES_REQUEST,
  GET_USER_STORIES_SUCCESS,
} from "./story.actionTypes";

export const createUserStory = (storyBody) => async (dispatch) => {
  dispatch({ type: CREATE_USER_STORY_REQUEST });

  try {
    const { data } = await api.post("/api/story/create", storyBody);

    dispatch({ type: CREATE_USER_STORY_SUCCESS, payload: data });

    // console.log("User story created: ", data);
  } catch (error) {
    dispatch({ type: CREATE_USER_STORY_FAILURE, payload: error });
    console.log("Create user story error: ", error);
  }
};

export const getUserStories = () => async (dispatch) => {
  dispatch({ type: GET_USER_STORIES_REQUEST });

  try {
    const { data } = await api.get("/api/story/user-story");
    dispatch({ type: GET_USER_STORIES_SUCCESS, payload: data });
    // console.log("Get all user stories : ", data);
  } catch (error) {
    dispatch({ type: GET_USER_STORIES_FAILURE, payload: error });
    console.log("Get all user stories : ", error);
  }
};
