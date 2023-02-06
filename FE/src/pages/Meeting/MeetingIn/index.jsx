import "./index.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import BlockModal from "./BlockModal";
import { useDispatch, useSelector } from "react-redux";
import { BTOGGLE, CLOSE_ALERT_TOGGLE, CAM_OPEN_TOGGLE } from "../../../redux/reducers/MToggle";
import Alert from "../../Start/Alert";
import SettingModal from "../MeetingIn/SettingModal";

function MeetingIn() {
  const [lightToggle, setLightToggle] = useState(false);
  const [smileToggle, setSmileToggle] = useState(false);
  const [camToggle, setCamToggle] = useState(true);
  const [myMicToggle, setMyMicToggle] = useState(true);
  const [partnerMicToggle, setPartnerMicToggle] = useState(true);
  const [mysoundToggle, setMySoundToggle] = useState(false);
  const [partnerSoundToggle, setPartnerSoundToggle] = useState(false);
  const [mySoundVal, setMySoundVal] = useState(50);
  const [partnerSoundVal, setPartnerSoundVal] = useState(50);
  const [blockToggle, setBlockToggle] = useState(false);

  const dispatch = useDispatch();
  const isShowBlockModal = useSelector((state) => state.mt.isShowBlockModal);
  const closeAlertToggle = useSelector((state) => state.mt.closeAlertToggle);
  const camOpenToggle = useSelector((state) => state.mt.camOpenToggle);

  // (파트너 캠 상단의) 관심사 표현 토글
  const showLight = () => {
    setLightToggle((prev) => !prev);

    if (!lightToggle) {
      // basic 클래스 있을 경우(두번째 false 부터)
      if (document.querySelector(".basicLight")) {
        document.querySelector(".basicLight").classList.replace("basicLight", "clickLight");
        document.querySelector(".basicLightChangeDiv").classList.replace("basicLightChangeDiv", "clickLightChangeDiv");
      }
      // basic 클래스 없을 경우(첫번째 false)
      else {
        document.querySelector(".lightTagBtn").classList.add("clickLight");
        document.querySelector(".lightTagsDiv").classList.add("clickLightChangeDiv");
      }

      // document.querySelector(".lightTagsDiv").style.display = "block";

      // click 클래스인 경우(true)
    } else {
      document.querySelector(".clickLight").classList.replace("clickLight", "basicLight");
      document.querySelector(".clickLightChangeDiv").classList.replace("clickLightChangeDiv", "basicLightChangeDiv");
      // document.querySelector(".lightTagsDiv").style.display = "none";
    }
  };

  // (나의 캠 상단의) 이모지 표현 토글
  const showSmile = () => {
    setSmileToggle((prev) => !prev);

    if (!smileToggle) {
      if (document.querySelector(".basicSmileChangeDiv")) document.querySelector(".basicSmileChangeDiv").classList.replace("basicSmileChangeDiv", "clickSmileChangeDiv");
      else document.querySelector(".ImotionDiv").classList.add("clickSmileChangeDiv");
    } else document.querySelector(".clickSmileChangeDiv").classList.replace("clickSmileChangeDiv", "basicSmileChangeDiv");
  };

  // (관심사/이미지가 켜져있을 때) 바깥 배경 누르게되면 토글 off 처리
  const lightAndSmileBgOut = () => {
    if (smileToggle) {
      setSmileToggle((prev) => !prev);
      document.querySelector(".clickSmileChangeDiv").classList.replace("clickSmileChangeDiv", "basicSmileChangeDiv");
    }
    if (lightToggle) {
      setLightToggle((prev) => !prev);
      document.querySelector(".clickLight").classList.replace("clickLight", "basicLight");
      document.querySelector(".clickLightChangeDiv").classList.replace("clickLightChangeDiv", "basicLightChangeDiv");
    }
  };

  // 나의 캠 토글
  const showCam = () => {
    if (camToggle) {
      document.querySelector(".camOn").classList.replace("camOn", "camOff");
    } else {
      document.querySelector(".camOff").classList.replace("camOff", "camOn");
    }
    setCamToggle((prev) => !prev);
  };

  // 나의 마이크 토글
  const openMyMic = () => {
    if (myMicToggle) {
      document.querySelector(".myMicOn").classList.replace("myMicOn", "myMicOff");
    } else {
      document.querySelector(".myMicOff").classList.replace("myMicOff", "myMicOn");
    }
    setMyMicToggle((prev) => !prev);
  };

  // 파트너 마이크 토글
  const openPartnerMic = () => {
    if (partnerMicToggle) {
      document.querySelector(".partMicOn").classList.replace("partMicOn", "partMicOff");
    } else {
      document.querySelector(".partMicOff").classList.replace("partMicOff", "partMicOn");
    }
    setPartnerMicToggle((prev) => !prev);
  };

  // 나의 음량 조절
  const onChangeMySoundSlider = () => {
    const slider = document.querySelector(".slider");
    const progress = document.querySelector(".progressSlider");
    setMySoundVal(slider.value);
    const val = slider.value + "%";
    progress.style.width = val;
  };

  // 파트너 음량 조절
  const onChangePartnerSoundSlider = () => {
    const slider = document.querySelector(".partSlider");
    const progress = document.querySelector(".partProgressSlider");
    setPartnerSoundVal(slider.value);
    const val = slider.value + "%";
    progress.style.width = val;
  };

  // 나의 음량 토글
  const showMySound = () => {
    if (!mysoundToggle) {
      // document.querySelector(".soundOn").classList.replace("soundOn", "soundOff");
      document.querySelector(".MMyCamSubSoundDesc").style.display = "block";
    } else {
      document.querySelector(".MMyCamSubSoundDesc").style.display = "none";
      // document.querySelector(".soundOff").classList.replace("soundOff", "soundOn");
    }
    setMySoundToggle((prev) => !prev);
  };

  // 파트너 음량 토글
  const showPartnerSound = () => {
    if (!partnerSoundToggle) {
      document.querySelector(".MPartenerCamSubSoundDesc").style.display = "block";
    } else {
      document.querySelector(".MPartenerCamSubSoundDesc").style.display = "none";
    }
    setPartnerSoundToggle((prev) => !prev);
  };

  // 파트너 신고 토글
  const openBlock = () => {
    if (!blockToggle) {
      // 신고 div block으로 변경
      document.querySelector(".MPartenerCamSubBlockDesc").style.display = "block";
    } else {
      // 신고 div none으로 변경
      document.querySelector(".MPartenerCamSubBlockDesc").style.display = "none";
    }
    setBlockToggle((prev) => !prev);
  };

  // (파트너) 신고 모달 토글
  const showBlockModal = () => {
    // blockModalToggle이 false 라면
    if (!isShowBlockModal) {
      // 1. 토글 버튼을 닫아주고
      setBlockToggle((prev) => !prev);
      // 1. 해당 버튼의 div를 none처리 해줌
      document.querySelector(".MPartenerCamSubBlockDesc").style.display = "none";
      dispatch(BTOGGLE(!isShowBlockModal));
    }
  };

  const showAlertModal = () => {
    dispatch(CLOSE_ALERT_TOGGLE(false));
  };

  // 나의 캠 세팅 토글
  const showSetting = () => {
    dispatch(CAM_OPEN_TOGGLE(true));
  };

  return (
    <div className="MeetingIn">
      {closeAlertToggle ? <Alert showAlertModal={showAlertModal} content="신고가 완료되었습니다:)" /> : ""}
      {isShowBlockModal ? <BlockModal /> : ""}
      {camOpenToggle ? <SettingModal /> : ""}
      <div className="tempBackDiv" onClick={lightAndSmileBgOut}></div>
      <div className="MLeftDiv1">
        <div className="ImotionDiv">
          <div className="Imotion1"></div>
          <div className="Imotion2"></div>
          <div className="Imotion3"></div>
          <div className="Imotion4"></div>
          <div className="Imotion5"></div>
          <div className="Imotion6"></div>
          <div className="Imotion7"></div>
        </div>
        <div className="ImotionBtn" onClick={showSmile}></div>
        <div className="MMyCamDiv"></div>
        <div className="MMyCamSubDiv">
          <span className="MMyCamSubText">My Camera</span>
          <div className="MMyCamSubBtnsDiv">
            <div className="MMyCamSubCamSettingBtn" onClick={showSetting}></div>
            <div className="MMyCamSubCamToggleBtn camOn" onClick={showCam}></div>
            <div className="MMyCamSubMicBtn myMicOn" onClick={openMyMic}></div>
            <div className="MMyCamSubSoundBtn" onClick={showMySound}></div>
            <div className="MMyCamSubSoundDesc">
              <div className="MMyCamSubSoundDescTop"></div>
              <div className="MMyCamSubSoundDescMain"></div>
              <span className="MMyCamSubSoundDescSoundVal">{mySoundVal}</span>
              <div className="MMyCamSubSoundDescBar">
                <div className="range-slider">
                  <input type="range" className="slider" min="0" max="100" onChange={onChangeMySoundSlider}></input>
                  <div className="progressSlider"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="MRightDiv1">
        <div className="lightTagsDiv">
          <span className="lightTag1">운동</span>
          <span className="lightTag2">맛집</span>
          <span className="lightTag3">카페</span>
          <span className="lightTag4">영화</span>
          <span className="lightTag5">등산하기</span>
          <span className="lightTag6">쇼핑</span>
        </div>
        <div className="lightTagBtn" onClick={showLight}></div>
        <div className="blurEffect"></div>
        <div className="MPartenerCamDiv"></div>
        <div className="MPartenerCamSubDiv">
          <span className="MPartenerCamSubText">Partner Camera</span>
          <div className="MPartenerCamSubBtnsDiv">
            <div className="MPartenerCamSubBlockBtn" onClick={openBlock}></div>
            <div className="MPartenerCamSubBlockDesc">
              <div className="MPartenerCamSubBlockDescTop"></div>
              <div className="MPartenerCamSubBlockDescMain" onClick={showBlockModal}>
                <span className="MPartenerCamSubBlockDescText">Report</span>
              </div>
            </div>
            <div className="MPartenerCamSubMicBtn partMicOn" onClick={openPartnerMic}></div>
            <div className="MPartenerCamSubSoundBtn" onClick={showPartnerSound}></div>
            <div className="MPartenerCamSubSoundDesc">
              <div className="MPartenerCamSubSoundDescTop"></div>
              <div className="MPartenerCamSubSoundDescMain"></div>
              <span className="MPartenerCamSubSoundDescSoundVal">{partnerSoundVal}</span>
              <div className="MPartenerCamSubSoundDescBar">
                <div className="part-range-slider">
                  <input type="range" className="partSlider" min="0" max="100" onChange={onChangePartnerSoundSlider}></input>
                  <div className="partProgressSlider"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProgressBar />
    </div>
  );
}

export default MeetingIn;
