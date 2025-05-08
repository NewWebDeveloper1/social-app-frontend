import {
  GET_USER_FAILURE,
  GET_USER_PROFILE_ID_FAILURE,
  GET_USER_PROFILE_ID_REQUEST,
  GET_USER_PROFILE_ID_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  RESET_USER,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  USER_SEARCH_FAILURE,
  USER_SEARCH_REQUEST,
  USER_SEARCH_SUCCESS,
} from "./user.actionType";

const initialState = {
  user: null,
  loading: false,
  error: null,
  selectedUser: null,
  searchedUser: [],
};

const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
    case UPDATE_USER_REQUEST:
    case GET_USER_PROFILE_ID_REQUEST:
    case USER_SEARCH_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: null };

    case GET_USER_PROFILE_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedUser: action.payload,
        error: null,
      };

    case USER_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        searchedUser: action.payload,
        error: null,
      };

    case GET_USER_FAILURE:
    case UPDATE_USER_FAILURE:
    case GET_USER_PROFILE_ID_FAILURE:
    case USER_SEARCH_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case RESET_USER:
      return { ...initialState };

    default:
      return state;
  }
};

export default userProfileReducer;
