import "../../App.css";
import "./index.css";
import MyInfoModal from "./MyInfoModal/myInfoModal";
import React, { useState } from "react";
// import { changeName } from "../../../reducer/userEdit";
import { changeName } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import Hash from "./Hash/Hash";
import { useNavigate } from "react-router-dom";
import "../../reducer/userEdit";

function MyInfo({ nickName }) {
  //profile edit modal
  const [miModal, setMyInfoModal] = useState(false);
  const showMyinfoModal = () => {
    setMyInfoModal((pre) => !pre);
  };

  //hash modal
  const [hashModal, setHashModal] = useState(false);
  const showHashModal = () => {
    setHashModal((pre) => !pre);
  };

  // 페이지 이동
  const navigate = useNavigate();

  // 데이터 가져오는 거
  const dispatch = useDispatch({});
  const { user } = useSelector((state) => state.userEdit);
  // console.log(user);
  // const state = useSelector((state) => {
  //   return state.userEdit.user;
  // });
  // console.log(state);
  const member = useSelector((state) => state.userEdit);
  // const mypage = useSelector((state) => state.mypage);
  // const { memberNickname, memberRepIcon, memberId } = member;
  // const { memberCurrentStrick, memberTotalTime } = mypage;

  return (
    <div className="myinfo">
      {miModal ? <MyInfoModal showMyinfoModal={showMyinfoModal} /> : null}

      {hashModal ? <Hash showHashModal={showHashModal} /> : null}

      <div
        onClick={() => {
          navigate("/home");
        }}
        className="MIbackbtn"
      >
        out
      </div>
      <div className="MIImgDiv">
        <div className="MIImg"></div>
        <div className="MISetDiv">
          {/* <div className="MISetting">
            <div className="MIImgAddIcon"></div>
            <span className="MIImgAddText">사진 설정</span>
          </div> */}
        </div>
      </div>
      <span className="MIHashTag">Hash Tag</span>
      <div className="MIHashSet" onClick={showHashModal}>
        <div className="MIHashSetIcon">
          <span className="MIHashSetText">설정하기</span>
        </div>
      </div>
      <div className="MINameAgeDiv">
        <span className="MIName"> {user[0]} </span>
        <span className="MIAge"> 26</span>
      </div>
      <div className="MIEdit" onClick={showMyinfoModal}>
        profile edit ->
      </div>
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
