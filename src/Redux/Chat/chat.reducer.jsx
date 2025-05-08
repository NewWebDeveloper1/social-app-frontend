import {
  CREATE_CHAT_FAILURE,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  CREATE_MESSAGE_FAILURE,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  GET_ALL_CHAT_MESSAGES_FAILURE,
  GET_ALL_CHAT_MESSAGES_REQUEST,
  GET_ALL_CHAT_MESSAGES_SUCCESS,
  GET_ALL_CHATS__SUCCESS,
} from "./chat.actionType";

const initialState = {
  chat: [],
  message: null,
  messages: [],
  loading: false,
  error: null,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MESSAGE_REQUEST:
    case CREATE_CHAT_REQUEST:
    case GET_ALL_CHAT_MESSAGES_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        messages: [...state.messages, action.payload],
        error: null,
      };

    case GET_ALL_CHAT_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: action.payload,
        error: null,
      };

    case GET_ALL_CHATS__SUCCESS:
      return { ...state, loading: false, chat: action.payload };

    case CREATE_CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        chat: [action.payload, ...state.chat],
        error: null,
      };

    case CREATE_MESSAGE_FAILURE:
    case CREATE_CHAT_FAILURE:
    case GET_ALL_CHAT_MESSAGES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default chatReducer;
