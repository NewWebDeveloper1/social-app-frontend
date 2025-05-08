import axios from "axios";
import { API_BASE_URI } from "../../config/api";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./auth.actionType";

export const loginRequestAction = (loginData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URI}/auth/signin`, loginData);

    // console.log(data);
    // storing json_web_token in local_storage
    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }

    dispatch({ type: LOGIN_SUCCESS, payload: data.token });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error });

    console.log("-------", error.response.data.message);
  }
};

export const registerRequestAction = (registerData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const { data } = await axios.post(
      `${API_BASE_URI}/auth/signup`,
      registerData
    );

    // console.log(data);

    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }

    dispatch({ type: REGISTER_SUCCESS, payload: data.token });
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error });

    // console.log("-------", error);
  }
};
