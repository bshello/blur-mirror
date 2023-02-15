import Header from "../../components/Header";
import "./index.css";
import BlurInfo from "./BlurInfo/blurInfo";
import { useEffect, useState } from "react";
import ModalWrap from "../Start/ModalWrap/modalWrap";
import Alert from "../Start/Alert";
import Slide1 from "./Slide1/slide1";
import Slide2 from "./Slide2/slide2";
import Slide3 from "./Slide3/slide3";
import Slide4 from "./Slide4/slide4";
import Slide5 from "./Slide5/slide5";
import ChatList from "./Chat/ChatList/chatlist";
import ChatPage from "./Chat/ChatPage/chatpage";
import { useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MYGENDER, MYGEO } from "../../redux/reducers/MToggle";
import { saveToken } from "../../redux/reducers/saveToken";

let myStream;
let carousel;
function Home() {
  let userId = useSelector((state) => state.strr.id); // Redux에 저장되어있는 MToggle
  let myToken = useSelector((state) => state.strr.token); // store에 저장되어있는 토큰
  const dispatch = useDispatch();

  const API_URL = `${process.env.REACT_APP_API_ROOT_WONWOONG}/blur-match/match`;
  // startVideo 함수 실행하면 자신의 모습 볼수있음
  const videoRef = useRef(null);
  const CONSTRAINTS = {
    video: { width: { exact: 440 }, height: { exact: 340 } },
  };

  const startVideo = async () => {
    if (toggleStartVideo === false) {
      setToggleStartVideo(!setToggleStartVideo);
      myStream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
      if (videoRef && videoRef.current && !videoRef.current.srcObject) {
        videoRef.current.srcObject = myStream;
      } else {
        videoRef.current.srcObject = null;
      }
    }
  };

  const [toggleStartVideo, setToggleStartVideo] = useState(false);
  const [blurInfoModal, setBlurInfoModal] = useState(false);
  const [alertModal, setalertModal] = useState(false);
  const [chatList, setChatList] = useState(false);
  const [chatPage, setChatPage] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);

  //프로필 설정이 완료여부 알려주는 변수
  // const profiled = useSelector((state) => state.strr.profiled);
  const profiled = true;
  const navigate = useNavigate();

  const showBlurInfoModal = () => {
    setBlurInfoModal((pre) => !pre);
  };

  const showAlertModal = () => {
    setalertModal((pre) => !pre);

    if (alertModal) {
      myStream.getTracks().forEach((track) => track.stop());
      videoRef.srcObject = null;
    }
  };

  const showChatList = () => {
    setChatList((pre) => !pre);
  };

  const showChatPage = () => {
    setChatPage((pre) => !pre);
  };

  //캐러셀 화면
  useEffect(() => {
    carousel = setTimeout(() => setSlideNumber((pre) => (pre + 1) % 5), 10000);
  }, [slideNumber]);

  //Start 버튼에서 미팅으로 갈지, 프로필로 갈지
  const goMeeting = () => {
    /**
     * 프로필 등록 O
     * - 데이터(아이디/위도/경도)를 넘겨줌
     * - axios 성공 시 : 미팅 페이지로 이동
     *         실패 시 : 알람 띄움
     */
    if (profiled) {
      // meeting Not In 로 이동
      if (!alert("미팅 대기 페이지로 이동합니다.")) {
        // 데이터 백에 넘겨줌
        navigator.geolocation.getCurrentPosition((loc) => {
          console.log(
            `lat: ${loc.coords.latitude}, lng: ${loc.coords.longitude}`
          );
          dispatch(
            MYGEO({ lat: loc.coords.latitude, lng: loc.coords.longitude })
          );
          axios({
            method: "post",
            url: `${API_URL}/start`,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${myToken}`,
            },
            data: {
              lat: loc.coords.latitude,
              lng: loc.coords.longitude,
              userId: userId,
            },
          })
            .then((res) => {
              // [response data : myGender/partnerId/sessionId(방번호)]
              // 남자의 경우 O/X/X
              // 여자의 경우 O/X/X
              console.log(`res : `, res.data);
              console.log(`res myGender: `, res.data.myGender);
              dispatch(MYGENDER(res.data.myGender));
              alert("start: 백에 통신 성공");

              // 성공 시 미팅 페이지로 이동
              clearTimeout(carousel);
              navigate("/meeting");
            })
            .catch((err) => {
              console.log(err);

              if (err.response.status === 403) {
                console.log(err);
                axios({
                  method: "get",
                  url: `${process.env.REACT_APP_API_ROOT_DONGHO}/auth/refresh`,
                  header: {
                    token: myToken,
                  },
                }).then((res) => {
                  console.log("액세스 토큰 재발급");
                  dispatch(saveToken(res.data.body.token));
                });
              } else if (err.response.status === 500) {
                console.log(err);
                dispatch(saveToken(""));
                navigate("/");
              }
              // 실패 시 알람 띄움
              alert(
                err.response.status +
                  "error\n서버와 통신에 실패했습니다.\n잠시후 다시 한번 시도해 주세요!"
              );
            });
        });
      }
    } else {
      showAlertModal();
    }
  };
  //프로필 설정페이지로 가는 함수
  const goMyInfo = () => {
    navigate("/MyInfo");
  };

  return (
    <div className="Home">
      {chatList ? <ChatList showChatPage={showChatPage} /> : null}
      {chatPage ? <ChatPage showChatPage={showChatPage} /> : null}
      {blurInfoModal || alertModal ? (
        <ModalWrap
          blurInfoModal={blurInfoModal}
          showBlurInfoModal={showBlurInfoModal}
        />
      ) : null}
      {blurInfoModal && !alertModal ? (
        <BlurInfo showBlurInfoModal={showBlurInfoModal} />
      ) : null}

      {alertModal && !blurInfoModal ? (
        <Alert
          showAlertModal={goMyInfo}
          content={"프로필 설정을 하지 않으셨습니다. 작성 페이지로 이동합니다."}
        />
      ) : null}

      <Header showChatList={showChatList} />

      <div className="HomeSubFrame">
        <div className="HomeLeftDiv">
          {/* <div className="HomeCamImg"></div> */}
          <video className="HomeCamDiv" autoPlay ref={videoRef} />
          <button className="InfoBlurBtn" onClick={showBlurInfoModal}></button>
          <button className="CamToggle" onClick={startVideo}></button>
          <button className="CommBoxFrame2" onClick={goMeeting}>
            <span className="CommBoxFrameStart">Blur Start</span>
          </button>
        </div>
        {slideNumber === 0 ? <Slide1 /> : null}
        {slideNumber === 1 ? <Slide2 /> : null}
        {slideNumber === 2 ? <Slide3 /> : null}
        {slideNumber === 3 ? <Slide4 /> : null}
        {slideNumber === 4 ? <Slide5 /> : null}
      </div>
    </div>
  );
}

export default Home;
