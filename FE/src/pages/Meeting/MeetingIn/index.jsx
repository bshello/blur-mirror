import "./index.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Timer from "./Timer";
import ProgressBar from "./ProgressBar";

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

  const showSmile = () => {
    setSmileToggle((prev) => !prev);

    if (!smileToggle) {
      if (document.querySelector(".basicSmileChangeDiv")) document.querySelector(".basicSmileChangeDiv").classList.replace("basicSmileChangeDiv", "clickSmileChangeDiv");
      else document.querySelector(".ImotionDiv").classList.add("clickSmileChangeDiv");
    } else document.querySelector(".clickSmileChangeDiv").classList.replace("clickSmileChangeDiv", "basicSmileChangeDiv");
  };

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

  const showCam = () => {
    if (camToggle) {
      document.querySelector(".camOn").classList.replace("camOn", "camOff");
    } else {
      document.querySelector(".camOff").classList.replace("camOff", "camOn");
    }
    setCamToggle((prev) => !prev);
  };

  const openMyMic = () => {
    if (myMicToggle) {
      document.querySelector(".myMicOn").classList.replace("myMicOn", "myMicOff");
    } else {
      document.querySelector(".myMicOff").classList.replace("myMicOff", "myMicOn");
    }
    setMyMicToggle((prev) => !prev);
  };

  const openPartnerMic = () => {
    if (partnerMicToggle) {
      document.querySelector(".partMicOn").classList.replace("partMicOn", "partMicOff");
    } else {
      document.querySelector(".partMicOff").classList.replace("partMicOff", "partMicOn");
    }
    setPartnerMicToggle((prev) => !prev);
  };

  const onChangeMySoundSlider = () => {
    const slider = document.querySelector(".slider");
    const progress = document.querySelector(".progressSlider");
    setMySoundVal(slider.value);
    const val = slider.value + "%";
    progress.style.width = val;
  };
  const onChangePartnerSoundSlider = () => {
    const slider = document.querySelector(".slider");
    const progress = document.querySelector(".progressSlider");
    setPartnerSoundVal(slider.value);
    const val = slider.value + "%";
    progress.style.width = val;
  };

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

  const showPartnerSound = () => {
    if (!partnerSoundToggle) {
      document.querySelector(".MPartenerCamSubSoundDesc").style.display = "block";
    } else {
      document.querySelector(".MPartenerCamSubSoundDesc").style.display = "none";
    }
    setPartnerSoundToggle((prev) => !prev);
  };

  return (
    <div className="MeetingIn">
      <ProgressBar done="70" />
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
            <div className="MMyCamSubCamSettingBtn"></div>
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
      <div className="MCenterDiv1">
        <Timer />
        {/* <span className="MTimer">02 : 53</span> */}
        <div className="MCenterCloseBtnDiv">
          <Link to="/home">
            <div className="MCenterCloseBtnText">Close</div>
          </Link>
          <div className="MCenterCloseBtn btn-hover color-5"></div>
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
            <div className="MPartenerCamSubBlockBtn"></div>
            <div className="MPartenerCamSubMicBtn partMicOn" onClick={openPartnerMic}></div>
            <div className="MPartenerCamSubSoundBtn" onChange={showPartnerSound}></div>
            <div className="MPartenerCamSubSoundDesc">
              <div className="MPartenerCamSubSoundDescTop"></div>
              <div className="MPartenerCamSubSoundDescMain"></div>
              <span className="MPartenerCamSubSoundDescSoundVal">{partnerSoundVal}</span>
              <div className="MPartenerCamSubSoundDescBar">
                <div className="range-slider">
                  <input type="range" className="slider" min="0" max="100" onChange={onChangePartnerSoundSlider}></input>
                  <div className="progressSlider"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeetingIn;
