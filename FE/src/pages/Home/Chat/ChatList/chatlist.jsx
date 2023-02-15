import "./chatlist.css";
import ChatItem from "./ChatItem/chatitem";

function ChatList({ showChatPage }) {
  return (
    <div className="ChatBackground">
      <div className="ChatHeader">
        <div className="ChatHeaderEmoticon"></div>
        <div className="ChatHeaderText">
          <h3>Chatting</h3>
        </div>
      </div>
      <div className="ChatList">
        <ChatItem showChatPage={showChatPage} />
        <ChatItem showChatPage={showChatPage} />
        <ChatItem showChatPage={showChatPage} />
        <ChatItem showChatPage={showChatPage} />
      </div>
    </div>
  );
}

export default ChatList;
