import "./chatlist.css";
import ChatItem from "./ChatItem/chatitem";

function ChatList() {
  return (
    <div className="ChatBackground">
      <div className="ChatHeader">
        <button>이모티콘</button>
        <span>Chatting</span>
      </div>
      <div className="ChatList">
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
      </div>
    </div>
  );
}

export default ChatList;
