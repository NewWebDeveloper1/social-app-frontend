import { useSelector } from "react-redux";

const ChatMessage = ({ message }) => {
  const logUser = useSelector((store) => store.userProfile.user);

  const value = message && logUser.id === message.user?.userId;

  // console.log(message, value);

  return (
    <>
      {message && (
        <div
          className={`mb-4 flex ${!value ? "justify-start" : "justify-end"}`}
        >
          <div
            className={` p-1 ${
              message.img === "" || message.img === null
                ? "rounded-full px-5"
                : "rounded-md object-cover"
            } bg-[#191c29] text-white`}
          >
            {message.img && (
              <img
                src={message.img}
                className="h-[17rem] w-[12rem] object-cover rounded-md"
              />
            )}
            <p className={`${value ? "py-2" : "py-1"}`}>{message.msgContent}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatMessage;
