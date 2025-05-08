import { api, API_BASE_URI } from "../../config/api";
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
  GET_ALL_CHATS__REQUEST,
  GET_ALL_CHATS__SUCCESS,
  GET_ALL_CHATS_FAILURE,
} from "./chat.actionType";

export const createMessage = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_MESSAGE_REQUEST });

  try {
    const { data } = await api.post(
      `/api/messages/chat/${reqData.messageBody.chatId}`,
      reqData.messageBody.body
    );

    reqData.sendMessageToReceiver(data);

    // console.log("Message Create ", data);

    dispatch({ type: CREATE_MESSAGE_SUCCESS, payload: data });
  } catch (error) {
    console.log("Message error -----", error);
    dispatch({ type: CREATE_MESSAGE_FAILURE, payload: error });
  }
};

export const createChat = (user2) => async (dispatch) => {
  dispatch({ type: CREATE_CHAT_REQUEST });

  try {
    const { data } = await api.post(`/api/chats/create`, user2);

    // console.log("Create Chat ------", data);

    dispatch({ type: CREATE_CHAT_SUCCESS, payload: data });
  } catch (error) {
    console.log("Chat error ------", error);
    dispatch({ type: CREATE_CHAT_FAILURE, payload: error });
  }
};

export const getAllMessages = (chatId) => async (dispatch) => {
  dispatch({ type: GET_ALL_CHAT_MESSAGES_REQUEST });

  try {
    const { data } = await api.get(`/api/messages/chat/${chatId}/allMsg`);

    // console.log("All messages ------", data);

    dispatch({ type: GET_ALL_CHAT_MESSAGES_SUCCESS, payload: data });
  } catch (error) {
    console.log("All messages error ------", error);
    dispatch({ type: GET_ALL_CHAT_MESSAGES_FAILURE, payload: error });
  }
};

export const getAllChats = () => async (dispatch) => {
  dispatch({ type: GET_ALL_CHATS__REQUEST });

  try {
    const { data } = await api.get(`/api/chats/allchats`);

    // console.log("All Chat ------", data);

    dispatch({ type: GET_ALL_CHATS__SUCCESS, payload: data });
  } catch (error) {
    console.log("All Chat error ------", error);
    dispatch({ type: GET_ALL_CHATS_FAILURE, payload: error });
  }
};
