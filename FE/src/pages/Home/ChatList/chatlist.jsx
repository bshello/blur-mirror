import "./chatlist.css";
import ChatItem from "./ChatItem/chatitem";

function ChatList() {
  return (
    <div className="ChatBackground">
      <div className="ChatHeader">
        <span>Chatting</span>
      </div>
      <div className="ChatList">
        <ChatItem />
      </div>
    </div>
  );
}

export default ChatList;
