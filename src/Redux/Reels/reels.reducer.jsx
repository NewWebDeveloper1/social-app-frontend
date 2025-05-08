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
  UPDATE_REEL_FAILURE,
  UPDATE_REEL_REQUEST,
  UPDATE_REEL_SUCCESS,
} from "./reels.actionTypes";

const initialState = {
  loading: false,
  reel: null,
  userReels: [],
  allReels: [],
  error: null,
};

const reelReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REEL_REQUEST:
    case UPDATE_REEL_REQUEST:
    case GET_ALL_REELS_REQUEST:
    case GET_USER_REELS_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_REEL_SUCCESS:
    case UPDATE_REEL_SUCCESS:
      return {
        ...state,
        loading: false,
        reel: action.payload,
        allReels: [...state.allReels, action.payload],
        userReels: [...state.userReels, action.payload],
        error: null,
      };

    case GET_USER_REELS_SUCCESS:
      return {
        ...state,
        loading: false,
        userReels: [...action.payload],
        error: null,
      };

    case GET_ALL_REELS_SUCCESS:
      return {
        ...state,
        loading: false,
        allReels: action.payload,
        error: null,
      };

    case CREATE_REEL_FAILURE:
    case UPDATE_REEL_FAILURE:
    case GET_ALL_REELS_FAILURE:
    case GET_USER_REELS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default reelReducer;
