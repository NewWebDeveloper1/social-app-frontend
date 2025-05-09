import { Avatar, Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import WestIcon from "@mui/icons-material/West";
import AddCallIcon from "@mui/icons-material/AddCall";
import VideocamIcon from "@mui/icons-material/Videocam";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import cloudUpload from "../../utils/uploadToCloud";
import SearchUser from "./SearchUser";
import styles from "./message.module.css";
import { useNavigate } from "react-router-dom";
import UserChatCard from "./UserChatCard";
import ChatMessage from "./ChatMessage";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getAllChats } from "../../Redux/Chat/chat.action";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { API_BASE_URI } from "../../config/api";

const Message = () => {
  const [searchUser, setSearchUser] = useState([]);

  const user = useSelector((store) => store.userProfile.user);

  const [currentChat, setCurrentChat] = useState({});

  const [message, setMessage] = useState("");

  const [msgs, setMsgs] = useState();

  const [imgUrl, setImgUrl] = useState();

  const [stompClient, setStompClient] = useState();

  // const [isConnected, setIsConnected] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const scrollContainer = useRef(null);

  useEffect(() => {
    const getChats = async () => {
      await dispatch(getAllChats());
    };

    getChats();
  }, []);

  useEffect(() => {
    // console.log("current chat : ", Array.isArray(currentChat.messages));
    if (Array.isArray(currentChat.messages)) {
      setMsgs([...currentChat.messages]);
    }

    setMessage("");
  }, [currentChat]);

  useEffect(() => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollTo({
        top: scrollContainer.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [msgs]);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(`${API_BASE_URI}/ws`),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to WebSocket");
        setStompClient(client);
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
      onWebSocketError: (error) => {
        console.error("WebSocket error", error);
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  useEffect(() => {
    if (!stompClient || !currentChat?.chatId) return;

    const subscription = stompClient.subscribe(
      `/user/${currentChat.chatId}/private`,
      (payload) => {
        const msg = JSON.parse(payload.body);
        console.log("Received via WebSocket:", msg);
        setMsgs((prev) => [...(prev || []), msg]);
      }
    );

    console.log(
      `Subscribed to /user/${currentChat.chatId}/private`,
      subscription
    );

    return () => {
      subscription.unsubscribe();
      console.log(`Unsubscribed from /user/${currentChat.chatId}/private`);
    };
  }, [stompClient, currentChat?.chatId]);

  // console.log("Stomp Client", stompClient);

  const sendMessageToReceiver = (newMessage) => {
    if (
      stompClient &&
      stompClient.connected &&
      currentChat?.chatId &&
      typeof stompClient.publish === "function"
    ) {
      stompClient.publish({
        destination: `/app/chat/${currentChat.chatId}`,
        body: JSON.stringify(newMessage),
      });
    } else {
      console.warn("WebSocket not ready to send message");
    }
  };

  const handleImage = async (e) => {
    const imageUrl = await cloudUpload(e.target.files[0], "image");
    setImgUrl(imageUrl);
    // console.log(imageUrl);
  };

  const handleHomeClick = () => {
    // to navigate to homepage
    navigate("/");
  };

  const handleMsgCreation = () => {
    const messageBody = {
      chatId: currentChat.chatId,
      body: {
        msgContent: message,
        img: imgUrl,
      },
    };
    const msgCreate = async () => {
      // setMsgBuilt(false);
      await dispatch(createMessage({ messageBody, sendMessageToReceiver }));
    };

    msgCreate();
  };
  // console.log("Current chat : ", currentChat.messages);

  // console.log("Messages", currentChat);

  const handleMessage = (event) => {
    const msg = event.target.value;
    // console.log(msg);
    setMessage(msg);
  };

  return (
    <Grid container className="px-3 py-4 h-screen w-full">
      <Grid size={{ xs: 3 }}>
        <div className="space-y-5">
          <div className="flex space-x-5 items-center mb-5">
            <WestIcon
              onClick={handleHomeClick}
              className="cursor-pointer text-white"
            />
            <h1 className="text-xl font-bold text-white">Home</h1>
          </div>
          <div>
            <SearchUser
              updateSearchUser={setSearchUser}
              searchUser={searchUser}
            />
          </div>
          <div
            className={
              "h-[77vh] overflow-y-scroll pt-5 px-4 " + styles.hideScrollBar
            }
          >
            <UserChatCard updateCurrentChat={setCurrentChat} />
          </div>
        </div>
      </Grid>

      <Grid size={{ xs: 9 }}>
        {Object.keys(currentChat).length > 0 ? (
          <>
            <div className="flex justify-between items-center px-7 py-3 border-l text-white">
              <div className="flex space-x-4 items-center ">
                <Avatar src="https://images.pexels.com/photos/145962/pexels-photo-145962.jpeg" />
                {!currentChat || Object.keys(currentChat).length === 0 ? (
                  <p className="text-xl font-bold">Someone</p>
                ) : (
                  <p className="text-xl font-bold">
                    {user.id === currentChat.users[0].userId
                      ? currentChat.users[1]?.firstName +
                        " " +
                        currentChat.users[1]?.lastName
                      : currentChat.users[0]?.firstName +
                        " " +
                        currentChat.users[0]?.lastName}
                  </p>
                )}
              </div>
              <div className="flex space-x-5 items-center">
                <AddCallIcon />
                <VideocamIcon />
              </div>
            </div>

            <div
              ref={scrollContainer}
              className={
                " w-full h-[80vh] overflow-y-scroll p-4 " + styles.hideScrollBar
              }
            >
              {Array.isArray(msgs) &&
                msgs.map((msg) => {
                  return (
                    <div key={msg.msgId}>
                      <ChatMessage message={msg} />
                    </div>
                  );
                })}
            </div>

            <div className="flex px-7 py-3 gap-5 sticky bottom-0 items-center text-white border-l">
              <div>
                {imgUrl && (
                  <img src={imgUrl} className="w-[5rem] h-[5rem]" alt="" />
                )}
              </div>
              <input
                type="text"
                value={message}
                onKeyPress={(event) => {
                  if (event.key === "Enter" && event.target.value) {
                    handleMsgCreation(event);
                    setImgUrl("");
                    setMessage("");
                  }
                }}
                onChange={(event) => handleMessage(event)}
                className="w-full px-4 py-2 rounded-full border border-[#3b5054]"
                placeholder="Type Message..."
              />
              <label>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImage}
                  accept="image/*"
                  id="message-img"
                />
                <AddPhotoAlternateIcon className="cursor-pointer" />
              </label>
            </div>
          </>
        ) : (
          <div className="h-full text-xl font-semibold flex flex-col justify-center items-center">
            <ChatBubbleOutlineIcon sx={{ fontSize: "12rem" }} />
            <p>Chat not Selected</p>
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default Message;
