import "./chatpage.css";

function ChatPage() {
  return (
    <div className="ChatPageBack">
      <div className="ChatPageHeader">
        <div className="ChatPageHeaderBtn"></div>
        <div className="ChatPageHeaderName">한효주</div>
      </div>
      <div className="ChatPageContent">
        <div className="ChatPageDialogue">
          <div className="ChatPageDialogueMe">
            <div className="ChatPageDialogueContent">안녕</div>
            <div className="ChatPageProfilePicture"></div>
          </div>
          <div className="ChatPageDialogueYou">
            <div className="ChatPageProfilePicture"></div>
            <div className="ChatPageDialogueContent">얀녕</div>
          </div>
          <div className="ChatPageDialogueMe">
            <div className="ChatPageDialogueContent">난 이승기야</div>
            <div className="ChatPageProfilePicture"></div>
          </div>
          <div className="ChatPageDialogueYou">
            <div className="ChatPageProfilePicture"></div>
            <div className="ChatPageDialogueContent">난 한효주야</div>
          </div>
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
