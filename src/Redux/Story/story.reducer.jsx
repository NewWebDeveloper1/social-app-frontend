import {
  CREATE_USER_STORY_FAILURE,
  CREATE_USER_STORY_REQUEST,
  CREATE_USER_STORY_SUCCESS,
  GET_USER_STORIES_FAILURE,
  GET_USER_STORIES_REQUEST,
  GET_USER_STORIES_SUCCESS,
} from "./story.actionTypes";

const initialValues = {
  story: null,
  userStories: [],
  loading: false,
  error: null,
};

const storyReducer = (state = initialValues, action) => {
  switch (action.type) {
    case CREATE_USER_STORY_REQUEST:
    case GET_USER_STORIES_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_USER_STORY_SUCCESS:
      return {
        ...state,
        loading: false,
        story: action.payload,
        userStories: [action.payload, ...state.userStories],
        error: null,
      };

    case GET_USER_STORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        userStories: [...action.payload],
        error: null,
      };

    case CREATE_USER_STORY_FAILURE:
    case GET_USER_STORIES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default storyReducer;
