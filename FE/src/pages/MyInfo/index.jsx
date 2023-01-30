import "../../App.css";
import "./index.css";
import MyInfoModal from "./MyInfoModal/myInfoModal";
import React, { useState } from "react";
// import { changeNickName } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import Hash from "./Hash/Hash";
import { useNavigate } from "react-router-dom";

// import { modalSlice } from "./modalSlice";
// const btnStyle = {
//   color: "transparent",
//   background: "transparent",
//   border: "none",
// };

function MyInfo() {
  const [miModal, setMyInfoModal] = useState(false);
  const showMyinfoModal = () => {
    setMyInfoModal((pre) => !pre);
  };
  const [hashModal, sethashModal] = useState(false);

  const navigate = useNavigate();

  // const state = useSelector((state) => state);
  // const dispatch = useDispatch();

  return (
    <div className="myinfo">
      {miModal ? <MyInfoModal showMyinfoModal={showMyinfoModal} /> : null}
      {/* {!miModal ? <MyInfoModal showMyinfoModal={showMyinfoModal} /> : null} * */}
      {hashModal == true ? <Hash style></Hash> : null}
      <button
        onClick={() => {
          navigate("/");
        }}
        className="MIbackbtn"
      >
        out
      </button>
      <div className="MIImgDiv">
        <div className="MIImg"></div>
        <div className="MISetDiv">
          <div className="MISetting">
            <div className="MIImgAddIcon"></div>
            <span className="MIImgAddText">사진 설정</span>
          </div>
        </div>
      </div>
      <span className="MIHashTag">Hash Tag</span>
      <div
        className="MIHashSet"
        onClick={() => {
          sethashModal(true);
        }}
      >
        <div className="MIHashSetIcon">
          <span className="MIHashSetText">설정하기</span>
        </div>
      </div>
      <div className="MINameAgeDiv">
        {/* <span className="MIName">{state.nickname}</span> */}
        <span className="MIAge">26</span>
      </div>
      <button className="MIEdit" onClick={showMyinfoModal}>
        profile edit ->
      </button>
      <div className="MIIntroducingDiv">
        <span className="MIIntroducingTitle">Introducing</span>
        <span className="MIIntroducingText">
          안녕하세요. 스물 여섯 김블리입니다!
        </span>
      </div>
      <span className="MIProfileLogo">Blur:)</span>
    </div>
  );
}

export default MyInfo;
