import "../../App.css";
import "./index.css";
import MyInfoModal from "./MyInfoModal/myInfoModal";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Hash from "./Hash/Hash";
import { useNavigate } from "react-router-dom";
import ModalWrap from "../Start/ModalWrap/modalWrap";
import Alert from "../../pages/Start/Alert/alert";

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

  //alert modal
  const [alertModal, setalertModal] = useState(false);
  const showAlertModal = () => {
    setalertModal((pre) => !pre);
  };

  // 페이지 이동
  const navigate = useNavigate();

  // reducer에서 변경된 값을 가져오자
  const user = useSelector((state) => {
    return state.user.value;
  });

  const intro = useSelector((state) => {
    return state.intro.value;
  });

  return (
    <div className="myinfo">
      {miModal || hashModal ? (
        <ModalWrap
          miModal={miModal}
          hashModal={hashModal}
          showHashModal={showHashModal}
          showMyinfoModal={showMyinfoModal}
        />
      ) : null}

      {miModal && !hashModal ? (
        <MyInfoModal
          showHashModal={showHashModal}
          showMyinfoModal={showMyinfoModal}
          showAlertModal={showAlertModal}
        />
      ) : null}

      {hashModal && !miModal ? (
        <Hash showMyinfoModal={showMyinfoModal} showHashModal={showHashModal} />
      ) : null}

      {alertModal && !miModal && !hashModal ? (
        <Alert
          showAlertModal={showAlertModal}
          content={"변경사항이 저장되었습니다."}
        />
      ) : null}

      <div className="DarkBlurDiv"></div>
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
        <div className="MISetDiv"></div>
      </div>
      <span className="MIHashTag">Hash Tag</span>
      <div
        className="MIHashSet"
        onClick={showHashModal}
        disabled={alertModal === true ? true : false}
      >
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
        <span className="MIIntroducingText"> {intro} </span>
      </div>
      <span className="MIProfileLogo">Blur:</span>
      <div
        className="MIEdit"
        onClick={() => {
          showMyinfoModal();
          // anima();
        }}
        disabled={alertModal === true ? true : false}
      >
        profile edit -
      </div>
    </div>
  );
}

export default MyInfo;
