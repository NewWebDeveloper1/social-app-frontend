import { api, API_BASE_URI } from "../../config/api";
import {
  CREATE_REEL_FAILURE,
  CREATE_REEL_REQUEST,
  CREATE_REEL_SUCCESS,
  GET_ALL_REELS_FAILURE,
  GET_ALL_REELS_REQUEST,
  GET_ALL_REELS_SUCCESS,
  GET_USER_REELS_FAILURE,
  GET_USER_REELS_REQUEST,
  GET_USER_REELS_SUCCESS,
} from "./reels.actionTypes";

export const createReel = (reelBody) => async (dispatch) => {
  dispatch({ type: CREATE_REEL_REQUEST });

  try {
    const { data } = await api.post(
      `${API_BASE_URI}/api/reel/create`,
      reelBody
    );

    dispatch({ type: CREATE_REEL_SUCCESS, payload: data });

    // console.log("Reels create : ", data);
  } catch (error) {
    dispatch({ type: CREATE_REEL_FAILURE, payload: error });
  }
};

export const getAllReels = () => async (dispatch) => {
  dispatch({ type: GET_ALL_REELS_REQUEST });

  try {
    const { data } = await api.get(`${API_BASE_URI}/api/reel/all`);

    dispatch({ type: GET_ALL_REELS_SUCCESS, payload: data });

    // console.log("Get all reels : ", data);
  } catch (error) {
    dispatch({ type: GET_ALL_REELS_FAILURE, payload: error });
  }
};

export const getUserReel = () => async (dispatch) => {
  dispatch({ type: GET_USER_REELS_REQUEST });

  try {
    const { data } = await api.get(`${API_BASE_URI}/api/reel`);

    dispatch({ type: GET_USER_REELS_SUCCESS, payload: data });
    // console.log("User Reels : ", data);
  } catch (error) {
    dispatch({ type: GET_USER_REELS_FAILURE, payload: error });
  }
};
