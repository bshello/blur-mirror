import "./index.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function MeetingIn() {
  const [lightToggle, setLightToggle] = useState(false);
  const [smileToggle, setSmileToggle] = useState(false);
  const showLight = () => {
    setLightToggle((prev) => !prev);

    if (!lightToggle) {
      // basic 클래스 있을 경우(두번째 false 부터)
      if (document.querySelector(".basic")) {
        document.querySelector(".basic").classList.replace("basic", "click");
        document.querySelector(".basicLightChangeDiv").classList.replace("basicLightChangeDiv", "clickLightChangeDiv");
      }
      // basic 클래스 없을 경우(첫번째 false)
      else {
        document.querySelector(".lightTagBtn").classList.add("click");
        document.querySelector(".lightTagsDiv").classList.add("clickLightChangeDiv");
      }

      // document.querySelector(".lightTagsDiv").style.display = "block";

      // click 클래스인 경우(true)
    } else {
      document.querySelector(".click").classList.replace("click", "basic");
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
  console.log(smileToggle);

  return (
    <div className="MeetingIn">
      <div className="MProgressBar"></div>
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
            <div className="MMyCamSubCamToggleBtn"></div>
            <div className="MMyCamSubMicBtn"></div>
            <div className="MMyCamSubSoundBtn"></div>
          </div>
        </div>
      </div>
      <div className="MCenterDiv1">
        <span className="MTimer">02 : 53</span>
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
