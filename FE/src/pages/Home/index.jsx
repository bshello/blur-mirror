import Header from "../../components/Header";
import "./index.css";
import BlurInfo from "./BlurInfo/blurInfo";
import { useCallback, useEffect, useState } from "react";
import ModalWrap from "../Start/ModalWrap/modalWrap";
import Alert from "../Start/Alert";
import Slide1 from "./Slide1/slide1";
import Slide2 from "./Slide2/slide2";
import Slide3 from "./Slide3/slide3";
import ChatList from "./ChatList/chatlist";
import { useRef } from "react";
import axios from "axios";

let myStream;
function Home() {
  const API_URL = `${process.env.REACT_APP_API_ROOT_WONWOONG}/blur-match/match`;
  console.log(API_URL);
  useEffect(() => {
    console.log(process.env);
  }, []);
  // startVideo 함수 실행하면 자신의 모습 볼수있음
  const CONSTRAINTS = { video: { width: { exact: 440 }, height: { exact: 340 } } };
  const videoRef = useRef(null);

  useEffect(() => {}, []);
  const startVideo = useCallback(async () => {
    myStream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
    if (videoRef && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = myStream;
    } else {
      videoRef.current.srcObject = null;
    }
  }, []);

  const [blurInfoModal, setBlurInfoModal] = useState(false);
  const showBlurInfoModal = () => {
    setBlurInfoModal((pre) => !pre);
  };

  const [alertModal, setalertModal] = useState(false);
  const showAlertModal = () => {
    setalertModal((pre) => !pre);

    if (alertModal) {
      navigator.geolocation.getCurrentPosition((loc) => {
        console.log(`lat: ${loc.coords.latitude}, lng: ${loc.coords.longitude}`);
        axios({
          method: "post",
          url: `${API_URL}/start`,
          data: { lat: loc.coords.latitude, lng: loc.coords.longitude, userId: "anonymous", gender: "M" },
        })
          .then((res) => {
            console.log(`res : `, res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      });

      myStream.getTracks().forEach((track) => track.stop());
      videoRef.srcObject = null;
    }
  };

  const [slideNumber, setSlideNumber] = useState(0);
  useEffect(() => {
    setTimeout(() => setSlideNumber((pre) => (pre + 1) % 3), 4000);
  }, [slideNumber]);

  return (
    <div className="Home">
      {blurInfoModal || alertModal ? <ModalWrap blurInfoModal={blurInfoModal} showBlurInfoModal={showBlurInfoModal} /> : null}
      {blurInfoModal && !alertModal ? <BlurInfo /> : null}
      <ChatList />
      {alertModal && !blurInfoModal ? <Alert showAlertModal={showAlertModal} content={"프로필 설정을 하지 않으셨습니다. 작성 페이지로 이동합니다."} /> : null}

      <Header />

      <div className="HomeSubFrame">
        <div className="HomeLeftDiv">
          {/* <div className="HomeCamImg"></div> */}
          <video className="HomeCamDiv" autoPlay ref={videoRef} />
          <button className="InfoBlurBtn" onClick={showBlurInfoModal}></button>
          <button className="CamToggle" onClick={startVideo}></button>
          <button className="CommBoxFrame2" onClick={showAlertModal}>
            <span className="CommBoxFrameStart">Blur Start</span>
          </button>
        </div>
        {slideNumber === 0 ? <Slide1 /> : null}
        {slideNumber === 1 ? <Slide2 /> : null}
        {slideNumber === 2 ? <Slide3 /> : null}
      </div>
    </div>
  );
}

export default Home;
