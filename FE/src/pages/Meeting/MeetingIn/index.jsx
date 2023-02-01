import "./index.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import Slider from "react-input-slider";
import Timer from "./Timer";

function MeetingIn() {
  const [lightToggle, setLightToggle] = useState(false);
  const [smileToggle, setSmileToggle] = useState(false);
  const [camToggle, setCamToggle] = useState(true);
  const [micToggle, setMicToggle] = useState(true);
  const [soundToggle, setSoundToggle] = useState(false);
  const [fromrange, setfromrange] = useState(50);

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

  const tempEvent = () => {
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

  const openMic = () => {
    if (micToggle) {
      document.querySelector(".micOn").classList.replace("micOn", "micOff");
    } else {
      document.querySelector(".micOff").classList.replace("micOff", "micOn");
    }
    setMicToggle((prev) => !prev);
  };

  const onChangeSoundSlider = () => {
    const slider = document.querySelector(".slider");
    const progress = document.querySelector(".progressSlider");
    setfromrange(slider.value);
    const val = slider.value + "%";
    progress.style.width = val;
  };

  const showSound = () => {
    if (soundToggle) {
      document.querySelector(".soundOn").classList.replace("soundOn", "soundOff");
    } else {
      document.querySelector(".soundOff").classList.replace("soundOff", "soundOn");
    }
    setSoundToggle((prev) => !prev);
  };

  return (
    <div className="MeetingIn">
      <div className="range-slider">{fromrange}</div>
      <div className="tempBackDiv" onClick={tempEvent}></div>
      {/* <div className="MProgressBar"></div> */}
      <ProgressBar done="70" />
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
            <div className="MMyCamSubMicBtn micOn" onClick={openMic}></div>
            <div className="MMyCamSubSoundBtn soundOff" onClick={showSound}></div>
            <div className="MMyCamSubSoundDesc">
              <div className="MMyCamSubSoundDescTop"></div>
              <div className="MMyCamSubSoundDescMain"></div>
              <div className="MMyCamSubSoundDescBar">
                <div className="range-slider">
                  <input type="range" className="slider" min="0" max="100" onChange={onChangeSoundSlider}></input>
                  <div className="progressSlider"></div>
                </div>
              </div>
              <div className="MMyCamSubSoundDescBarPoint"></div>
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
            <div className="MPartenerCamSubMicBtn"></div>
            <div className="MPartenerCamSubSoundBtn"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeetingIn;
