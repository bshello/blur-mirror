import "../../App.css";
import "./index.css";
import MyInfoModal from "./MyInfoModal/myInfoModal";
import React, { useState } from "react";
import { changeName } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import Hash from "./Hash/Hash";
import { useNavigate } from "react-router-dom";
import "../../reducer/userEdit";
import "../../reducer/introEdit";

function MyInfo() {
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

  // reducer에서 변경된 값을 가져오자
  const user = useSelector((state) => {
    return state.user.value;
  });

  const intorduce = useSelector((state) => {
    return state.intorduce.value;
  });

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
        <span className="MIName"> {user} </span>
        <span className="MIAge"> 26</span>
      </div>
      <div className="MIIntroducingDiv">
        <span className="MIIntroducingTitle">Introducing</span>
        <span className="MIIntroducingText"> {intorduce} </span>
      </div>
      <span className="MIProfileLogo">Blur:</span>
      <div className="MIEdit" onClick={showMyinfoModal}>
        profile edit -
      </div>
    </div>
  );
}

export default MyInfo;
