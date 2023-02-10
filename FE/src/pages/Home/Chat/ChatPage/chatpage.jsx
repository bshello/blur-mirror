import "./chatpage.css";

function ChatPage() {
  return (
    <div className="ChatPageBack">
      <div className="ChatPageHeader">
        <button className="ChatPageHeaderBtn">x</button>
        <span className="ChatPageHeaderName">한효주</span>
      </div>
      <div className="ChatPageContent">
        <div className="ChatPageDialogue">
          <div>안녕</div>
          <div>안녕</div>
          <div>난 한효주야</div>
          <div>난 이승기야</div>
        </div>
        <div className="ChatPageInputDiv">
          <div className="ChatPageInput">
            <input className="ChatPageInputMessage"></input>
            <button className="ChatPageInputButton"></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
