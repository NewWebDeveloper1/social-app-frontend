import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./auth.actionType";

const initialState = {
  jwt: null,
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return { ...state, loading: true, error: null };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return { ...state, loading: false, jwt: action.payload, error: null };

    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case LOGOUT_USER:
      return { ...initialState };
    /*
    case REGISTER_SUCCESS:
      return { ...state, loading: false, jwt: action.payload, error: null };

    case REGISTER_FAILURE:
      return { ...state, loading: false, error: action.payload };
*/
    default:
      return state;
  }
};
