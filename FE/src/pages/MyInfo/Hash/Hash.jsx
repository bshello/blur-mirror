import "../../../App.css";
import "./Hash.css";
import React, { useState } from "react";
// import MyInfo from "./MyInfo/index";

function Hash() {
  const [hashModal, sethashModal] = useState(false);

  return (
    <div className="Hash">
      {hashModal == true ? <Hash style></Hash> : null}
      <div className="hashdiv">
        <div className="hashSerchDiv">
          <input type="text" className="hashinput" />
          <div className="hashVec" />
        </div>

        <button className="hashEdit" onClick={() => {}}>
          <span className="hashEditText">선호 정보 수정</span>
        </button>
      </div>
    </div>
  );
}

export default Hash;
