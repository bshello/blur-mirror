import "./chatlist.css";
import ChatItem from "./ChatItem/chatitem";

function ChatList({ showChatPage }) {
  return (
    <div className="ChatBackground">
      <div className="ChatHeader">
        <button>이모티콘</button>
        <span>Chatting</span>
      </div>
      <div className="ChatList">
        <ChatItem showChatPage={showChatPage} />
        <ChatItem />
        <ChatItem />
        <ChatItem />
      </div>
    </div>
  );
}

export default ChatList;
