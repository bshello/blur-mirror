import "./index.css";
import { useState } from "react";
import { useDispatch } from "react-redux"; // useSeletor: useState와 같은 값 변경 메서드
import { toggleCntFunc } from "../../../reducer/MToggle";
function MeetingNotIn() {
  const [isMatching, setIsMatching] = useState(false);
  // const [isIn, setIsIn] = useState(false);
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
  // function In(e) {
  //   e.preventDefault();
  //   const DarkBlurDiv = document.querySelector(".DarkBlurDiv");
  //   const mLeftDiv = document.querySelector(".MLeftDiv");
  //   const mCenterDiv = document.querySelector(".MCenterDiv");
  //   setIsIn(!isIn);
  //   if (isIn) {
  //     // 애니메이션 작동
  //     mLeftDiv.className = "hi";
  //   }
  // }

  const dispatch = useDispatch();
  // const mToggle = useSelector((state) => state.MToggle.togg); // Redux에 저장되어있는 MToggle

  const toggleChange = (e) => {
    e.preventDefault();
    dispatch(toggleCntFunc());
  };

  return (
    <div className="MeetingNotIn">
      <div className="DarkBlurDiv" onClick={toggleChange}></div>

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

export default MeetingNotIn;
