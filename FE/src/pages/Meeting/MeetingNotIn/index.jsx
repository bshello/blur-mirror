import "./index.css";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux"; // useSeletor: useState와 같은 값 변경 메서드
import { MTOGGLE } from "../../../redux/reducers/MToggle";
let myStream;

function MeetingNotIn() {
  const [isMatching, setIsMatching] = useState(false);
  const [camToggle, setCamToggle] = useState(true);
  const [myMicToggle, setMyMicToggle] = useState(true);

  // async function getCameras() {
  //   try {
  //     myStream = await navigator.mediaDevices.getUserMedia({
  //       audio: true,
  //       video: { width: { exact: 237.75 }, height: { exact: 286.5 } },
  //     });
  //     document.querySelector(".MMyCamDiv3").srcObject = myStream;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const getCameras1 = useCallback(async () => {
    try {
      myStream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { width: { exact: 237.75 }, height: { exact: 286.5 } },
      });

      document.querySelector(".MMyCamDiv3").srcObject = myStream;
      console.log("hi im rendering");
    } catch (error) {
      console.log(error);
    }
  }, []);

  const anima = useCallback(() => {
    // e.preventDefault();
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
  }, [isMatching]);
  // function anima(e) {

  // }
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

  const toggleChange = (e) => {
    e.preventDefault();
    dispatch(MTOGGLE());
    myStream.getTracks().forEach((track) => track.stop());
    document.querySelector(".MMyCamDiv3").srcObject = null;
    myStream = "";
  };

  const handleCamToggle = useCallback(() => {
    myStream.getVideoTracks().forEach((track) => (track.enabled = !camToggle));
    // myStream.getVideoTracks().forEach((track) => console.log(track.enabled));
    // console.log(myStream.getVideoTracks());

    // console.log(camToggle);
    if (camToggle) {
      document.querySelector(".noShow").classList.replace("noShow", "show");
    } else {
      document.querySelector(".show").classList.replace("show", "noShow");
    }
    setCamToggle((prev) => !prev);
  }, [camToggle]);

  const handleMicToggle = useCallback(() => {
    myStream.getAudioTracks().forEach((track) => (track.enabled = !myMicToggle));
    myStream.getAudioTracks().forEach((track) => console.log(track.enabled));
    // console.log(myStream.getAudioTracks());
    // console.log(myMicToggle);
    if (myMicToggle) {
      document.querySelector(".myMicOn").classList.replace("myMicOn", "myMicOff");
    } else {
      document.querySelector(".myMicOff").classList.replace("myMicOff", "myMicOn");
    }
    setMyMicToggle(!myMicToggle);
  }, [myMicToggle]);

  useEffect(() => {
    getCameras1();
  }, []);

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
        <div className="MMyCamDiv2 noShow"></div>
        <div className="MMyCamSubCamToggleBtn noShow" onClick={handleCamToggle}></div>
        <div className="MMyCamSubMicBtn1 myMicOn" onClick={handleMicToggle}></div>
        <video className="MMyCamDiv3 show" autoPlay playsInline></video>
      </div>
      <div className="MStopBtnDiv" onClick={anima}>
        <span className="MStopBtnText">Stop</span>
      </div>
    </div>
  );
}

export default MeetingNotIn;
