import "./index.css";
import { useState } from "react";

function BlockModal() {
  const confirmClick = () => {
    const selectBlock = document.querySelectorAll(".BlockAlertSelect");
    const value = document.querySelector(".BlockAlertSelect");
    console.log(selectBlock[0][1]);
  };
  return (
    <div className="BlockModal">
      <div className="AlertHeader">
        <span className="AlertHeaderText">신고 사유</span>
      </div>
      <div className="AlertBody">
        <select className="BlockAlertSelect">
          <option value="1">불쾌한 노출</option>
          <option value="2">부적절한 언행</option>
          <option value="3">사용 불가 연령</option>
          <option value="4">불편한 행동</option>
        </select>
        <div className="BlockConfirmBtnDiv">
          <span className="BlockConfirmBtnText" onClick={confirmClick}>
            확인
          </span>
        </div>
        <div className="BlockCancleBtnDiv">
          <span className="BlockCancleBtnText">취소</span>
        </div>
      </div>
    </div>
  );
}

export default BlockModal;
