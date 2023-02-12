import "./index.css";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // useSeletor: useState와 같은 값 변경 메서드
import { MTOGGLE, ROOM_NUM } from "../../../redux/reducers/MToggle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
let myStream;
// store에서 성별을 가져옴 : true(남) false(여)
let USERSEX = false;
let firstRendering = false;
let errorCnt = 0;
function MeetingNotIn() {
  console.log("MeetingNotIn 페이지 렌더링");
  let mtoggle = useSelector((state) => state.mt.togg); // Redux에 저장되어있는 MToggle
  const navigate = useNavigate();
  const API_URL = `${process.env.REACT_APP_API_ROOT_WONWOONG}/blur-match/match`; // 여기 주소 바뀌어야함!!!!!!!!!!!!!!!!!!!!!!!!

  const [isMatching, setIsMatching] = useState(false);
  const [camToggle, setCamToggle] = useState(true);
  const [myMicToggle, setMyMicToggle] = useState(true);

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
    // e.preventDefault();
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

  // 아래 코드는 axios 통신 시 사용할 코드(155번 줄 코드는 axios통신 하기 전 테스트 코드)
  // 5초마다 백엔드 서버에 get 통신 보내서 방번호 알아오기
  // const interval1 = setInterval(() => {
  //   axios({
  //     method: "get",
  //     url: `${API_URL}/start`, // 바뀌어야 할 부분!!!!!!!!!!!!!!!!!!!!!!
  //     data: "3",
  //   })
  //     .then((res) => {
  //       console.log(`res : `, res.data);
  //       // 남자 여자 분기 시작
  //       // 남자일 경우
  //       if (USERSEX) {
  //         // 반환되는 값이 undefined이나 null이 아닐 때 -> 성공
  //         if (res.data !== undefined && res.data !== null) {
  //           // 성공했을 때 store에 방번호 저장하기
  //           dispatch(ROOM_NUM(123123));

  //           if (!firstRendering) {
  //             firstRendering = true;

  //             // 캐칭 페이지로 이동
  //             anima();

  //             const timer = setTimeout(() => {
  //               alert("매칭 상대를 찾았습니다.\n미팅 페이지로 이동합니다.");
  //               clearInterval(interval1);
  //               clearTimeout(timer);
  //               toggleChange();
  //             }, 7 * 1000);
  //           }
  //         }
  //       }
  //       // 여자일 경우
  //       else {
  //         // 반환되는 값이 undefined이나 null이 아닐 때 -> 성공
  //         if (res.data !== undefined && res.data !== null) {
  //           // 반환된 데이터들을 저장
  //           let resData = res.data;
  //           // 성공했을 때 store에 방번호 저장하기
  //           dispatch(ROOM_NUM(123123));

  //           // 반환된 데이터를 다시 백에 axios 요청
  //           axios({
  //             method: "post",
  //             url: `${API_URL}/ㅁㅁㅁ`, // 바뀌어야 할 부분!!!!!!!!!!!!!!!!!!!!!!
  //             data: {
  //               partnerId: resData, // 바뀌어야 할 부분!!!!!!!!!!!!!!!!!!!!!!
  //               roomName: "11", // 바뀌어야 할 부분!!!!!!!!!!!!!!!!!!!!!!
  //             },
  //           })
  //             // 데이터가 정상적으로 온다면 -> boolean으로 올 예정
  //             .then((res) => {
  //               if (!firstRendering) {
  //                 firstRendering = true;

  //                 // 캐칭 페이지로 이동
  //                 anima();

  //                 const timer = setTimeout(() => {
  //                   alert("매칭 상대를 찾았습니다.\n미팅 페이지로 이동합니다.");
  //                   clearInterval(interval1);
  //                   clearTimeout(timer);
  //                   toggleChange();
  //                 }, 7 * 1000);
  //               }
  //             })
  //             // 실패했을 경우 에러 반환
  //             .catch((error) => console.log(error));
  //         }
  //       }
  //     })
  //     .catch((err) => {
  //       // 실패했을 경우, 다시 요청(setInterval)
  //       console.log(err);
  //       if (++errorCnt >= 3) {
  //         // 에러가 3회이상일 경우 해당 요청 취소 및 알람
  //         clearInterval(interval1);
  //       alert("서버와 통신에 실패했습니다.\n잠시후 다시 한번 시도해 주세요!");

  //       }
  //     });
  // }, 7 * 1000);

  // 테스트용 axios 통신 true 가정하고 없앰
  const interval = setInterval(() => {
    if (!USERSEX) {
      // 반환되는 값이 undefined이나 null이 아닐 때 -> 성공
      if (true) {
        // store에 방번호 저장하기
        dispatch(ROOM_NUM(123123));

        // 캐칭 페이지로 이동
        if (!firstRendering) {
          firstRendering = true;
          anima();

          const timer = setTimeout(() => {
            alert("매칭 상대를 찾았습니다.\n미팅 페이지로 이동합니다.");
            clearInterval(interval);
            clearTimeout(timer);
            toggleChange();
          }, 7 * 1000);
        }
      }
    }
  }, 7 * 1000);

  function stopMatching() {
    clearInterval(interval);
    navigate("/home");
  }

  return (
    <div className="MeetingNotIn">
      <div
        className="DarkBlurDiv"
        // onClick={toggleChange}
      ></div>

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
      {!isMatching ? (
        <div
          className="MStopBtnDiv"
          // onClick={anima}
          onClick={stopMatching}
        >
          <span className="MStopBtnText">Stop</span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default MeetingNotIn;
