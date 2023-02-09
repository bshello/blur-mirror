import "./chatitem.css";

function ChatItem() {
  return (
    <div className="ChatItem">
      <div className="ChatPicture"></div>
      <div className="ChatContent">
        <div className="ChatName">한효주</div>
        <div className="ChatText">내일 만나자</div>
      </div>
      <div className="ChatAlarm"></div>
    </div>
  );
}

export default ChatItem;
