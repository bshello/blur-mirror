import Header from "../../components/Header";
import "./index.css";
import { useState } from "react";

function Meeting() {
  // 매칭이 잡혔을 때 화면 전환
  const [isMatching, setIsMatching] = useState(false);
  const [isIn, setIsIn] = useState(false);
  function anima(e) {
    e.preventDefault();
    const centerTitle = document.querySelector(".MCenterTitle");
    const centerDesc = document.querySelector(".MCenterDesc");
    const darkBlurDiv = document.querySelector(".DarkBlurDiv");

    if (!isMatching) {
      centerTitle.innerText = "Catching !!!";
      centerDesc.innerText = "It's Soon";
      darkBlurDiv.style.display = "block";
    } else {
      centerTitle.innerText = "Searching Other :)";
      centerDesc.innerText = "Please wait For 5 minutes.";
      darkBlurDiv.style.display = "none";
    }
    // console.dir(centerTitle);
    setIsMatching(!isMatching);
  }
  function In(e) {
    e.preventDefault();
    const DarkBlurDiv = document.querySelector(".DarkBlurDiv");
    const mLeftDiv = document.querySelector(".MLeftDiv");
    const mCenterDiv = document.querySelector(".MCenterDiv");

    setIsIn(!isIn);
    if (isIn) {
      // 애니메이션 작동
      mLeftDiv.className = "hi";
      mCenterDiv.style.display = "none";
    }
  }
  return (
    <div className="Meeting">
      <Header />
      <div className="DarkBlurDiv" onClick={In}></div>
      <div className="MCenterDiv">
        <div className="MCenterImgDiv"></div>
        <div className="MCenterTitle">Searching Other :)</div>
        <div className="MCenterDesc">Please wait For 5 minutes.</div>
        <div className="MCenterCirclesDiv">
          <div className="MPCenterCircle1"></div>
          <div className="MPCenterCircle2"></div>
          <div className="MPCenterCircle3"></div>
        </div>
      </div>
      <div className="MLeftDiv">
        <div className="MMyCamLabel">My Camera</div>
        <div className="MMyCamDiv"></div>
      </div>
      <div className="MStopBtnDiv" onClick={anima}>
        <span className="MStopBtnText">Stop</span>
      </div>
    </div>
  );
}

export default Meeting;
