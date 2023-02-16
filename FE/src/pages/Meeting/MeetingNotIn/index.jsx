/* eslint-disable react-hooks/exhaustive-deps */
import "./index.css";
import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // useSeletor: useState와 같은 값 변경 메서드
import { MTOGGLE, ROOM_NUM, PARTNERINTERESTS, PARTNERNICK } from "../../../redux/reducers/MToggle";
// eslint-disable-next-line no-unused-vars
import { saveToken } from "../../../redux/reducers/saveToken";
import axios from "axios";
import { useNavigate } from "react-router-dom";

let myStream;
let USERSEX = "";
let firstRendering = false;
let errorCnt = 0;
function MeetingNotIn() {
  let mainTimer = setInterval(actionStart, 7000);

  let userId = useSelector((state) => state.strr.id); // store에 저장되어있는 내 아이디
  USERSEX = useSelector((state) => state.mt.myGender); // store에 저장되어있는 내 성별
  let myGeo = useSelector((state) => state.mt.myGeo); // store에 저장되어있는 내 위치(위도, 경도)
  let myToken = useSelector((state) => state.strr.token); // store에 저장되어있는 토큰

  // 방번호 생성 메서드
  function makeRoomName() {
    let today = new Date();
    let year = today.getFullYear();
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let day = ("0" + today.getDate()).slice(-2);
    let hours = ("0" + today.getHours()).slice(-2);
    let minutes = ("0" + today.getMinutes()).slice(-2);
    let seconds = ("0" + today.getSeconds()).slice(-2);
    let dataString = `${year}${month}${day}${hours}${minutes}${seconds}`;

    return dataString;
  }

  const navigate = useNavigate();
  const API_URL = `${process.env.REACT_APP_API_ROOT_WONWOONG}/blur-match/match`;

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

  // 아래 코드는 axios 통신 시 사용할 코드
  function actionStart() {
    axios({
      method: "post",
      url: `${API_URL}/check`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
      data: {
        gender: USERSEX,
        lat: myGeo.lat,
        lng: myGeo.lng,
        userId: userId,
      },
    })
      .then((res) => {
        // [response data : myGender, parnerId, sessionId]
        console.log(`check OK res : `, res.data);
        // const partnerID = res.data.partnerId;
        // console.log(`partnerID: ${partnerID}`);
        // alert("check: 백에 통신 성공");

        // 남자 여자 분기 시작
        // 남자일 경우
        if (USERSEX === "M" && res.data.myGender) {
          // partnerId && sessionId 있을경우 => 여자를 거치고 왔을 때
          // => 정상
          if (res.data.partnerId && res.data.sessionId) {
            // 성공했을 때 store에 방번호 저장하기
            dispatch(ROOM_NUM(res.data.sessionId));

            // url: accept
            if (window.confirm("매칭 상대를 찾았습니다.\n미팅 페이지로 이동합니다.")) {
              axios({
                method: "post",
                url: `${API_URL}/accept`,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${myToken}`,
                },
                data: {
                  userId: userId,
                  partnerId: res.data.partnerId,
                  sessionId: res.data.sessionId,
                  myGender: USERSEX,
                },
              })
                // 데이터가 정상적으로 온다면 -> res 데이터 안씀 + meeting In으로 넘어감
                .then((res) => {
                  // resData인 관심사 배열을 store에 저장(meeting In에서 사용할 것)
                  // console.log(`accept partnerInterests :`, res.data.partnerInterests);
                  console.log(`accept data : `, res.data);
                  dispatch(PARTNERINTERESTS(res.data.partnerInterests));
                  dispatch(PARTNERNICK(res.data.partnerNickname));

                  if (!firstRendering) {
                    firstRendering = true;

                    // 캐칭 페이지로 이동
                    anima();

                    const timer = setTimeout(() => {
                      clearInterval(mainTimer);
                      clearTimeout(timer);
                      toggleChange();
                    }, 7 * 1000);
                  }
                })
                // 실패했을 경우 에러 반환 => 인터벌 안닫힘, 다시 요청해야함
                .catch((error) => {
                  console.log(error);
                  console.log("accept catch 분기", errorCnt);
                  if (++errorCnt >= 10) {
                    // 에러가 5회이상일 경우 해당 요청 취소 및 알람
                    axios({
                      method: "post",
                      url: `${API_URL}/stop`,
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${myToken}`,
                      },
                      params: {
                        gender: USERSEX,
                        userId: userId,
                      },
                    })
                      .then((res) => {
                        console.log("stop: 10회 이상 실패했으므로 백에서 대기열 삭제");
                      })
                      .catch(() => {
                        console.log("stop 통신 실패");
                      });
                    if (!alert("서버와 통신에 10회 이상 실패했습니다.\n잠시후 다시 한번 시도해 주세요!")) {
                      stopMatching();
                    }
                  }
                });
            } else {
              // 취소 버튼을 눌렀을 때, axios:decline
              dispatch(ROOM_NUM(""));
              axios({
                method: "post",
                url: `${process.env.REACT_APP_API_ROOT_WONWOONG}/decline`,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${myToken}`,
                },
                data: {},
              })
                .then((res) => {
                  clearInterval(mainTimer);
                  navigate("/home");
                })
                .catch((err) => {
                  console.log(`error, decline error 발생`);
                  // if (err.response.status === 401) {
                  //   clearInterval(mainTimer);
                  //   dispatch(saveToken(""));
                  //   navigate("/");
                  // }
                });
            }
          }
          // partnerId && sessionId 없을 경우 => 여자를 안거치고 바로 왔을 경우
          // => 비정상(다시 요청을 보내야함)
          else {
            console.log("여자를 안거치고 바로와서 partnerId/sessionId가 없음 => 인터벌 안닫힘, 다시 요청해야함", errorCnt);
            if (++errorCnt >= 30) {
              // 에러가 5회이상일 경우 해당 요청 취소 및 알람
              axios({
                method: "post",
                url: `${API_URL}/stop`,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${myToken}`,
                },
                params: {
                  gender: USERSEX,
                  userId: userId,
                },
              })
                .then((res) => {
                  console.log("stop: 10회 이상 실패했으므로 백에서 대기열 삭제");
                })
                .catch(() => {
                  console.log("stop 통신 실패");
                });
              if (!alert("서버와 통신에 10회 이상 실패했습니다.\n잠시후 다시 한번 시도해 주세요!")) {
                stopMatching();
              }
            }
          }
        }
        // 여자일 경우
        else {
          console.log(`check res 여자 : `, res.data);
          console.log(res.data.partnerId, res.data.sessionId, res.data.myGender);

          if (res.data.partnerId && res.data.myGender) {
            // 반환된 데이터들을 저장
            let partnerId = res.data.partnerId;
            console.log(`check partnerId: ${partnerId}`);

            // 방번호(sessionId) 생성
            let makingRoomName = makeRoomName();
            console.log(makingRoomName);

            // 성공했을 때 store에 방번호 저장하기
            dispatch(ROOM_NUM(makingRoomName));

            // 반환된 데이터를 다시 백에 axios 요청
            // url: accept
            if (window.confirm("매칭 상대를 찾았습니다.\n미팅 페이지로 이동합니다.")) {
              axios({
                method: "post",
                url: `${API_URL}/accept`,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${myToken}`,
                },
                data: {
                  userId: userId,
                  partnerId: partnerId,
                  sessionId: makingRoomName,
                  myGender: USERSEX,
                },
              })
                // 데이터가 정상적으로 온다면 -> res 데이터 안씀 + meeting In으로 넘어감
                .then((res) => {
                  // resData인 관심사 배열을 store에 저장(meeting In에서 사용할 것)
                  // console.log(`accept partnerInterests :`, res.data.partnerInterests);
                  console.log(`accept data : `, res.data);
                  dispatch(PARTNERINTERESTS(res.data.partnerInterests));
                  dispatch(PARTNERNICK(res.data.partnerNickname));

                  if (!firstRendering) {
                    firstRendering = true;

                    // 캐칭 페이지로 이동
                    anima();

                    const timer = setTimeout(() => {
                      clearInterval(mainTimer);
                      clearTimeout(timer);
                      toggleChange();
                    }, 7 * 1000);
                  }
                })
                // 실패했을 경우 에러 반환 => 인터벌 안닫힘, 다시 요청해야함
                .catch((error) => {
                  console.log(error);
                  console.log("accept catch 분기", errorCnt);
                  if (++errorCnt >= 10) {
                    // 에러가 5회이상일 경우 해당 요청 취소 및 알람
                    axios({
                      method: "post",
                      url: `${API_URL}/stop`,
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${myToken}`,
                      },
                      params: {
                        gender: USERSEX,
                        userId: userId,
                      },
                    })
                      .then((res) => {
                        console.log("stop: 10회 이상 실패했으므로 백에서 대기열 삭제");
                      })
                      .catch(() => {
                        console.log("stop 통신 실패");
                      });
                    if (!alert("서버와 통신에 10회 이상 실패했습니다.\n잠시후 다시 한번 시도해 주세요!")) {
                      stopMatching();
                    }
                  }
                });
            } else {
              // 취소 버튼을 눌렀을 때, axios:decline
              dispatch(ROOM_NUM(""));
              axios({
                method: "post",
                url: `${process.env.REACT_APP_API_ROOT_WONWOONG}/decline`,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${myToken}`,
                },
                data: {},
              })
                .then((res) => {
                  clearInterval(mainTimer);
                  navigate("/home");
                })
                .catch((err) => {
                  console.log(`error, decline error 발생`);
                  // if (err.response.status === 401) {
                  //   clearInterval(mainTimer);
                  //   dispatch(saveToken(""));
                  //   navigate("/");
                  // }
                });
            }
          } else {
            console.log("check OK, 남자와 매칭이 안됐을 경우", ++errorCnt);
            if (errorCnt >= 5) {
              clearInterval(mainTimer);
              mainTimer = null;
            }
            // if (errorCnt >= 5) {
            //   // 에러가 5회이상일 경우 해당 요청 취소 및 알람
            //   axios({
            //     method: "post",
            //     url: `${API_URL}/stop`,
            //     headers: {
            //       "Content-Type": "application/json",
            //       Authorization: `Bearer ${myToken}`,
            //     },
            //     params: {
            //       gender: USERSEX,
            //       userId: userId,
            //     },
            //   })
            //     .then((res) => {
            //       console.log("stop: 10회 이상 실패했으므로 백에서 대기열 삭제");
            //     })
            //     .catch(() => {
            //       console.log("stop 통신 실패");
            //     });

            //   if (!alert("서버와 통신에 10회 이상 실패했습니다.\n잠시후 다시 한번 시도해 주세요!")) {
            //     stopMatching();
            //   }
            // }
          }
        }
      })
      // check axios 통신이 아예 안되는 경우 => 인터벌 안닫힘, 다시 요청해야함
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 401) {
        //   clearInterval(mainTimer);
        //   dispatch(saveToken(""));
        //   navigate("/");
        // } else {

        console.log("check 실패 ", errorCnt);
        if (++errorCnt >= 30) {
          // 에러가 10회이상일 경우 해당 요청 취소 및 알람
          axios({
            method: "post",
            url: `${API_URL}/stop`,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${myToken}`,
            },
            params: {
              gender: USERSEX,
              userId: userId,
            },
          })
            .then((res) => {
              console.log("stop: 10회 이상 실패했으므로 백에서 대기열 삭제");
            })
            .catch(() => {
              console.log("stop 통신 실패");
            });
          if (!alert("서버와 통신에 10회 이상 실패했습니다.\n잠시후 다시 한번 시도해 주세요!")) {
            stopMatching();
          }
        }
      });
  }

  // 테스트용 axios 통신 true 가정하고 없앰
  // const interval = setInterval(() => {
  //   if (!USERSEX) {
  //     // 반환되는 값이 undefined이나 null이 아닐 때 -> 성공
  //     if (true) {
  //       // store에 방번호 저장하기
  //       dispatch(ROOM_NUM(123123));

  //       // 캐칭 페이지로 이동
  //       if (!firstRendering) {
  //         firstRendering = true;
  //         anima();

  //         const timer = setTimeout(() => {
  //           alert("매칭 상대를 찾았습니다.\n미팅 페이지로 이동합니다.");
  //           clearInterval(interval);
  //           clearTimeout(timer);
  //           toggleChange();
  //         }, 5 * 1000);
  //       }
  //     }
  //   }
  // }, 5 * 1000);

  function stopMatching() {
    dispatch(ROOM_NUM(""));
    console.log(`stopMatching 발동`);
    myStream.getTracks().forEach((track) => track.stop());
    document.querySelector(".MMyCamDiv3").srcObject = null;
    myStream = "";
    clearInterval(mainTimer);
    mainTimer = null;
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
