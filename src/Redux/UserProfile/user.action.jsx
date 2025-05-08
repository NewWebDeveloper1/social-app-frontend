import axios from "axios";
import {
  GET_USER_FAILURE,
  GET_USER_PROFILE_ID_FAILURE,
  GET_USER_PROFILE_ID_REQUEST,
  GET_USER_PROFILE_ID_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  USER_SEARCH_FAILURE,
  USER_SEARCH_REQUEST,
  USER_SEARCH_SUCCESS,
} from "./user.actionType";
import { api, API_BASE_URI } from "../../config/api";

export const getUserProfile = (jwt) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });

  try {
    const { data } = await axios.get(`${API_BASE_URI}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    // console.log("User -------------", data);

    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log("Error -------------", error);
    dispatch({ action: GET_USER_FAILURE, payload: error });
  }
};

export const updateUserProfile = (updateData) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });

  try {
    const { data } = await api.put(
      `${API_BASE_URI}/api/user/update`,
      updateData
    );

    // console.log(" Updated User -------------", data);

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log("Updated Error -------------", error);
    dispatch({ action: UPDATE_USER_FAILURE, payload: error });
  }
};

export const getUserProfileById = (id) => async (dispatch) => {
  dispatch({ type: GET_USER_PROFILE_ID_REQUEST });

  try {
    const { data } = await api.get(`${API_BASE_URI}/api/user/${id}`);

    // console.log(" Profile User Id-------------", data);

    dispatch({ type: GET_USER_PROFILE_ID_SUCCESS, payload: data });
  } catch (error) {
    console.log("Profile User Error -------------", error);
    dispatch({ action: GET_USER_PROFILE_ID_FAILURE, payload: error });
  }
};

export const userSearch = (query) => async (dispatch) => {
  dispatch({ type: USER_SEARCH_REQUEST });

  try {
    const { data } = await api.get(`/api/user/search?q=${query}`);

    dispatch({ type: USER_SEARCH_SUCCESS, payload: data });

    // console.log("Search User-------------", data);
  } catch (error) {
    dispatch({ action: USER_SEARCH_FAILURE, payload: error });

    console.log("Search User Error-------------", error);
  }
};
