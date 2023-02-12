import "./chatpage.css";
import ChatPageDialogueMe from "./ChatDialogueMe/chatdialogueme";
import ChatPageDialogueYou from "./ChatDialogueYou/chatdialogueyou";

function ChatPage({ showChatPage }) {
  return (
    <div className="ChatPageBack">
      <div className="ChatPageHeader">
        <div className="ChatPageHeaderBtn" onClick={showChatPage}></div>
        <div className="ChatPageHeaderName">한효주</div>
      </div>
      <div className="ChatPageContent">
        <div className="ChatPageDialogue">
          <ChatPageDialogueMe content={"안녕"} />
          <ChatPageDialogueYou content={"응 안녕"} />
          <ChatPageDialogueMe content={"난 이승기야"} />
          <ChatPageDialogueYou content={"난 한효주야"} />
          <ChatPageDialogueMe content={"노브랜드버거먹자"} />
          <ChatPageDialogueYou content={"그래그래"} />
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
