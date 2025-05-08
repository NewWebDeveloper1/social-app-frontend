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
  UPDATE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
} from "./post.actionType";

const initialState = {
  post: null,
  userPosts: [],
  loading: false,
  allPosts: [],
  savePosts: [],
  error: null,
  message: null,
  comment: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
    case UPDATE_POST_REQUEST:
    case GET_ALL_POST_REQUEST:
    case GET_USER_POST_REQUEST:
    case LIKE_POST_REQUEST:
    case SAVE_POST_REQUEST:
    case DELETE_USER_POST_REQUEST:
    case CREATE_USER_COMMENT_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_POST_SUCCESS:
    case UPDATE_POST_SUCCESS:
    case LIKE_POST_SUCCESS:
      return { ...state, loading: false, post: action.payload, error: null };

    case GET_USER_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        userPosts: [...action.payload],
        error: null,
      };

    // case LIKE_POST_SUCCESS:
    //   return { ...state, loading: false, like: action.payload, error: null };

    case SAVE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        savePosts: action.payload,
        error: null,
      };

    case GET_ALL_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        allPosts: action.payload,
        error: null,
      };

    case DELETE_USER_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        userPosts: state.userPosts.filter(
          (post) =>
            post.postId !== parseInt(action.payload.message.split(" ").at(-1))
        ),
        allPosts: state.allPosts.filter(
          (post) =>
            post.postId !== parseInt(action.payload.message.split(" ").at(-1))
        ),
        message: action.payload,
        error: null,
      };

    case CREATE_USER_COMMENT_SUCCESS:
      return { ...state, loading: false, comment: action.payload, error: null };

    case CREATE_POST_FAILURE:
    case UPDATE_POST_FAILURE:
    case GET_ALL_POST_FAILURE:
    case GET_USER_POST_FAILURE:
    case LIKE_POST_FAILURE:
    case SAVE_POST_FAILURE:
    case DELETE_USER_POST_FAILURE:
    case CREATE_USER_COMMENT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default postReducer;
